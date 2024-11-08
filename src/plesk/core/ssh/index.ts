import { SSHClient } from "../../../ssh";

export class PleskSSh {
  constructor(private readonly client:SSHClient){}

  connect(){
    return this.client.connect()
  }

  cleanWebspace(domain:string,path:string = '/httpdocs') {
    const command = `rm -rf /var/www/vhosts/${domain}${path}/*`
    return this.client.executeCommand(command)
  }

  disconnect(){
    return this.client.disconnect()
  }
}