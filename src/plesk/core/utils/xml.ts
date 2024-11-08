import { ResolverDef } from "../types/resolver";
import { Builder, parseStringPromise } from 'xml2js';

export function parseXmlVariables(resolver:ResolverDef<string,Record<string,any>>,variables?:Record<string,any>) : string {
  const query = XmlBuilder.buildObject(resolver.query)
  return variables && Object.keys(variables).length > 0 ? replaceAll(query,variables) : query
}

function replaceAll(str:string,mapObj:Record<string,any>){
  var re = new RegExp(Object.keys(mapObj).map(k => `\{${k}\}`).join("|"),"gi");
  return str.replace(re, (matched) => mapObj[matched.slice(1, -1)])
}

export async function xmlStringToObject<T = any>(xmlString: string): Promise<T> {
  return await parseStringPromise(xmlString,{
    explicitArray:false
  })
}

export const XmlBuilder = new Builder({
  headless:true
})