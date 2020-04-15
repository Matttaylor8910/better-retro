import {Component, Input} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {RetroService} from 'src/app/services/retro.service';
import {Retro, RETRO_STATE} from 'types';

@Component({
  selector: 'app-state-progress-bar',
  templateUrl: './state-progress-bar.component.html',
  styleUrls: ['./state-progress-bar.component.scss'],
})
export class StateProgressBarComponent {
  @Input() retro: Retro;

  states: RETRO_STATE[];

  constructor(
      private readonly authService: AuthService,
      private readonly retroService: RetroService,
  ) {
    this.states = [
      RETRO_STATE.NOTES,
      RETRO_STATE.DISCUSSION,
      RETRO_STATE.VOTING,
      RETRO_STATE.FINISHED,
    ];
  }

  get owner(): boolean {
    if (!this.retro) return false;
    return this.retro.owner.userId === this.authService.currentUserId;
  }

  get currentState(): string {
    return this.retro ? this.retro.state : '';
  }

  get stateIndex(): number {
    return this.states.findIndex(s => s === this.currentState);
  }

  prev() {
    this.goToState(this.stateIndex - 1);
  }

  next() {
    this.goToState(this.stateIndex + 1);
  }

  private goToState(index: number) {
    this.retroService.updateRetro(this.retro.id, {
      state: this.states[index],
    });
  }
}
