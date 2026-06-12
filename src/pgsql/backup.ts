import { exec } from 'child_process';
import { promisify } from 'util';
import { unlink, access } from 'fs/promises';

const execAsync = promisify(exec);

export type PgConnectionConfig = {
  host: string;
  port: number;
  database: string;
  user: string;      
  password: string;
}

export class PGBackupManager {

  async dump(config: PgConnectionConfig, outputPath: string): Promise<void> {
    const env = {
      ...process.env,
      PGPASSWORD: config.password,
    };

    const cmd = [
      'pg_dump',
      `-h ${config.host}`,
      `-p ${config.port}`,
      `-U ${config.user}`,
      `-d ${config.database}`,
      '--no-owner',   
      '--no-acl',     
      '-Fc',         
      `-f ${outputPath}`,
    ].join(' ');

    await execAsync(cmd, { env });
  }

  async restore(config: PgConnectionConfig, dumpPath: string): Promise<void> {
    await access(dumpPath);

    const env = {
      ...process.env,
      PGPASSWORD: config.password,
    };

    const cmd = [
      'pg_restore',
      `-h ${config.host}`,
      `-p ${config.port}`,
      `-U ${config.user}`,
      `-d ${config.database}`,
      '--no-owner',
      '--no-acl',
      '-v',              
      dumpPath,
    ].join(' ');

    await execAsync(cmd, { env });
  }

  async clone(
    source: PgConnectionConfig,
    target: PgConnectionConfig,
    tmpDumpPath = '/tmp/pg_clone.dump'
  ): Promise<void> {
    try {
      //console.log('→ Dumping source database...');
      await this.dump(source, tmpDumpPath);

      //console.log('→ Restoring to target database...');
      await this.restore(target, tmpDumpPath);

      //console.log('✓ Clone completed');
    } finally {
      await unlink(tmpDumpPath).catch(() => {});
    }
  }
}