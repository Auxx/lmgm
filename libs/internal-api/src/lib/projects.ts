export const currentProjectVersion = 1;

export const projectDescriptorExt = 'lmgm.json';

export const projectDescriptorFileName = `project.${projectDescriptorExt}`;

export interface ProjectDescriptor {
  version: number;
  name: string;
}
