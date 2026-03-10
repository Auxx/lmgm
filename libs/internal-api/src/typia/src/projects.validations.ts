import type { ProjectDescriptor } from '@lmgm/internal-api';
import typia from 'typia';

export const isProject = typia.createIs<ProjectDescriptor>();
