import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailComponent } from './thumbnail.component';

describe('ThumbnailComponent', () => {
  let component: ThumbnailComponent;
  let fixture: ComponentFixture<ThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ThumbnailComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ThumbnailComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('width', 320);
    fixture.componentRef.setInput('height', 180);
    fixture.componentRef.setInput('image', '/path/to/image.jpg');
    fixture.componentRef.setInput('api', 'atom://localhost');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
