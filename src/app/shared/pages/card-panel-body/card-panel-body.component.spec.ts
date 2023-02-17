import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPanelBodyComponent } from './card-panel-body.component';

describe('CardPanelBodyComponent', () => {
  let component: CardPanelBodyComponent;
  let fixture: ComponentFixture<CardPanelBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPanelBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPanelBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
