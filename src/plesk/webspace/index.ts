
import { ApiModule, XmlApiModuleI } from "../model";
import { WebspaceAddDto, WebspaceAddResponse, WebspaceDelDto, WebspaceDelResponse, WebspaceEnableDto, WebspaceEnableResponse } from "./types";
import { WebspaceResolver } from "./xml";

export class Webspace extends ApiModule implements XmlApiModuleI {
  add(args:WebspaceAddDto) {
    return this._xml<WebspaceAddResponse>(WebspaceResolver.add,args)
  }

  del(args:WebspaceDelDto) {
    return this._xml<WebspaceDelResponse>(WebspaceResolver.del,args)
  }

  enable(args:WebspaceEnableDto) {
    return this._xml<WebspaceEnableResponse>(WebspaceResolver.enable,args)
  }
}