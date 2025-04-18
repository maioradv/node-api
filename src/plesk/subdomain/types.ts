import { XmlResult } from "../core/types/xml"

export type SubdomainAddDto = {
  parent:string,
  name:string,
}

export type SubdomainAddResponse = {
  subdomain:{
    add:{
      result:XmlResult<{
        id:string,
      }>
    }
  }
}

export type SubdomainDelDto = {
  id:number|string
}

export type SubdomainDelResponse = {
  subdomain:{
    del:{
      result:XmlResult<{
        id:string,
      }>
    }
  }
}