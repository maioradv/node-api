import { Axios, AxiosRequestConfig } from "axios"
import { XmlApiError, RestApiError } from "./error"
import { RestApiVersion } from "./types"
import { ResolverDef } from "./core/types/resolver"
import { parseXmlVariables, xmlStringToObject } from "./core/utils/xml"
import { XmlResponse } from "./core/types/xml"

export class ApiModule {
  constructor(private client:Axios){}

  protected async _rest<Res,Req = Record<string,any>>(method:CallMethod,path:string,data?:Req,opts?:AxiosRequestConfig): Promise<Res> {
    try {
      const response = await this.client.request({
        method:method,
        url:`/api/${RestApiVersion}/${path}`,
        data: method !== 'get' ? data ?? undefined : undefined,
        params: method === 'get' ? data ?? undefined : undefined,
        headers:{
          'Content-Type': 'application/json'
        },
        ...opts
      })
      return response.data as Res
    }
    catch(error:any) {
      throw new RestApiError(error)
    }
  }

  protected async _xml<Res,Req = Record<string,any>>(resolver:ResolverDef<string>,variables?:Req): Promise<XmlResponse<Res>> {
    try {
      const response = await this.client.request({
        method:'post',
        url:'/enterprise/control/agent.php',
        data: parseXmlVariables(resolver,variables),
        headers:{
          'Content-Type': 'text/xml'
        },
      })
      const res = await xmlStringToObject<XmlResponse<Res>>(response.data)
      if(res.packet?.system) throw new Error(res.packet.system.errtext)
      return res
    }
    catch(error:any) {
      throw new XmlApiError(error)
    }
  }
}

export interface ClientApiI {
  credentials: (user:string,password:string) => void,
}

export interface RestApiModuleI {}

export interface XmlApiModuleI {}

type CallMethod = 'get' | 'post' | 'put' | 'delete'