import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileSystemService } from '../../../file-system/services/file-system/file-system.service';
import { InternalApiService } from '../../../ipc/internal-api/internal-api.service';
import { PreferenceManagerService } from '../../../preferences/services/preference-manager/preference-manager.service';

import { SourcesComponent } from './sources.component';

describe('SourcesComponent', () => {
  let component: SourcesComponent;
  let fixture: ComponentFixture<SourcesComponent>;

  const preferenceManagerService = {
    set: vi.fn(),
    get: vi.fn().mockResolvedValue(undefined)
  };

  const internalApiService = {
    showOpenFolderDialog: vi.fn().mockResolvedValue({ success: false })
  };

  const fileSystemService = {
    readDir: vi.fn().mockResolvedValue([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SourcesComponent ],
      providers: [
        { provide: PreferenceManagerService, useValue: preferenceManagerService },
        { provide: InternalApiService, useValue: internalApiService },
        { provide: FileSystemService, useValue: fileSystemService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SourcesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
