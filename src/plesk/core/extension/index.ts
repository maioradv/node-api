import fetchCookie, { FetchCookieImpl } from "fetch-cookie";
import { CookieJar } from "tough-cookie";
import { NodeExt } from "./module/node-ext";
import { SslExt } from "./module/ssl";

export type PleskExtensionConfig = {
  host:string,
  credentials?:{
    user:string,
    password:string
  }
}

export type PleskExtensionClient = {
  fetch:FetchCookieImpl<string | URL | Request, RequestInit, Response>,
  token:string
  baseUrl:string,
  config:PleskExtensionConfig
}

export class PleskExtension {
  private jar:CookieJar; 
  private client:PleskExtensionClient;
  nodejs:NodeExt;
  ssl:SslExt;

  constructor(config:PleskExtensionConfig){
    this.jar = new CookieJar();
    this.client = {
      fetch:fetchCookie(fetch, this.jar),
      baseUrl: `https://${config.host}:8443`,
      config:config,
      token: '',   
    }
    this.initModules()
  }

  private initModules() {
    this.nodejs = new NodeExt(this.client)
    this.ssl = new SslExt(this.client)
  }

  async login() {
    const response = await this.client.fetch(`${this.client.baseUrl}/login_up.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        login_name:this.client.config.credentials?.user,
        passwd:this.client.config.credentials?.password
      }),
    });
    const page = await response.text()
    const match = page.match(/<meta[^>]*name="forgery_protection_token"[^>]*content="([^"]*)"/)
    this.client.token = match ? match[1] : ''
    this.initModules()
  }

  setCredentials(user:string,password:string) {
    this.client.config.credentials = {
      user,
      password
    }
  }
}