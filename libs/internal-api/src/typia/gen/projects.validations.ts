import type { ProjectDescriptor } from '@lmgm/internal-api';
export const isProject = (() => {
  const _io0 = (input: any): boolean =>
    'number' === typeof input.version && 1 <= input.version
    && ('string' === typeof input.name && 1 <= input.name.length);
  return (input: any): input is ProjectDescriptor => 'object' === typeof input && null !== input && _io0(input);
})();
