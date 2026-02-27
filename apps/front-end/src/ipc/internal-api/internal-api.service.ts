import { Injectable } from '@angular/core';
import '@lmgm/internal-api';

@Injectable({ providedIn: 'root' })
export class InternalApiService {
  getAppVersion = async () => window.desktop.getAppVersion();

  platform = () => window.desktop.platform;

  isPackaged = async () => window.desktop.isPackaged();
}
