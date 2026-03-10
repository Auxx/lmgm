import { ApiResult, OpenFolderResult, projectDescriptorExt } from '@lmgm/internal-api';
import { dialog } from 'electron';

export const showOpenFolderDialog = async (): Promise<OpenFolderResult> => {
  const result = await dialog.showOpenDialog({ properties: [ 'openDirectory' ] });

  if (!result.canceled && result.filePaths.length > 0) {
    return {
      success: true,
      data: result.filePaths[0]
    };
  }

  return { success: false, errorMessage: 'Action cancelled by the user.' };
};

export const showOpenProjectDialog = async (): Promise<ApiResult<string>> => {
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
};
