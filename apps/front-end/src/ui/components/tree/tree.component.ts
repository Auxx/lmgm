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
}
