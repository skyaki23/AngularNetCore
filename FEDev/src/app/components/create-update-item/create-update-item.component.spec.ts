import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateItemComponent } from './create-update-item.component';

describe('CreateUpdateItemComponent', () => {
  let component: CreateUpdateItemComponent;
  let fixture: ComponentFixture<CreateUpdateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
