
import { ApiModule, XmlApiModuleI } from "../model";
import { GitCreateDto, GitCreateResponse, GitPullDto, GitPullResponse } from "./types";
import { GitResolver } from "./xml";

export class Git extends ApiModule implements XmlApiModuleI {
  pull(args:GitPullDto) {
    return this._xml<GitPullResponse>(GitResolver.pull,args)
  }

  create(args:GitCreateDto) {
    return this._xml<GitCreateResponse>(GitResolver.create,args)
  }
}