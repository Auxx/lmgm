import { getComponentFolder, getComponentSuffix } from './component-types';

describe('Component Types', () => {
  it('should have correct component folder', () => {
    expect(getComponentFolder('component')).toBe('components');
    expect(getComponentFolder('page')).toBe('pages');
  });

  it('should have correct component suffix', () => {
    expect(getComponentSuffix('component')).toBe('component');
    expect(getComponentSuffix('page')).toBe('page');
  });
});
