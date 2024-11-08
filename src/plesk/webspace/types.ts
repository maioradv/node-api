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