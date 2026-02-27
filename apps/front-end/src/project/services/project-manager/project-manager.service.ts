import { inject, Injectable } from '@angular/core';
import { InternalApiService } from '../../../ipc/internal-api/internal-api.service';
import { currentProjectVersion, ProjectDescriptor } from './project-manager.types';

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

    console.log(descriptor);

    return mkDirResult.data;
  };
}
