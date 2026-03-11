import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { emptyProjectDescriptor, ProjectDescriptor } from '@lmgm/internal-api';
import { ImportImagesComponent } from '../../../import/components/import-images/import-images.component';
import { DeployProjectComponent } from '../../components/deploy-project/deploy-project.component';
import { ProcessImagesComponent } from '../../components/process-images/process-images.component';
import { ProjectManagerService } from '../../services/project-manager/project-manager.service';

export const allModes = [ 'import', 'process', 'deploy' ] as const;
export type Mode = typeof allModes[number];

interface ModeValue {
  name: string;
  value: string;
}

@Component({
  selector: 'app-project-view',
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatButton,
    MatButtonToggleModule,
    ReactiveFormsModule,
    ImportImagesComponent,
    ProcessImagesComponent,
    DeployProjectComponent
  ],
  templateUrl: './project-view.page.html',
  styleUrl: './project-view.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectViewPage {
  readonly location = input.required<string>();

  readonly project = signal<ProjectDescriptor>(emptyProjectDescriptor());

  readonly mode = new FormControl<Mode>('import', { nonNullable: true });

  readonly modeSwitch = toSignal(this.mode.valueChanges);

  readonly availableModes: ModeValue[] = [
    { name: 'Import', value: 'import' },
    { name: 'Process', value: 'process' },
    { name: 'Deploy', value: 'deploy' }
  ];

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
      this.mode.setValue(
        this.project().images.length === 0 ? 'import' : 'process',
        {
          emitModelToViewChange: false,
          emitViewToModelChange: true
        }
      );
    });
  }

  readonly onClose = () => this.router.navigate([ 'welcome' ]);
}
