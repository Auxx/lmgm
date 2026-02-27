import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
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
  readonly dialog = inject(MatDialog);

  readonly onCreateProject = () => {
    CreateProjectDialog
      .open(this.dialog)
      .subscribe(console.log);
  };
}
