import { appPaths } from '@lmgm/internal-api';
import { net } from 'electron';
import * as url from 'node:url';

export const handleCommunication = async (request: GlobalRequest): Promise<GlobalResponse> => {
  console.log('URL', request.url);

  const parsed = new url.URL(request.url);

  console.log('parsed', parsed);

  switch (parsed.pathname) {
    case appPaths.thumbs:
      break;
  }

  // net.fetch(url.pathToFileURL(decodeURIComponent(request.url.slice(`${appProtocol}://`.length))).toString())
  return net.fetch(url.pathToFileURL('C:\\Users\\Aleks\\Desktop\\shit\\180.png').toString());
};
