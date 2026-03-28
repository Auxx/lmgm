import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lib-thumbnail',
  imports: [],
  templateUrl: './thumbnail.component.html',
  styleUrl: './thumbnail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailComponent {
  readonly width = input.required<number>();

  readonly height = input.required<number>();

  readonly image = input.required<string>();

  readonly api = input.required<string>();
}
