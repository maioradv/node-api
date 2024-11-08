import { XmlResult } from "../core/types/xml"

export type GitPullDto = {
  domain:string,
  repo:string
}

export type GitCreateDto = {
  domain:string,
  repo:string,
  remoteUrl:string
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

export type GitCreateResponse = {
  extension:{
    call:{
      result:XmlResult<{
        git:{
          create:{
            repository:{
              uid:string,
              domain:string,
              name:string,
              "deployment-path":string,
              "depolyment-mode":string,
              "remote-url":string,
              "webhook-url":string,
              "skip-ssl-verification":string,
              "public-key":string,
              "active-branch":string,
              "last-commit":string,
              "run-actions":string
            }
          }
        }
      }>
    }
  }
}