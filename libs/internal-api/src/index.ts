import { Desktop } from './lib/desktop';

export * from './lib/desktop';
export * from './lib/fs';
export * from './lib/projects';
export * from './typia';

declare global {
  interface Window {
    desktop: Desktop;
  }
}
