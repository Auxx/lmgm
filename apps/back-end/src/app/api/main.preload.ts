import { Desktop } from '@lmgm/internal-api';
import { contextBridge, ipcRenderer } from 'electron';

const api: Desktop = {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,
  isPackaged: () => ipcRenderer.invoke('isPackaged'),
  showOpenFolderDialog: () => ipcRenderer.invoke('showOpenFolderDialog'),
  showOpenProjectDialog: () => ipcRenderer.invoke('showOpenProjectDialog'),
  mkDir: (path, name) => ipcRenderer.invoke('mkDir', path, name),
  writeJson: (path, data) => ipcRenderer.invoke('writeJson', path, data),
  pathJoin: (...paths) => ipcRenderer.invoke('pathJoin', ...paths)
};

contextBridge.exposeInMainWorld('desktop', api);
