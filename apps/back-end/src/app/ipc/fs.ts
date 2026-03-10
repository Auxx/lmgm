import { ApiResult } from '@lmgm/internal-api';
import { IpcMainInvokeEvent } from 'electron';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'path';

export const mkDir = async (_: IpcMainInvokeEvent, path: string, name: string): Promise<ApiResult<string>> => {
  try {
    const location = join(path, name);
    await mkdir(location);
    return { success: true, data: location };
  } catch (_) {
    return { success: false, errorMessage: `Failed to crete directory ${location}.` };
  }
};

export const writeJson = async <T>(_: IpcMainInvokeEvent, path: string, data: T): Promise<ApiResult<undefined>> => {
  try {
    await writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
    return { success: true, data: undefined };
  } catch (_) {
    return { success: false, errorMessage: `Failed to write file ${path}.` };
  }
};
