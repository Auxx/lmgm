import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportImagesComponent } from './import-images.component';

describe('ImportImagesComponent', () => {
  let component: ImportImagesComponent;
  let fixture: ComponentFixture<ImportImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ImportImagesComponent ]
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
