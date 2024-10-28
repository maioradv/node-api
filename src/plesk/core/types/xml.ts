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