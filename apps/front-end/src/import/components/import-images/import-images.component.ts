import { JsonPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ScaleManagerService, ThumbnailComponent } from '@hexmode/lm-ui';
import { FileInfo, supportedFileExtensions } from '@lmgm/internal-api';
import { FileSystemService } from '../../../file-system/services/file-system/file-system.service';
import { TreeBranch } from '../../../ui/components/tree/tree.component.types';
import { SourcesComponent } from '../sources/sources.component';
import { thumbHeight, thumbWidth } from './import-images.component.types';

@Component({
  selector: 'app-import-images',
  imports: [
    SourcesComponent,
    JsonPipe,
    NgOptimizedImage,
    ThumbnailComponent
  ],
  templateUrl: './import-images.component.html',
  styleUrl: './import-images.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportImagesComponent {
  private readonly fileSystemService = inject(FileSystemService);

  private readonly scaleManagerService = inject(ScaleManagerService);

  protected readonly thumbWidth = thumbWidth;

  protected readonly thumbHeight = thumbHeight;

  protected readonly imageWidth = this.scaleManagerService.dimension(thumbWidth);

  protected readonly imageHeight = this.scaleManagerService.dimension(thumbHeight);

  readonly files = signal<FileInfo[]>([]);

  readonly onDirChange = (branch: TreeBranch) => this.loadFiles(branch).then();

  private readonly loadFiles = async (branch: TreeBranch) => {
    this.scaleManagerService.devicePixelRatio();

    this.files.set(
      (await this.fileSystemService.readDir(branch.id))
        .filter(item => !item.isDirectory)
        .filter(f => supportedFileExtensions.includes(f.ext.toLowerCase().replace('.', '')))
    );
  };

  protected readonly onSelection = (image: string) => {
    console.log('onSelection', image);
  };
}
