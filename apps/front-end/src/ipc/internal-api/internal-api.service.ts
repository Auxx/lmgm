import { Injectable } from '@angular/core';
import '@lmgm/internal-api';

@Injectable({ providedIn: 'root' })
export class InternalApiService {
  getAppVersion = async () => window.desktop.getAppVersion();

  platform = () => window.desktop.platform;

  isPackaged = async () => window.desktop.isPackaged();

  showOpenFolderDialog = async () => window.desktop.showOpenFolderDialog();

  mkDir = async (path: string, name: string) => window.desktop.mkDir(path, name);
}
