import { inject, Injectable } from '@angular/core';
import { InternalApiService } from '../../../ipc/internal-api/internal-api.service';
import { currentProjectVersion, ProjectDescriptor, projectDescriptorFileName } from './project-manager.types';

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
}
