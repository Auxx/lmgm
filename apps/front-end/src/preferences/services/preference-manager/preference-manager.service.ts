import { inject, Injectable } from '@angular/core';
import { InternalApiService } from '../../../ipc/internal-api/internal-api.service';

@Injectable({ providedIn: 'root' })
export class PreferenceManagerService {
  private readonly internalApiService = inject(InternalApiService);

  readonly get = async <T>(key: string): Promise<T | undefined> => this.internalApiService.prefGet(key);

  readonly set = async <T>(key: string, value: T): Promise<void> => this.internalApiService.prefSet(key, value);

  readonly has = async (key: string): Promise<boolean> => this.internalApiService.prefHas(key);

  readonly delete = async (key: string): Promise<void> => this.internalApiService.prefDelete(key);
}
