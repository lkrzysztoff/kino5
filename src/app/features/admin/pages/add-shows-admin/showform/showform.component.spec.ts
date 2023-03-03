import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowformComponent } from './showform.component';

describe('ShowformComponent', () => {
  let component: ShowformComponent;
  let fixture: ComponentFixture<ShowformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
