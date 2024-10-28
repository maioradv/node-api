import { pleskApiClient } from '../src'
import credentials from './credentials.json'

async function example() {
  const api = pleskApiClient({
    host:'host',
    credentials
  })
  api.git.pull({
    domain:'domain',
    repo:'repo.git'
  }).then(v => {
    if(v.packet.extension.call.result.status == 'ok') {
      
    }
  })
}

example()