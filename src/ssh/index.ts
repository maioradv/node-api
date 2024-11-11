import { NodeSSH, SSHExecCommandResponse } from 'node-ssh';

export type SSHClientConfig = {
  host:string,
  credentials?:{
    user:string,
    password:string
  }
}

export class SSHClient {
  private ssh: NodeSSH;

  constructor(private config:SSHClientConfig) {
    this.ssh = new NodeSSH();
  }

  setCredentials(user:string,password:string) {
    this.config.credentials = {
      user,
      password
    }
  }

  async connect(): Promise<void> {
    if(!this.config.credentials) throw new Error('No ssh credentials')
    await this.ssh.connect({
      host:this.config.host,
      username:this.config.credentials.user,
      password:this.config.credentials.password,
      port:22,
    })
  }

  async executeCommand(command: string, timeout: number = 5000): Promise<SSHExecCommandResponse> {
    try {
      let timeoutId:NodeJS.Timeout;
      const result = await Promise.race([
        this.ssh.execCommand(command),
        new Promise<SSHExecCommandResponse>((_, reject) =>
          timeoutId = setTimeout(() => reject(new Error(`Timeout`)), timeout)
        )
      ]);
      if(timeoutId) clearTimeout(timeoutId)
      if ('stderr' in result && result.stderr) {
        throw new Error(result.stderr)
      }
      return result
    } catch (error) {
      throw error;
    }
  }

  disconnect(): void {
    this.ssh.dispose();
  }
}