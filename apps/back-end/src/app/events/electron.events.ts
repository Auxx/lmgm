import { app, ipcMain, IpcMainInvokeEvent } from 'electron';
import { join } from 'path';
import { environment } from '../../environments/environment';
import App from '../app';
import { showOpenFolderDialog, showOpenProjectDialog } from '../ipc/dialogs';
import { mkDir, writeJson } from '../ipc/fs';
import { prefDelete, prefGet, prefHas, prefSet } from '../ipc/preferences';
import { getProjectDescriptor } from '../ipc/project';

export default class ElectronEvents {
  static bootstrapElectronEvents(): Electron.IpcMain {
    return ipcMain;
  }
}

ipcMain.handle('get-app-version', () => environment.version);
ipcMain.handle('isPackaged', () => App.application.isPackaged);

ipcMain.handle('showOpenFolderDialog', showOpenFolderDialog);
ipcMain.handle('showOpenProjectDialog', showOpenProjectDialog);

ipcMain.handle('mkDir', mkDir);
ipcMain.handle('writeJson', writeJson);
ipcMain.handle('pathJoin', async (_: IpcMainInvokeEvent, ...paths: string[]) => join(...paths));
ipcMain.handle('getProjectDescriptor', getProjectDescriptor);

ipcMain.handle('prefGet', prefGet);
ipcMain.handle('prefSet', prefSet);
ipcMain.handle('prefHas', prefHas);
ipcMain.handle('prefDelete', prefDelete);

ipcMain.on('quit', (_event, code) => {
  app.exit(code);
});
