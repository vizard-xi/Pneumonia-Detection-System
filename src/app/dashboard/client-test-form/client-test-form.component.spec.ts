import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTestFormComponent } from './client-test-form.component';

describe('ClientTestFormComponent', () => {
  let component: ClientTestFormComponent;
  let fixture: ComponentFixture<ClientTestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientTestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientTestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
