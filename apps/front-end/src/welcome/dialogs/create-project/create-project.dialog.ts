import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { filter } from 'rxjs';
import { InternalApiService } from '../../../ipc/internal-api/internal-api.service';
import { CreateProjectResult } from './create-project.types';

@Component({
  selector: 'app-create-project',
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatIcon
  ],
  templateUrl: './create-project.dialog.html',
  styleUrl: './create-project.dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateProjectDialog {
  readonly projectName = new FormControl(
    '',
    {
      validators: [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9 \-_.]+$/)
      ],
      nonNullable: true
    }
  );

  readonly location = new FormControl(
    '',
    {
      validators: [ Validators.required ],
      nonNullable: true
    }
  );

  readonly form = new FormGroup({
    projectName: this.projectName,
    location: this.location
  });

  private readonly dialogRef: MatDialogRef<CreateProjectDialog, CreateProjectResult> = inject(MatDialogRef);

  private readonly internalApiService = inject(InternalApiService);

  static open(dialog: MatDialog) {
    return dialog
      .open<CreateProjectDialog, unknown, CreateProjectResult>(
        CreateProjectDialog,
        {
          width: '500px',
          height: '350px'
        }
      )
      .afterClosed()
      .pipe(filter(result => result !== undefined));
  }

  readonly onSubmit = () =>
    this.dialogRef.close({
      projectName: this.projectName.value,
      location: this.location.value
    });

  readonly onBrowse = async () => {
    const result = await this.internalApiService.showOpenFolderDialog();

    if (result.success) {
      this.location.patchValue(result.data);
    }
  };
}
