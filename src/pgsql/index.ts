import { Client, ClientConfig } from 'pg';

export class PGClient {
  private client: Client;

  constructor(config:ClientConfig) {
    this.client = new Client(config);
  }

  async connect(): Promise<void> {
    await this.client.connect()
  }

  async query<T extends Record<string,any>>(queryText: string, params: any[] = []): Promise<T[]> {
    try {
      const res = await this.client.query<T>(queryText, params)
      return res.rows
    } catch (error) {
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.client.end()
  }
}