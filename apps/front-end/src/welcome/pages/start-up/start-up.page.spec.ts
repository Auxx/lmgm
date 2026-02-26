import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartUpPage } from './start-up.page';

describe('StartUpPage', () => {
  let component: StartUpPage;
  let fixture: ComponentFixture<StartUpPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ StartUpPage ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StartUpPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
