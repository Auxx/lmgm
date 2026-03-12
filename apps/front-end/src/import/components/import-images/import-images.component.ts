import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FileInfo, supportedFileExtensions } from '@lmgm/internal-api';
import { FileSystemService } from '../../../file-system/services/file-system/file-system.service';
import { TreeBranch } from '../../../ui/components/tree/tree.component.types';
import { SourcesComponent } from '../sources/sources.component';

@Component({
  selector: 'app-import-images',
  imports: [
    SourcesComponent,
    JsonPipe
  ],
  templateUrl: './import-images.component.html',
  styleUrl: './import-images.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportImagesComponent {
  private readonly fileSystemService = inject(FileSystemService);

  readonly files = signal<FileInfo[]>([]);

  readonly onDirChange = (branch: TreeBranch) => this.loadFiles(branch).then();

  private readonly loadFiles = async (branch: TreeBranch) => {
    this.files.set(
      (await this.fileSystemService.readDir(branch.id))
        .filter(item => !item.isDirectory)
        .filter(f => supportedFileExtensions.includes(f.ext.toLowerCase().replace('.', '')))
    );
  };
}
