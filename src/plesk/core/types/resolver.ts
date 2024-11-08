export type ResolverDef<T extends string,J = string> = {
  name:T,
  query:J,
}
export type Resolvers<Queries extends ReadonlyArray<string>,Mutations extends ReadonlyArray<string>> = {
  query:{
    [K in (Queries extends ReadonlyArray<infer U> ? U : never)]:ResolverDef<K>
  },
  mutation:{
    [L in (Mutations extends ReadonlyArray<infer U> ? U : never)]:ResolverDef<L>
  }
}

export type ResolverXML<Queries extends ReadonlyArray<string>> = {
  [K in (Queries extends ReadonlyArray<infer U> ? U : never)]:ResolverDef<K,Record<string,any>>
}