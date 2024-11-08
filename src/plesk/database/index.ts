
import { ApiModule, XmlApiModuleI } from "../model";
import { DatabaseCreateDto, DatabaseCreateResponse, DatabaseCreateUserDto, DatabaseCreateUserResponse } from "./types";
import { DatabaseResolver } from "./xml";

export class Database extends ApiModule implements XmlApiModuleI {
  create(args:DatabaseCreateDto) {
    return this._xml<DatabaseCreateResponse>(DatabaseResolver.create,args)
  }

  createUser(args:DatabaseCreateUserDto) {
    return this._xml<DatabaseCreateUserResponse>(DatabaseResolver.createUser,args)
  }
}