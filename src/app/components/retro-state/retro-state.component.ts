import {Component, Input} from '@angular/core';
import {RETRO_STATE} from 'types';

@Component({
  selector: 'app-retro-state',
  templateUrl: './retro-state.component.html',
  styleUrls: ['./retro-state.component.scss'],
})
export class RetroStateComponent {
  @Input() state: RETRO_STATE;

  get color(): string {
    switch (this.state) {
      case RETRO_STATE.NOTES:
      case RETRO_STATE.DISCUSSION:
      case RETRO_STATE.VOTING:
        return '#28ba62';
      default:
        return '#92949c';
    }
  }
}
