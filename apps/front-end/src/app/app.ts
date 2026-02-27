import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { InternalApiService } from '../ipc/internal-api/internal-api.service';

@Component({
  imports: [ RouterModule, MatToolbarModule, MatButton, MatMenuModule ],
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
