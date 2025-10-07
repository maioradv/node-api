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

  yarnBuild(user:string,commands:string,path:string = 'httpdocs',timeout:number = 300 * 1000) {
    const login = `su - ${user} -s /bin/bash`
    const move = `cd ${path}`
    const install = `((${commands}) &> yarn-install.log)`
    const reboot = `mkdir -p tmp && touch tmp/restart.txt`
    const command = `${login} -c "${move} && ${install} && ${reboot}"`
    return this.client.executeCommand(command,timeout)
  }

  prismaMigration(user:string,path:string = 'httpdocs',timeout:number = 300 * 1000) {
    const login = `su - ${user} -s /bin/bash`
    const move = `cd ${path}`
    const migrate = `((yarn db:generate && yarn db:migrate:deploy) &> db-migration.log)`
    const reboot = `mkdir -p tmp && touch tmp/restart.txt`
    const command = `${login} -c "${move} && ${migrate} && ${reboot}"`
    return this.client.executeCommand(command,timeout)
  }

  prismaSeeding(user:string,path:string = 'httpdocs',timeout:number = 300 * 1000) {
    const login = `su - ${user} -s /bin/bash`
    const move = `cd ${path}`
    const seed = `((yarn db:seed) &> db-seeding.log)`
    const command = `${login} -c "${move} && ${seed}"`
    return this.client.executeCommand(command,timeout)
  }

  disconnect(){
    return this.client.disconnect()
  }
}