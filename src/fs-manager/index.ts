import { mkdir, rm, readdir, writeFile, readFile, rename, copyFile, unlink, access } from 'fs/promises';
import { join } from 'path';

class DirManager {
  async create(path: string): Promise<void> {
    await mkdir(path, { recursive: true });
  }

  async remove(path: string): Promise<void> {
    await rm(path, { recursive: true, force: true });
  }

  async exists(path: string): Promise<boolean> {
    return access(path).then(() => true).catch(() => false);
  }

  async list(path: string): Promise<string[]> {
    return readdir(path);
  }
}

class FileManager {
  async create(path: string, content: string | Buffer): Promise<void> {
    await mkdir(join(path, '..'), { recursive: true });
    await writeFile(path, content);
  }

  async createFromJson<T extends Record<string,unknown>>(path: string, content: T): Promise<void> {
    await mkdir(join(path, '..'), { recursive: true });
    await writeFile(path, JSON.stringify(content, null, 2));
  }

  async exists(path: string): Promise<boolean> {
    return access(path).then(() => true).catch(() => false);
  }

  async readAsString(path: string): Promise<string> {
    return readFile(path, 'utf-8');
  }

  async readAsBuffer(path: string): Promise<Buffer> {
    return readFile(path);
  }

  async readAsJson<T = unknown>(path: string): Promise<T> {
    const content = await readFile(path, 'utf-8');
    return JSON.parse(content) as T;
  }

  async move(sourcePath: string, destinationPath: string): Promise<void> {
    await rename(sourcePath, destinationPath);
  }

  async copy(sourcePath: string, destinationPath: string): Promise<void> {
    await copyFile(sourcePath, destinationPath);
  }

  async remove(path: string): Promise<void> {
    await unlink(path);
  }
}

export class FsManager {
  readonly dir = new DirManager();
  readonly file = new FileManager();
}