import { dbCredentialsGenerator, ftpCredentialsGenerator, pleskApiClient } from '../src'
import credentials from './credentials.json'

async function example() {
  const api = pleskApiClient(credentials)

  const name = 'api.testing.tidelizio.menu'
  /*const res = await api.webspace.add({
    domain:name,
    ip:'54.37.38.220',
    ...ftpCredentialsGenerator(name)
  })
  const id = res.packet.webspace.add.result.status == 'ok' ? +res.packet.webspace.add.result.id : 0

  await api.extensions.login()
  await api.extensions.nodejs.changeApplicationPackageManager(id,'yarn')
  await api.extensions.nodejs.changeApplicationDocumentRoot(id,'/httpdocs/public')
  await api.extensions.nodejs.changeApplicationPath(id,'/httpdocs')
  await api.extensions.nodejs.changeApplicationStartupFile(id,'dist/main.js')
  //await api.extensions.nodejs.enableDomain(id,true)

  await api.ssh.connect()
  await api.ssh.cleanWebspace(name)
  api.ssh.disconnect()
  //return*/

  /*const res = await api.git.create({
    domain:name,
    repo:'cms-basic-api.git',
    remoteUrl:`${credentials.git.url}/cms-basic-api.git`
  })*/
  /*const res = await api.git.pull({
    domain:name,
    repo:'cms-basic-api.git',
  })*/

  const db = dbCredentialsGenerator(name)
  const res = await api.database.createUser({
    dbId:'6',
    login:db.login,
    password:db.password
  })

  console.log(JSON.stringify(res.packet))
}

example()