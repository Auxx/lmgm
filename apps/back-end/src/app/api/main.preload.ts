import { Desktop } from '@lmgm/internal-api';
import { contextBridge, ipcRenderer } from 'electron';

const api: Desktop = {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: () => process.platform,
  isPackaged: () => ipcRenderer.invoke('isPackaged'),
  showOpenFolderDialog: () => ipcRenderer.invoke('showOpenFolderDialog'),
  showOpenProjectDialog: () => ipcRenderer.invoke('showOpenProjectDialog'),
  mkDir: (path, name) => ipcRenderer.invoke('mkDir', path, name),
  writeJson: (path, data) => ipcRenderer.invoke('writeJson', path, data),
  pathJoin: (...paths) => ipcRenderer.invoke('pathJoin', ...paths),
  getProjectDescriptor: (location: string) => ipcRenderer.invoke('getProjectDescriptor', location),
  prefGet: (key: string) => ipcRenderer.invoke('prefGet', key),
  prefSet: (key: string, value) => ipcRenderer.invoke('prefSet', key, value),
  prefHas: (key: string) => ipcRenderer.invoke('prefHas', key),
  prefDelete: (key: string) => ipcRenderer.invoke('prefDelete', key)
};

contextBridge.exposeInMainWorld('desktop', api);
