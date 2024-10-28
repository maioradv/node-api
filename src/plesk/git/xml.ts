import { Resolver } from "../core/types/resolver";

export const GitResolver:Resolver<['pull']> = {
  pull:{
    name:'pull',
    query:`<packet>
      <extension>
        <call>
          <git>
          <fetch>
            <domain>{domain}</domain>
            <name>{repo}</name>
          </fetch>
          <deploy>
            <domain>{domain}</domain>
            <name>{repo}</name>
          </deploy>
          </git>
        </call>
      </extension>
    </packet>`
  }
}