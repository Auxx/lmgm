import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { CreateProjectDialog } from './create-project.dialog';

describe('CreateProjectDialog', () => {
  let component: CreateProjectDialog;
  let fixture: ComponentFixture<CreateProjectDialog>;

  const matDialogRef = {
    close: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateProjectDialog ],
      providers: [ { provide: MatDialogRef, useValue: matDialogRef } ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateProjectDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
