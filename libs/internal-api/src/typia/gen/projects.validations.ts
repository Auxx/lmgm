import { ProjectDescriptor } from '../../lib/projects';
export const isProject = (() => {
  const _io0 = (input: any): boolean =>
    'number' === typeof input.version && 1 <= input.version
    && ('string' === typeof input.name && 1 <= input.name.length)
    && (Array.isArray(input.images) && input.images.every((elem: any) => 'string' === typeof elem));
  return (input: any): input is ProjectDescriptor => 'object' === typeof input && null !== input && _io0(input);
})();
