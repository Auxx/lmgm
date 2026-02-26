import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-start-up',
  imports: [
    MatButton,
    MatCardModule
  ],
  templateUrl: './start-up.page.html',
  styleUrl: './start-up.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartUpPage {
}
