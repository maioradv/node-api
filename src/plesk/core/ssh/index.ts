import { SSHClient } from "../../../ssh";

export class PleskSSh {
  constructor(private readonly client:SSHClient){}

  connect(){
    return this.client.connect()
  }

  cleanWebspace(domain:string,path:string = 'httpdocs') {
    const command = `rm -rf /var/www/vhosts/${domain}/${path}/*` //{*,.[!.]*}
    return this.client.executeCommand(command)
  }

  rmWebspacePath(domain:string,path:string) {
    const command = `rm -rf /var/www/vhosts/${domain}/${path}`
    return this.client.executeCommand(command)
  }

  private logName(input: string, fallback = 'logfile'): string {
    const cleaned = input
      .replace(/[^a-zA-Z-]/g, '') 
      .replace(/-{2,}/g, '-')     
      .replace(/^-+|-+$/g, '')  

    return cleaned.length > 0 ? cleaned : fallback
  }

  execute({
    user,
    commands,
    path = 'httpdocs',
    timeout = 300 * 1000,
    nodeAppReboot,
    log
  }:{
    user:string,
    commands:string,
    path:string,
    timeout:number,
    nodeAppReboot?:boolean,
    log:string
  }) {
    const login = `su - ${user} -s /bin/bash`
    const move = `cd ${path}`
    const instructions = `((${commands}) &> ${this.logName(log)}.log)`
    const restart = `mkdir -p tmp && touch tmp/restart.txt`
    const command = `${login} -c "${move} && ${instructions}"` + (nodeAppReboot ? ` && ${restart}` : '')
    return this.client.executeCommand(command,timeout)
  }

  disconnect(){
    return this.client.disconnect()
  }
}