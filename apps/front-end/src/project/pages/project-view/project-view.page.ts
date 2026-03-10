import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { ProjectManagerService } from '../../services/project-manager/project-manager.service';

@Component({
  selector: 'app-project-view',
  imports: [],
  templateUrl: './project-view.page.html',
  styleUrl: './project-view.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectViewPage {
  readonly location = input.required<string>();

  private readonly projectManagerService = inject(ProjectManagerService);

  constructor() {
    effect(() => {
      console.log('ProjectViewPage', this.location());

      this.projectManagerService.open(this.location()).then(result => {
        console.log(result);
      });
    });
  }
}
