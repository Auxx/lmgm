import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TreeBranch } from './tree.component.types';

@Component({
  selector: 'app-tree',
  imports: [
    MatIcon
  ],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeComponent {
  readonly branches = input.required<TreeBranch[]>();

  readonly withOffset = input(false);

  readonly open = output<TreeBranch>();

  static readonly findBranchById = (id: string, branches: TreeBranch[]): TreeBranch | undefined => {
    for (const branch of branches) {
      if (branch.id === id) {
        return branch;
      }

      const sub = TreeComponent.findBranchById(id, branch.children);

      if (sub !== undefined) {
        return sub;
      }
    }

    return undefined;
  };

  static readonly updateBranchById = (
    id: string,
    branches: TreeBranch[],
    values: Partial<TreeBranch>
  ): TreeBranch[] => {
    const clone = structuredClone(branches);

    const branch = TreeComponent.findBranchById(id, clone);

    if (branch !== undefined) {
      Object.assign(branch, values);
    }

    return clone;
  };
}
