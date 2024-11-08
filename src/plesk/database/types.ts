import { XmlResult } from "../core/types/xml"

export type DatabaseCreateDto = {
  webspaceId:string,
  name:string,
  type:'mysql'|'postgresql'
}

export type DatabaseCreateUserDto = {
  dbId:string,
  login:string,
  password:string
}

export type DatabaseCreateResponse = {
  database:{
    "add-db":{
      result:XmlResult<{
        id:string
      }>
    }
  }
}

export type DatabaseCreateUserResponse = {
  database:{
    "add-db-user":{
      result:XmlResult<{
        id:string
      }>
    }
  }
}
