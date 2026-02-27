import { Desktop } from './lib/desktop';

export * from './lib/desktop';
export * from './lib/projects';

declare global {
  interface Window {
    desktop: Desktop;
  }
}
