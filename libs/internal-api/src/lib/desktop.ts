import { Arguments } from 'yargs';

export interface Desktop {
  getAppVersion: () => Promise<string>;
  platform: string;
  isPackaged: () => Promise<boolean>;
  showOpenFolderDialog: () => Promise<OpenFolderResult>;
  mkDir: (path: string, name: string) => Promise<ApiResult<string>>;
  writeJson: <T>(path: string, data: T) => Promise<ApiResult<undefined>>;
  pathJoin: (...paths: string[]) => Promise<string>;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiFailure {
  success: false;
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export type OpenFolderResult = ApiResult<string>;

export const appProtocol = 'atom';
