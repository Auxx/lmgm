import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/list';
import { InternalApiService } from '../../../ipc/internal-api/internal-api.service';
import { PreferenceManagerService } from '../../../preferences/services/preference-manager/preference-manager.service';
import { FolderTreeComponent } from '../../../ui/components/folder-tree/folder-tree.component';
import { TreeComponent } from '../../../ui/components/tree/tree.component';
import { TreeBranch } from '../../../ui/components/tree/tree.component.types';

@Component({
  selector: 'app-sources',
  imports: [
    MatButton,
    MatDivider,
    FolderTreeComponent,
    TreeComponent
  ],
  templateUrl: './sources.component.html',
  styleUrl: './sources.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourcesComponent {
  private readonly preferenceManagerService = inject(PreferenceManagerService);

  private readonly internalApiService = inject(InternalApiService);

  readonly sources = signal<string[]>([]);

  readonly branches: TreeBranch[] = [
    {
      id: 'C:\\',
      name: 'C:',
      isOpen: true,
      isLoading: false,
      needsFetch: false,
      children: [
        { id: '', name: 'xx', isOpen: false, isLoading: true, needsFetch: true, children: [] },
        { id: 'C:\\Users', name: 'Users', isOpen: false, isLoading: false, needsFetch: true, children: [] },
        { id: 'C:\\dev', name: 'dev', isOpen: false, isLoading: false, needsFetch: true, children: [] },
        { id: 'C:\\Windows', name: 'Windows', isOpen: false, isLoading: false, needsFetch: true, children: [] },
        { id: 'C:\\temp', name: 'temp', isOpen: false, isLoading: false, needsFetch: true, children: [] }
      ]
    }
  ];

  constructor() {
    this.preferenceManagerService
      .get<string[]>('sources')
      .then(result => this.sources.set(result !== undefined ? result : []));
  }

  readonly onAddSource = async () => {
    const result = await this.internalApiService.showOpenFolderDialog();

    if (result.success) {
      this.sources.update(sources => {
        const set = new Set(sources);
        set.add(result.data);
        return Array.from(set);
      });
    }
  };
}
