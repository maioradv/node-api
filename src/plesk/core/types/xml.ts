export type XmlResponse<T extends Record<string,any>> = {
  packet:{
    '$':{
      version:string
    },
    system?:{
      status:string,
      errcode:string,
      errtext:string
    }
  } & T
}

export type XmlErrorResponse = {
  status:'error',
  errcode:string,
  errtext:string
}

export type XmlOkResponse<T extends Record<string,any>> = {
  status:'ok'
} & T

export type XmlResult<T extends Record<string,any>> = XmlErrorResponse | XmlOkResponse<T>