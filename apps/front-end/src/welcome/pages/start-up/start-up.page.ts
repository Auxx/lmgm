import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  readonly onCreateProject = () => {
    CreateProjectDialog
      .open(this.dialog)
      .subscribe(async result => {
        try {
          const location = await this.projectManagerService.create(result.projectName, result.location);
          console.log('New project location', location);
          // TODO Open project
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error happened.';
          this.snackBar.open(message, 'OK');
        }
      });
  };

  readonly onOpenProject = async () => {
    const result = await this.projectManagerService.openWithDialog();

    if (result !== null) {
      // TODO Navigate to project page
    }
  };
}
