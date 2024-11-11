import { Client } from 'basic-ftp';
import { Readable } from 'stream';

export type FTPClientConfig = {
  host:string,
  user:string,
  password:string
}

export class FTPClient {
  private client: Client;

  constructor(private config:FTPClientConfig) {
    this.client = new Client()
  }

  async connect(): Promise<void> {
    await this.client.access({
      host:this.config.host,
      user:this.config.user,
      password:this.config.password,
    })
  }

  async uploadFileFromString(path:string,file:string) {
    try{
      const readableStream = Readable.from([file])
      await this.client.uploadFrom(readableStream, path);
    } catch(e) {
      console.log('asd',e)
    }
    
  }

  disconnect(): void {
    this.client.close();
  }
}