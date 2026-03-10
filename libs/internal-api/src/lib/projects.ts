export const currentProjectVersion = 1;

export const projectDescriptorExt = 'lmgm.json';

export const projectDescriptorFileName = `project.${projectDescriptorExt}`;

export interface ProjectDescriptor {
  /** @type uint32 */
  /** @minimum 1 */
  version: number;

  /** @minLength 1 */
  name: string;
}
