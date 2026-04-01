import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailGridComponent } from './thumbnail-grid.component';

describe('ThumbnailGridComponent', () => {
  let component: ThumbnailGridComponent;
  let fixture: ComponentFixture<ThumbnailGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ThumbnailGridComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ThumbnailGridComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
