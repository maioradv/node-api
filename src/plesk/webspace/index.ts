
import { ApiModule, XmlApiModuleI } from "../model";
import { WebspaceAddDto, WebspaceAddResponse } from "./types";
import { WebspaceResolver } from "./xml";

export class Webspace extends ApiModule implements XmlApiModuleI {
  add(args:WebspaceAddDto) {
    return this._xml<WebspaceAddResponse>(WebspaceResolver.add,args)
  }
}