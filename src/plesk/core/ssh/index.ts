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

  yarnBuild(user:string,commands:string) {
    const login = `su - ${user} -s /bin/bash`
    const move = "cd httpdocs"
    const install = `((${commands}) &> yarn-install.log)`
    const reboot = `mkdir -p tmp && touch tmp/restart.txt`
    const command = `${login} -c "${move} && ${install} && ${reboot}"`
    return this.client.executeCommand(command,140 * 1000)
  }

  prismaMigration(user:string) {
    const login = `su - ${user} -s /bin/bash`
    const move = "cd httpdocs"
    const migrate = `((yarn db:generate && yarn db:migrate:deploy) &> db-migration.log)`
    const reboot = `mkdir -p tmp && touch tmp/restart.txt`
    const command = `${login} -c "${move} && ${migrate} && ${reboot}"`
    return this.client.executeCommand(command,140 * 1000)
  }

  prismaSeeding(user:string) {
    const login = `su - ${user} -s /bin/bash`
    const move = "cd httpdocs"
    const seed = `((yarn db:seed) &> db-seeding.log)`
    const command = `${login} -c "${move} && ${seed}"`
    return this.client.executeCommand(command,140 * 1000)
  }

  disconnect(){
    return this.client.disconnect()
  }
}