import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MockComponents } from 'ng-mocks';
import { ImportImagesComponent } from '../../../import/components/import-images/import-images.component';
import { DeployProjectComponent } from '../../components/deploy-project/deploy-project.component';
import { ProcessImagesComponent } from '../../components/process-images/process-images.component';
import { ProjectManagerService } from '../../services/project-manager/project-manager.service';

import { ProjectViewPage } from './project-view.page';

describe('ProjectViewPage', () => {
  let component: ProjectViewPage;
  let fixture: ComponentFixture<ProjectViewPage>;

  const projectManagerService = {
    open: vi.fn().mockResolvedValue({ success: false })
  };

  const matSnackBar = {
    open: vi.fn()
  };

  const router = {
    navigate: vi.fn().mockResolvedValue(true)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectViewPage,
        MockComponents(
          ImportImagesComponent,
          ProcessImagesComponent,
          DeployProjectComponent
        )
      ],
      providers: [
        { provide: ProjectManagerService, useValue: projectManagerService },
        { provide: MatSnackBar, useValue: matSnackBar },
        { provide: Router, useValue: router }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectViewPage);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('location', '');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
