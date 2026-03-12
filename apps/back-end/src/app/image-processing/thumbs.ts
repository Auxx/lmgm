import { thumbCacheExists } from './cache';

export const getThumbnail = async (location: string, path: string) => {
  const found = await thumbCacheExists(location, path);

  if (found === false) {
    // Create a new thumbnail
  } else {
    // Send existing thumbnail
  }
};
