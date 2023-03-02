import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoredialogComponent } from './scoredialog.component';

describe('ScoredialogComponent', () => {
  let component: ScoredialogComponent;
  let fixture: ComponentFixture<ScoredialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoredialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoredialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
