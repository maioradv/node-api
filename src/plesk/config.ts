import { AxiosStatic } from "axios"
import { ConfigError } from "./error"

export type ApiConfigs = {
  host:string,
  credentials?:{
    user:string,
    password:string
  },
  axios?:(axios:AxiosStatic) => AxiosStatic
}

export type ValidatedApiConfigs = ApiConfigs //& WithRequired<ApiConfigs,'version'|'sandbox'>

export function validateConfigs(configs:ApiConfigs): ValidatedApiConfigs {
  if(!configs.host) throw new ConfigError(`Host is required`)

  return {
    ...configs,
  }
}