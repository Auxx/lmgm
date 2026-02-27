import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';

@Component({
  selector: 'app-project-view',
  imports: [],
  templateUrl: './project-view.page.html',
  styleUrl: './project-view.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectViewPage {
  readonly location = input<string>();

  constructor() {
    effect(() => console.log('ProjectViewPage', this.location()));
  }
}
