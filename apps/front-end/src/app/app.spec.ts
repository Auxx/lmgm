import { TestBed } from '@angular/core/testing';
import { InternalApiService } from '../ipc/internal-api/internal-api.service';
import { App } from './app';

describe('App', () => {
  const internalApiService = {
    getAppVersion: vi.fn().mockResolvedValue('1.0.0')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ App ],
      providers: [ { provide: InternalApiService, useValue: internalApiService } ]
    }).compileComponents();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled).toBeTruthy();
  });
});
