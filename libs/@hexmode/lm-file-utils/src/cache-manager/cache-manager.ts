import { createHash } from 'node:crypto';
import { readdir } from 'node:fs/promises';
import { extname } from 'node:path';
import { join } from 'path';
import { CacheType } from './cache-manager.types';

const cacheDirectory = '.cache';

// TODO Implement cache clean up
// Ten days in seconds
// const cacheLife = 10 * 24 * 60 * 60;

export class CacheManager {
  private static cacheLocation = join('./', cacheDirectory);

  static setCacheLocation(location: string) {
    this.cacheLocation = join(location, cacheDirectory);
  }

  /**
   * Generates a SHA256 hash for the specified file name.
   * @param {string} fileName - The file name to hash.
   * @returns {string} The hexadecimal string representation of the SHA256 hash.
   */
  readonly hashFileName = (fileName: string): string => createHash('sha256').update(fileName).digest('hex').toString();

  /**
   * Retrieves the directory path for storing cache files associated with a specific cache type.
   *
   * @param {CacheType} type - The specific type of cache to get the directory for.
   * @returns {string} The absolute file system path where cached data for the specified type should be stored.
   */
  readonly cacheDirForType = (type: CacheType): string => join(CacheManager.cacheLocation, type);

  /**
   * Retrieves the cached file content for a given cache type and file name.
   *
   * @param {CacheType} type - The specific type of cache to retrieve the file from.
   * @param {string} fileName - The name of the file to retrieve from the cache.
   * @returns {Promise<string | false>} The content of the cached file if found, or false if not found.
   */
  readonly getCachedFile = async (type: CacheType, fileName: string): Promise<string | false> => {
    const dir = this.cacheDirForType(type);
    const hash = this.hashFileName(fileName);

    try {
      const file = (await readdir(dir, { withFileTypes: true }))
        .filter(f => f.isFile())
        .find(f => {
          const split = f.name.split('.');

          if (split.length < 1) {
            return false;
          }

          return split[0] === hash;
        });

      return file !== undefined ? join(file.parentPath, file.name) : false;
    } catch (_) {
      return false;
    }
  };

  /**
   * Generates a unique cache file path based on the cache type and source file name.
   * Constructs the output by joining the directory for the specified type with a filename
   * composed of a hash, current timestamp, and file extension.
   *
   * @param {string} type - The type identifier used to determine the cache directory.
   * @param {string} fileName - The original source file name to be hashed and cached.
   * @returns {string} A unique string representing the full path of the generated cache file. */
  readonly generateCacheName = (type: CacheType, fileName: string): string => {
    const dir = this.cacheDirForType(type);
    const hash = this.hashFileName(fileName);

    return join(dir, `${hash}-${Date.now()}${extname(fileName)}`);
  };
}
