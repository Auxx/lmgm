import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ScaleManagerService, ThumbnailGridComponent } from '@hexmode/lm-ui';
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
    ThumbnailGridComponent
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

  readonly images = [
    'C:/Users/Aleks/Desktop/Cat/photo_2025-05-11_22-16-32.jpg',
    'C:/Users/Aleks/Desktop/Cat/photo_2025-06-11_08-23-08.jpg',
    'C:/Users/Aleks/Desktop/Cat/photo_2025-05-20_19-44-01.jpg',
    'C:/Users/Aleks/Desktop/Cat/photo_2025-06-07_12-16-23 (2).jpg',
    'C:/Users/Aleks/Desktop/Cat/photo_2025-06-07_12-16-23 (3).jpg',
    'C:/Users/Aleks/Desktop/Cat/photo_2025-06-07_12-16-23.jpg',
    'C:/Users/Aleks/Desktop/Cat/PXL_20260304_194706260~2.jpg',
    'C:/Users/Aleks/Desktop/Cat/PXL_20260321_164749933.jpg'
    // 'C:/Users/Aleks/Desktop/Cat/richmond-01.avif'
  ];

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
