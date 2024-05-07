import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineBatchListComponent } from './vaccine-batch-list.component';

describe('VaccineBatchListComponent', () => {
  let component: VaccineBatchListComponent;
  let fixture: ComponentFixture<VaccineBatchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaccineBatchListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VaccineBatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
