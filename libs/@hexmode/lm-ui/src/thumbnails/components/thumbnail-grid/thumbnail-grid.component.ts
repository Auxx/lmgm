import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';

@Component({
  selector: 'lmui-thumbnail-grid',
  imports: [
    ThumbnailComponent
  ],
  templateUrl: './thumbnail-grid.component.html',
  styleUrl: './thumbnail-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailGridComponent {
  readonly width = input.required<number>();

  readonly height = input.required<number>();

  readonly images = input.required<string[]>();

  readonly api = input.required<string>();
}
