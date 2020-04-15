import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RetroListComponent } from './retro-list.component';

describe('RetroListComponent', () => {
  let component: RetroListComponent;
  let fixture: ComponentFixture<RetroListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetroListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RetroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
