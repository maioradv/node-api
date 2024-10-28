import axios, { Axios } from "axios";
import { ValidatedApiConfigs, ApiConfigs, validateConfigs } from "./config";
import { ApiHeader } from "./types";
import { ClientApiI } from "./model";
import Git from "./git";

export class PleskApiClient implements ClientApiI
{
  protected client:Axios;
  protected config:ValidatedApiConfigs;
  git:Git;

  constructor(protected initConfig: ApiConfigs) {
    this.config = validateConfigs(this.initConfig)
    this.client = this._initClient()
    this._initModules()
  }

  protected _initClient(): Axios {
    axios.defaults.baseURL = `https://${this.config.host}:8443`;
    if(this.config.credentials){
      axios.defaults.headers[ApiHeader.User] = this.config.credentials.user
      axios.defaults.headers[ApiHeader.Password] = this.config.credentials.password
    }
    return this.config.axios ? this.config.axios(axios) : axios
  }

  protected _initModules() {
    this.git = new Git(this.client)
  }

  credentials(user:string,password:string) {
    this.client.defaults.headers[ApiHeader.User] = user
    this.client.defaults.headers[ApiHeader.Password] = password
  }
}