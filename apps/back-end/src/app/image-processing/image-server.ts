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

    case appPaths.raw:
      return await raw(parsed.searchParams);
  }

  return notFound();
};

const thumb = async (params: URLSearchParams): Promise<GlobalResponse> => {
  const fileName = params.get('image');
  const width = Number(params.get('width'));
  const height = Number(params.get('height'));

  if (fileName === null) {
    return notFound();
  }

  try {
    return net.fetch(
      url.pathToFileURL(
        await thumbnailManager.getThumbnail(
          fileName,
          isNaN(width) || width === 0 ? undefined : width,
          isNaN(height) || height === 0 ? undefined : height
        )
      ).toString()
    );
  } catch (_error) {
    console.log(_error);
    return notFound();
  }
};

const raw = async (params: URLSearchParams): Promise<GlobalResponse> => {
  const fileName = params.get('image');

  if (fileName === null) {
    return notFound();
  }

  try {
    return net.fetch(url.pathToFileURL(fileName).toString());
  } catch (_error) {
    console.log(_error);
    return notFound();
  }
};

const notFound = () => new Response('Not found', { status: 404 });
