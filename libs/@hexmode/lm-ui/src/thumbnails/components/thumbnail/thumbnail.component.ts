import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { ScaleManagerService } from '../../../device-scaling';

@Component({
  selector: 'lmui-thumbnail',
  imports: [
    NgOptimizedImage
  ],
  host: {
    tabindex: '0',
    '[class.selected]': 'selected()',
    '(click)': 'selection.emit(image())',
    '(keyup.space)': 'selection.emit(image())'
  },
  templateUrl: './thumbnail.component.html',
  styleUrl: './thumbnail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailComponent {
  readonly width = input.required<number>();

  readonly height = input.required<number>();

  readonly image = input.required<string>();

  readonly api = input.required<string>();

  readonly selected = input<boolean>(false);

  readonly selection = output<string>();

  private readonly scaleManagerService = inject(ScaleManagerService);

  protected readonly imageUrl = computed(() => {
    const result = new URL(this.api());
    result.pathname = '/thumbs';
    result.searchParams.set('image', this.image());
    result.searchParams.set('width', this.scaleManagerService.dimension(this.width()).toString());
    result.searchParams.set('height', this.scaleManagerService.dimension(this.height()).toString());

    return result.toString();
  });
}
