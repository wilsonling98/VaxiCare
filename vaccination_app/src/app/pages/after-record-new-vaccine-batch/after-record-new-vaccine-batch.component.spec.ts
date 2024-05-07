import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterRecordNewVaccineBatchComponent } from './after-record-new-vaccine-batch.component';

describe('AfterRecordNewVaccineBatchComponent', () => {
  let component: AfterRecordNewVaccineBatchComponent;
  let fixture: ComponentFixture<AfterRecordNewVaccineBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfterRecordNewVaccineBatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfterRecordNewVaccineBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
