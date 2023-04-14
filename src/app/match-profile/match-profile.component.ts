import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-match-profile',
  templateUrl: './match-profile.component.html',
  styleUrls: ['./match-profile.component.scss'],
  standalone: true,
})
export class MatchProfileComponent {

  @Input() name?: string;

}
