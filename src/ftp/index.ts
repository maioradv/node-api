import { Client } from 'basic-ftp';
import { createWriteStream } from 'fs';
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
    const readableStream = Readable.from([file])
    await this.client.uploadFrom(readableStream, path);
  }

  async downloadFileToPath(remotePath:string, localPath:string): Promise<void> {
    const writeStream = createWriteStream(localPath);
    await this.client.downloadTo(writeStream, remotePath);
  }

  async downloadFileToString(remotePath:string): Promise<string> {
    const chunks: Buffer[] = [];
    const writeStream = new (require('stream').Writable)({
      write(chunk: Buffer, _: string, cb: () => void) {
        chunks.push(chunk);
        cb();
      }
    });
    await this.client.downloadTo(writeStream, remotePath);
    return Buffer.concat(chunks).toString('utf-8');
  }

  disconnect(): void {
    this.client.close();
  }
}