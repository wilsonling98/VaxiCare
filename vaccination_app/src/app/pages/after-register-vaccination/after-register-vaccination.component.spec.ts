import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterRegisterVaccinationComponent } from './after-register-vaccination.component';

describe('AfterRegisterVaccinationComponent', () => {
  let component: AfterRegisterVaccinationComponent;
  let fixture: ComponentFixture<AfterRegisterVaccinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfterRegisterVaccinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfterRegisterVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
