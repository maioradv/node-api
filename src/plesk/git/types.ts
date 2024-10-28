
export type GitPullDto = {
  domain:string,
  repo:string
}

export type GitPullResponse = {
  extension:{
    call:{
      result:{
        status:string,
        git:{
          fetch:string,
          deploy:string
        }
      }
    }
  }
}