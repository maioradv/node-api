import { ResolverDef } from "../types/resolver";
import { parseStringPromise } from 'xml2js';

export function parseXmlVariables(resolver:ResolverDef<string>,variables?:Record<string,any>) : string {
  return variables ? replaceAll(resolver.query,variables) : resolver.query
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