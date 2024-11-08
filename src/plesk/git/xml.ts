import { ResolverXML } from "../core/types/resolver";

export const GitResolver:ResolverXML<['pull']> = {
  pull:{
    name:'pull',
    query:{
      packet:{
        extension:{
          call:{
            git:{
              fetch:{
                domain:'{domain}',
                name:'{repo}'
              },
              deploy:{
                domain:'{domain}',
                name:'{repo}'
              }
            }
          }
        }
      }
    }
  }
}