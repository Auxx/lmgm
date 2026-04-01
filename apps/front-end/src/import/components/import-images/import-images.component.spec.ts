import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScaleManagerService, ThumbnailGridComponent } from '@hexmode/lm-ui';
import { MockComponents } from 'ng-mocks';
import { FileSystemService } from '../../../file-system/services/file-system/file-system.service';
import { SourcesComponent } from '../sources/sources.component';

import { ImportImagesComponent } from './import-images.component';

describe('ImportImagesComponent', () => {
  let component: ImportImagesComponent;
  let fixture: ComponentFixture<ImportImagesComponent>;

  const fileSystemService = {
    readDir: vi.fn().mockResolvedValue([])
  };

  const scaleManagerService = {
    devicePixelRatio: vi.fn().mockReturnValue(1),
    dimension: vi.fn().mockReturnValue(1)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ImportImagesComponent,
        MockComponents(
          SourcesComponent,
          ThumbnailGridComponent
        )
      ],
      providers: [
        { provide: FileSystemService, useValue: fileSystemService },
        { provide: ScaleManagerService, useValue: scaleManagerService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ImportImagesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
