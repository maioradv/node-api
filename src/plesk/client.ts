import axios, { Axios } from "axios";
import { ValidatedApiConfigs, ApiConfigs, validateConfigs } from "./config";
import { ApiHeader } from "./types";
import { ClientApiI } from "./model";
import { PleskExtension } from "./core/extension";
import { Git } from "./git";
import { Raw } from "./raw";
import { PleskSSh } from "./core/ssh";
import { SSHClient } from "../ssh";
import { Webspace } from "./webspace";
import { Database } from "./database";
import { Subdomain } from "./subdomain";

export class PleskApiClient implements ClientApiI
{
  protected client:Axios;
  protected config:ValidatedApiConfigs;
  protected sshClient:SSHClient;
  webspace:Webspace;
  subdomain:Subdomain;
  database:Database;
  git:Git;
  raw:Raw;
  extensions:PleskExtension;
  ssh:PleskSSh;

  constructor(protected initConfig: ApiConfigs) {
    this.config = validateConfigs(this.initConfig)
    this.client = this._initClient()
    this._initModules()
  }

  protected _initClient(): Axios {
    const client = axios.create()
    client.defaults.baseURL = `https://${this.config.host}:8443`;
    this.extensions = new PleskExtension({
      host:this.config.host,
      credentials:this.config.credentials
    })
    this.sshClient = new SSHClient({
      host:this.config.host,
      credentials:this.config.ssh
    })
    if(this.config.credentials){
      client.defaults.headers[ApiHeader.User] = this.config.credentials.user
      client.defaults.headers[ApiHeader.Password] = this.config.credentials.password
    }
    return this.config.axios ? this.config.axios(client) : client
  }

  protected _initModules() {
    this.webspace = new Webspace(this.client)
    this.subdomain = new Subdomain(this.client)
    this.database = new Database(this.client)
    this.git = new Git(this.client)
    this.raw = new Raw(this.client)
    this.ssh = new PleskSSh(this.sshClient)
  }

  credentials(user:string,password:string) {
    this.client.defaults.headers[ApiHeader.User] = user
    this.client.defaults.headers[ApiHeader.Password] = password
    this.extensions.setCredentials(user,password)
  }
}