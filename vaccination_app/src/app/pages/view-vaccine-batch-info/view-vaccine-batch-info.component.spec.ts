import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVaccineBatchInfoComponent } from './view-vaccine-batch-info.component';

describe('ViewVaccineBatchInfoComponent', () => {
  let component: ViewVaccineBatchInfoComponent;
  let fixture: ComponentFixture<ViewVaccineBatchInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewVaccineBatchInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewVaccineBatchInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
