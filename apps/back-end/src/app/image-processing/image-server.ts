import { ThumbnailManager } from '@hexmode/lm-file-utils';
import { appPaths } from '@lmgm/internal-api';
import { net } from 'electron';
import * as url from 'node:url';

const thumbnailManager = new ThumbnailManager();

export const handleCommunication = async (request: GlobalRequest): Promise<GlobalResponse> => {
  const parsed = new url.URL(request.url);

  switch (parsed.pathname) {
    case appPaths.thumbs:
      return await thumb(parsed.searchParams);
  }

  return notFound();
};

const thumb = async (params: URLSearchParams): Promise<GlobalResponse> => {
  const fileName = params.get('image');

  if (fileName === null) {
    return notFound();
  }

  try {
    return net.fetch(url.pathToFileURL(await thumbnailManager.getThumbnail(fileName)).toString());
  } catch (_error) {
    return notFound();
  }
};

const notFound = () => new Response('Not found', { status: 404 });
