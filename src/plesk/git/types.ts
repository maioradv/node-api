import { XmlResult } from "../core/types/xml"

export type GitPullDto = {
  domain:string,
  repo:string
}

export type GitPullResponse = {
  extension:{
    call:{
      result:XmlResult<{
        git:{
          fetch:string,
          deploy:string
        }
      }>
    }
  }
}