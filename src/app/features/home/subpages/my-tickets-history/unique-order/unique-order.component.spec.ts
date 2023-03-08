import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueOrderComponent } from './unique-order.component';

describe('UniqueOrderComponent', () => {
  let component: UniqueOrderComponent;
  let fixture: ComponentFixture<UniqueOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniqueOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniqueOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
