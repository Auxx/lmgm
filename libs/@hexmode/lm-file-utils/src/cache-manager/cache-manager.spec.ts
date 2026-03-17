import { join } from 'path';
import { CacheManager } from './cache-manager';

describe('CacheManager', () => {
  let service: CacheManager;

  beforeEach(() => {
    service = new CacheManager();
  });

  describe('generateCacheName', () => {
    it('should generate cache file names from file name hash', () => {
      const result = service.generateCacheName('thumbs', '/root/img/pic01.jpg');

      expect(result).toContain(
        join('.cache', 'thumbs', 'db41160c1d2b22eb026c22ce9a357c884ce0a0a80128bcefc2621ee256fcb0bf')
      );
      expect(result).toContain('.jpg');
    });
  });
});
