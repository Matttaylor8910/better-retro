import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RetroPage } from './retro.page';

describe('RetroPage', () => {
  let component: RetroPage;
  let fixture: ComponentFixture<RetroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RetroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
