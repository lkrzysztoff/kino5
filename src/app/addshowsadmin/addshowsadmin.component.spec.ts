import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddshowsadminComponent } from './addshowsadmin.component';

describe('AddshowsadminComponent', () => {
  let component: AddshowsadminComponent;
  let fixture: ComponentFixture<AddshowsadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddshowsadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddshowsadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
