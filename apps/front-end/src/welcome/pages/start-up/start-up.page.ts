import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';

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
  readonly dialog = inject(MatDialog);
}
