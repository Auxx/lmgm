import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployProjectComponent } from './deploy-project.component';

describe('DeployProjectComponent', () => {
  let component: DeployProjectComponent;
  let fixture: ComponentFixture<DeployProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DeployProjectComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeployProjectComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
