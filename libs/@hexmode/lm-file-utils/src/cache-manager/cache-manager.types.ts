export const allCacheTypes = [ 'thumbs' ] as const;

export type CacheType = typeof allCacheTypes[number];
