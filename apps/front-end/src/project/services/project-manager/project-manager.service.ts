import { inject, Injectable } from '@angular/core';
import {
  ApiResult,
  currentProjectVersion,
  isProject,
  ProjectDescriptor,
  projectDescriptorFileName
} from '@lmgm/internal-api';
import { InternalApiService } from '../../../ipc/internal-api/internal-api.service';

@Injectable({ providedIn: 'root' })
export class ProjectManagerService {
  private readonly internalApiService = inject(InternalApiService);

  readonly create = async (name: string, location: string): Promise<string> => {
    const mkDirResult = await this.internalApiService.mkDir(location, name);

    if (!mkDirResult.success) {
      throw new Error(`Failed to create project "${name}" at "${location}".`);
    }

    const descriptor: ProjectDescriptor = {
      version: currentProjectVersion,
      name
    };

    const descriptorPath = await this.internalApiService.pathJoin(mkDirResult.data, projectDescriptorFileName);
    const jsonResult = await this.internalApiService.writeJson(descriptorPath, descriptor);

    if (!jsonResult.success) {
      throw new Error(`Failed to write project descriptor to "${descriptorPath}".`);
    }

    return descriptorPath;
  };

  readonly openWithDialog = async (): Promise<string | null> => {
    const result = await this.internalApiService.showOpenProjectDialog();
    return result.success ? result.data : null;
  };

  readonly open = async (location: string): Promise<ApiResult<ProjectDescriptor>> => {
    const result = await this.internalApiService.getProjectDescriptor(location);

    if (!result.success) {
      return result;
    }

    if (!isProject(result.data)) {
      return { success: false, errorMessage: 'Malformed project descriptor.' };
    }

    return result;
  };
}
