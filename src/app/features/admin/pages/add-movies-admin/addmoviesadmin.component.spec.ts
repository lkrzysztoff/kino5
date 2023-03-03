import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmoviesadminComponent } from './addmoviesadmin.component';

describe('AddmoviesadminComponent', () => {
  let component: AddmoviesadminComponent;
  let fixture: ComponentFixture<AddmoviesadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmoviesadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddmoviesadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
