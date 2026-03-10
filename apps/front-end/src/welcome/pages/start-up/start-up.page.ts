import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProjectManagerService } from '../../../project/services/project-manager/project-manager.service';
import { CreateProjectDialog } from '../../dialogs/create-project/create-project.dialog';

@Component({
  selector: 'app-start-up',
  imports: [
    MatButton,
    MatCardModule
  ],
  templateUrl: './start-up.page.html',
  styleUrl: './start-up.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartUpPage {
  private readonly dialog = inject(MatDialog);

  private readonly snackBar = inject(MatSnackBar);

  private readonly projectManagerService = inject(ProjectManagerService);

  private readonly router = inject(Router);

  readonly onCreateProject = () => {
    CreateProjectDialog
      .open(this.dialog)
      .subscribe(async result => {
        try {
          const location = await this.projectManagerService.create(result.projectName, result.location);
          this.navigateToProject(location);
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error happened.';
          this.snackBar.open(message, 'OK');
        }
      });
  };

  readonly onOpenProject = async () => {
    const location = await this.projectManagerService.openWithDialog();

    if (location !== null) {
      this.navigateToProject(location);
    }
  };

  private readonly navigateToProject = (location: string) => {
    this.router.navigate([ 'project', 'view', location ]).then();
  };
}
