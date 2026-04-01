import { DOCUMENT, inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScaleManagerService {
  private readonly document = inject(DOCUMENT);

  readonly devicePixelRatio = (): number => this.document.defaultView?.devicePixelRatio ?? 1;

  readonly dimension = (value: number, applyPixelRatio = true): number =>
    applyPixelRatio
      ? Math.floor(value * this.devicePixelRatio())
      : value;
}
