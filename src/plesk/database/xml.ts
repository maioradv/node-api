import { ResolverXML } from "../core/types/resolver";

export const DatabaseResolver:ResolverXML<['createUser','create']> = {
  createUser:{
    name:'createUser',
    query:{
      packet:{
        database:{
          "add-db-user":{
            "db-id":"{dbId}",
            login:"{login}",
            password:"{password}"
          }
        }
      }
    }
  },
  create:{
    name:'create',
    query:{
      packet:{
        database:{
          "add-db":{
            "webspace-id":"{webspaceId}",
            "name":"{name}",
            "type":"{type}"
          }
        }
      }
    }
  }
}