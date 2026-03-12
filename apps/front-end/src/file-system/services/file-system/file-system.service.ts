import { inject, Injectable } from '@angular/core';
import { FileInfo } from '@lmgm/internal-api';
import { InternalApiService } from '../../../ipc/internal-api/internal-api.service';

@Injectable({ providedIn: 'root' })
export class FileSystemService {
  private readonly internalApiService = inject(InternalApiService);

  readonly readDir = async (path: string): Promise<FileInfo[]> => await this.internalApiService.fsReadDir(path);
}
