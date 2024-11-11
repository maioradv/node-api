import axios from 'axios'
import { dbCredentialsGenerator, FTPClient, ftpCredentialsGenerator, PGClient, pleskApiClient, randomString, replace, SSHClient } from '../src'
import credentials from './credentials.json'

async function example() {
  const api = pleskApiClient(credentials)
}

example()