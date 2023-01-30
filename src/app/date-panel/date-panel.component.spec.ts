import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePanelComponent } from './date-panel.component';

describe('DatePanelComponent', () => {
  let component: DatePanelComponent;
  let fixture: ComponentFixture<DatePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
