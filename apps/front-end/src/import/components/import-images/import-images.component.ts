import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SourcesComponent } from '../sources/sources.component';

@Component({
  selector: 'app-import-images',
  imports: [
    SourcesComponent
  ],
  templateUrl: './import-images.component.html',
  styleUrl: './import-images.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportImagesComponent {
}
