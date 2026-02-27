import { Desktop } from '@lmgm/internal-api';
import { contextBridge, ipcRenderer } from 'electron';

const api: Desktop = {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,
  isPackaged: () => ipcRenderer.invoke('isPackaged')
};

contextBridge.exposeInMainWorld('desktop', api);
