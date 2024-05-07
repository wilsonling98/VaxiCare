import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineBatchFormComponent } from './vaccine-batch-form.component';

describe('VaccineBatchFormComponent', () => {
  let component: VaccineBatchFormComponent;
  let fixture: ComponentFixture<VaccineBatchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaccineBatchFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VaccineBatchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
