import { ApiResult, ProjectDescriptor } from '@lmgm/internal-api';
import { IpcMainInvokeEvent } from 'electron';
import { readFile } from 'node:fs/promises';

export const getProjectDescriptor = async (
  _: IpcMainInvokeEvent,
  location: string
): Promise<ApiResult<ProjectDescriptor>> => {
  try {
    const result = await readFile(location, 'utf-8');
    return { success: true, data: JSON.parse(result) };
  } catch (_) {
    return { success: false, errorMessage: `Failed to read file ${location}.` };
  }
};
