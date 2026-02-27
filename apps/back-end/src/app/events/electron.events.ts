import { OpenFolderResult } from '@lmgm/internal-api';
import { app, dialog, ipcMain } from 'electron';
import { environment } from '../../environments/environment';
import App from '../app';

export default class ElectronEvents {
  static bootstrapElectronEvents(): Electron.IpcMain {
    return ipcMain;
  }
}

ipcMain.handle('get-app-version', () => environment.version);

ipcMain.handle('isPackaged', () => App.application.isPackaged);

ipcMain.handle('showOpenFolderDialog', async (): Promise<OpenFolderResult> => {
  const result = await dialog.showOpenDialog({ properties: [ 'openDirectory' ] });

  if (!result.canceled && result.filePaths.length > 0) {
    return {
      success: true,
      data: result.filePaths[0]
    };
  }

  return { success: false };
});

ipcMain.on('quit', (event, code) => {
  app.exit(code);
});
