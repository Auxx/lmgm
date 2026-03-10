import type { ProjectDescriptor } from './projects';

export interface Desktop {
  getAppVersion: () => Promise<string>;
  platform: () => string;
  isPackaged: () => Promise<boolean>;
  showOpenFolderDialog: () => Promise<OpenFolderResult>;
  showOpenProjectDialog: () => Promise<ApiResult<string>>;
  mkDir: (path: string, name: string) => Promise<ApiResult<string>>;
  writeJson: <T>(path: string, data: T) => Promise<ApiResult<undefined>>;
  pathJoin: (...paths: string[]) => Promise<string>;
  getProjectDescriptor: (location: string) => Promise<ApiResult<ProjectDescriptor>>;
  prefGet: <T>(key: string) => Promise<T | undefined>;
  prefSet: <T>(key: string, value: T) => Promise<void>;
  prefHas: (key: string) => Promise<boolean>;
  prefDelete: (key: string) => Promise<void>;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiFailure {
  success: false;
  errorMessage: string;
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export type OpenFolderResult = ApiResult<string>;

export const appProtocol = 'atom';
