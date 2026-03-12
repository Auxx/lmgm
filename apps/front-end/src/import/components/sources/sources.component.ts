import { ChangeDetectionStrategy, Component, effect, inject, output, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/list';
import { FileSystemService } from '../../../file-system/services/file-system/file-system.service';
import { InternalApiService } from '../../../ipc/internal-api/internal-api.service';
import { PreferenceManagerService } from '../../../preferences/services/preference-manager/preference-manager.service';
import { preferenceKeys } from '../../../preferences/services/preference-manager/preference-manager.types';
import { TreeComponent } from '../../../ui/components/tree/tree.component';
import { TreeBranch } from '../../../ui/components/tree/tree.component.types';

@Component({
  selector: 'app-sources',
  imports: [
    MatButton,
    MatDivider,
    TreeComponent
  ],
  templateUrl: './sources.component.html',
  styleUrl: './sources.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourcesComponent {
  private readonly preferenceManagerService = inject(PreferenceManagerService);

  private readonly internalApiService = inject(InternalApiService);

  private readonly fileSystemService = inject(FileSystemService);

  readonly sources = signal<string[]>([]);

  readonly root = signal<TreeBranch[]>([]);

  readonly dirChange = output<TreeBranch>();

  constructor() {
    this.preferenceManagerService
      .get<string[]>(preferenceKeys.sources)
      .then(result => this.sources.set(result !== undefined ? result : []));

    effect(() => {
      this.root.set(
        this.sources()
          .map(source => ({
            id: source,
            name: source,
            isOpen: false,
            isLoading: false,
            needsFetch: true,
            children: []
          }))
      );
    });
  }

  readonly onAddSource = async () => {
    const result = await this.internalApiService.showOpenFolderDialog();

    if (result.success) {
      this.sources.update(sources => {
        const set = new Set(sources);
        set.add(result.data);
        const updated = Array.from(set);
        this.preferenceManagerService.set(preferenceKeys.sources, updated).then();

        return updated;
      });
    }
  };

  readonly onOpenBranch = async (branch: TreeBranch) => {
    if (branch.isLoading) {
      return;
    }

    const openState = !branch.isOpen;

    if (!branch.needsFetch) {
      this.updateTree(branch.id, { isOpen: openState });
      return;
    }

    this.updateTree(
      branch.id,
      {
        isOpen: openState,
        needsFetch: false,
        isLoading: true
      },
      false
    );

    const result = await this.fileSystemService.readDir(branch.id);

    this.updateTree(
      branch.id,
      {
        isLoading: false,
        children: result
          .filter(item => item.isDirectory)
          .map(directory => ({
            id: directory.id,
            name: directory.name,
            isOpen: false,
            isLoading: false,
            needsFetch: true,
            children: []
          }))
      }
    );
  };

  private readonly updateTree = (id: string, values: Partial<TreeBranch>, notifyUpstream = true) => {
    this.root.update(root => {
      const result = TreeComponent.updateBranchById(id, root, values);
      const update = TreeComponent.findBranchById(id, result);

      if (notifyUpstream && update !== undefined && update.isOpen) {
        this.dirChange.emit(update);
      }

      return result;
    });
  };
}
