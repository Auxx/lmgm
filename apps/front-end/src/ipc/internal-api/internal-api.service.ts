import { Injectable } from '@angular/core';
import '@lmgm/internal-api';
import { Desktop } from '@lmgm/internal-api';

@Injectable({ providedIn: 'root' })
export class InternalApiService implements Desktop {
  getAppVersion = async () => window.desktop.getAppVersion();

  platform = () => window.desktop.platform();

  isPackaged = async () => window.desktop.isPackaged();

  showOpenFolderDialog = async () => window.desktop.showOpenFolderDialog();

  showOpenProjectDialog = async () => window.desktop.showOpenProjectDialog();

  mkDir = async (path: string, name: string) => window.desktop.mkDir(path, name);

  writeJson = async <T>(path: string, data: T) => window.desktop.writeJson(path, data);

  pathJoin = async (...paths: string[]) => window.desktop.pathJoin(...paths);

  getProjectDescriptor = (location: string) => window.desktop.getProjectDescriptor(location);

  prefGet = async <T>(key: string): Promise<T | undefined> => window.desktop.prefGet(key);

  prefSet = async <T>(key: string, value: T): Promise<void> => window.desktop.prefSet(key, value);

  prefHas = async (key: string): Promise<boolean> => window.desktop.prefHas(key);

  prefDelete = async (key: string): Promise<void> => window.desktop.prefDelete(key);
}
