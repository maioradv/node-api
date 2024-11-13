import { XmlResult } from "../core/types/xml"

export type WebspaceAddDto = {
  domain:string,
  ip:string,
  ftpLogin:string,
  ftpPassword:string
}

export type WebspaceAddResponse = {
  webspace:{
    add:{
      result:XmlResult<{
        id:string,
        guid:string
      }>
    }
  }
}

export type WebspaceDelDto = {
  id:number|string
}

export type WebspaceDelResponse = {
  webspace:{
    del:{
      result:XmlResult<{
        id:string,
      }>
    }
  }
}

export enum WebspaceStatus {
  active = '0',
  disabled = '16'
}

export type WebspaceEnableDto = {
  id:string|number,
  status:WebspaceStatus
}

export type WebspaceEnableResponse = {
  webspace:{
    set:{
      result:XmlResult<{
        id:string,
      }>
    }
  }
}