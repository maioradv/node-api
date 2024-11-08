
import { ApiModule, XmlApiModuleI } from "../model";

export class Raw extends ApiModule implements XmlApiModuleI {
  xml(xml:Record<string,any>) {
    return this._xml({
      name:'raw',
      query:xml
    })
  }
}