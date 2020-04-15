import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RetroStateComponent } from './retro-state.component';

describe('RetroStateComponent', () => {
  let component: RetroStateComponent;
  let fixture: ComponentFixture<RetroStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetroStateComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RetroStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
