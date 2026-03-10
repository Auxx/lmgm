import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { emptyProjectDescriptor, ProjectDescriptor } from '@lmgm/internal-api';
import { ProjectManagerService } from '../../services/project-manager/project-manager.service';

@Component({
  selector: 'app-project-view',
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatButton
  ],
  templateUrl: './project-view.page.html',
  styleUrl: './project-view.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectViewPage {
  readonly location = input.required<string>();

  readonly project = signal<ProjectDescriptor>(emptyProjectDescriptor());

  private readonly projectManagerService = inject(ProjectManagerService);

  private readonly snackBar = inject(MatSnackBar);

  private readonly router = inject(Router);

  constructor() {
    effect(async () => {
      const result = await this.projectManagerService.open(this.location());

      if (!result.success) {
        this.snackBar.open(`Failed to open project: ${result.errorMessage}`, 'Dismiss');
        await this.router.navigate([ 'welcome' ]);
        return;
      }

      this.project.set(result.data);
    });

    effect(() => {
      console.log(this.project());
    });
  }

  readonly onClose = () => this.router.navigate([ 'welcome' ]);
}
