import { createHash } from 'node:crypto';
import { readdir } from 'node:fs/promises';
import { join } from 'path';

export const cacheDir = (location: string) => join(location, '.cache');

export const thumbCacheDir = (location: string) => join(cacheDir(location), 'thumbs');

export const hashPath = (path: string) => createHash('sha256').update(path).digest('hex').toString();

export const thumbCacheExists = async (location: string, path: string): Promise<string | false> => {
  const dir = thumbCacheDir(location);

  try {
    const hash = hashPath(path);
    const file = (await readdir(dir, { withFileTypes: true }))
      .filter(f => f.isFile())
      .find(f => {
        const split = f.name.split('.');

        if (split.length < 1) {
          return false;
        }

        if (split[0] === hash) {
          return true;
        }
      });

    return file !== undefined ? join(file.parentPath, file.name) : false;
  } catch (_) {
    return false;
  }
};
