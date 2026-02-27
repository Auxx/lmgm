import { Arguments } from 'yargs';

export interface Desktop {
  getAppVersion: () => Promise<string>;
  platform: string;
  isPackaged: () => Promise<boolean>;
}

export interface Success<T> {
  success: true;
  data: T;
}

export interface Failure {
  success: false;
}

export const appProtocol = 'atom';
