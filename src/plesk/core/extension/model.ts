import { PleskExtensionClient } from "."

export class ExtesionModule {
  constructor(private client:PleskExtensionClient){}

  protected async _post(path:string,args:Record<string,any> = {}){
    return this.client.fetch(`${this.client.baseUrl}${path}`,{
      method:'POST',
      body: JSON.stringify(args),
      headers:{
        "X-Forgery-Protection-Token":this.client.token,
        "Content-Type":"application/json"
      }
    })
  }

  protected async _form(path:string,args:Record<string,string> = {}){
    return this.client.fetch(`${this.client.baseUrl}${path}`,{
      method:'POST',
      body: new URLSearchParams(args),
      headers:{
        "X-Forgery-Protection-Token":this.client.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}