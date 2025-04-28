import { dbCredentialsGenerator, FTPClient, ftpCredentialsGenerator, PGClient, pleskApiClient, randomString, replace, SSHClient, WebspaceStatus } from '../src'
import credentials from './credentials.json'

async function example() {
  const api = pleskApiClient(credentials)
  api.database.remove({
    dbId: 54
  }).then(v => console.log(v)).catch(e => console.error(e))
}

example()