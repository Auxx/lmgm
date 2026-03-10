import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { InternalApiService } from '../ipc/internal-api/internal-api.service';

@Component({
  imports: [ RouterModule ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly title = inject(Title);

  readonly internalApiService = inject(InternalApiService);

  constructor() {
    this.setAppTitle().then();
  }

  readonly setAppTitle = async () =>
    this.title.setTitle(`Light Matter Gallery Manager v${await this.internalApiService.getAppVersion()}`);
}
