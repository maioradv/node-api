
import { ApiModule, XmlApiModuleI } from "../model";
import { SubdomainAddDto, SubdomainAddResponse, SubdomainDelDto, SubdomainDelResponse } from "./types";
import { SubdomainResolver } from "./xml";

export class Subdomain extends ApiModule implements XmlApiModuleI {
  add(args:SubdomainAddDto) {
    return this._xml<SubdomainAddResponse>(SubdomainResolver.add,args)
  }

  del(args:SubdomainDelDto) {
    return this._xml<SubdomainDelResponse>(SubdomainResolver.del,args)
  }
}