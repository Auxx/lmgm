import { ApiResult, OpenFolderResult, ProjectDescriptor, projectDescriptorExt } from '@lmgm/internal-api';
import { app, dialog, ipcMain, IpcMainInvokeEvent } from 'electron';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'path';
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

  return { success: false, errorMessage: 'Action cancelled by the user.' };
});

ipcMain.handle('showOpenProjectDialog', async (): Promise<ApiResult<string>> => {
  const result = await dialog.showOpenDialog({
    properties: [ 'openFile' ],
    filters: [ { name: 'LMGM Project', extensions: [ projectDescriptorExt ] } ]
  });

  if (!result.canceled && result.filePaths.length > 0) {
    return {
      success: true,
      data: result.filePaths[0]
    };
  }

  return { success: false, errorMessage: 'Action cancelled by the user.' };
});

ipcMain.handle('mkDir', async (_: IpcMainInvokeEvent, path: string, name: string): Promise<ApiResult<string>> => {
  try {
    const location = join(path, name);
    await mkdir(location);
    return { success: true, data: location };
  } catch (_) {
    return { success: false, errorMessage: `Failed to crete directory ${location}.` };
  }
});

ipcMain.handle('writeJson', async <T>(_: IpcMainInvokeEvent, path: string, data: T): Promise<ApiResult<undefined>> => {
  try {
    await writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
    return { success: true, data: undefined };
  } catch (_) {
    return { success: false, errorMessage: `Failed to write file ${path}.` };
  }
});

ipcMain.handle('pathJoin', async (_: IpcMainInvokeEvent, ...paths: string[]) => join(...paths));

ipcMain.handle(
  'getProjectDescriptor',
  async (_: IpcMainInvokeEvent, location: string): Promise<ApiResult<ProjectDescriptor>> => {
    try {
      const result = await readFile(location, 'utf-8');
      return { success: true, data: JSON.parse(result) };
    } catch (_) {
      return { success: false, errorMessage: `Failed to read file ${location}.` };
    }
  }
);

ipcMain.on('quit', (event, code) => {
  app.exit(code);
});
