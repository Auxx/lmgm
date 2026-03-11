import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-folder-tree',
  imports: [
    MatIcon
  ],
  templateUrl: './folder-tree.component.html',
  styleUrl: './folder-tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FolderTreeComponent {
  readonly mountPoints = input.required<string[]>();
}
