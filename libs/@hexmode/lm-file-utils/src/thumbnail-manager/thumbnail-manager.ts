import { CacheManager } from '../cache-manager/cache-manager';
import sharp = require('sharp');

const defaultWidth = 320;
const defaultHeight = 180;
const defaultExt = '.avif';

export class ThumbnailManager {
  private static width = defaultWidth;

  private static height = defaultHeight;

  static setDimensions(width: number, height: number) {
    ThumbnailManager.width = width;
    ThumbnailManager.height = height;
  }

  private readonly cacheManager = new CacheManager();

  // TODO Set different names for different sizes
  readonly getThumbnail = async (fileName: string, width?: number, height?: number): Promise<string> => {
    const found = await this.cacheManager.getCachedFile('thumbs', fileName);

    if (found !== false) {
      return found;
    }

    const cache = this.cacheManager.generateCacheName('thumbs', fileName, defaultExt);
    const w = width ?? ThumbnailManager.width;
    const h = height ?? ThumbnailManager.height;

    await sharp(fileName)
      .resize(
        w,
        h,
        {
          fit: 'inside',
          withoutEnlargement: false
        }
      )
      .avif({ quality: 60 })
      .toFile(cache);

    return cache;
  };
}
