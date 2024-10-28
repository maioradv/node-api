
import { ApiModule, XmlApiModuleI } from "../model";
import { GitPullDto, GitPullResponse } from "./types";
import { GitResolver } from "./xml";

export default class Git extends ApiModule implements XmlApiModuleI {
  pull(args:GitPullDto) {
    return this._xml<GitPullResponse>(GitResolver.pull,args)
  }
}