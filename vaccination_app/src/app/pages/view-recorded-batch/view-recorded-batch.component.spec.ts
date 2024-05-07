import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecordedBatchComponent } from './view-recorded-batch.component';

describe('ViewRecordedBatchComponent', () => {
  let component: ViewRecordedBatchComponent;
  let fixture: ComponentFixture<ViewRecordedBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRecordedBatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRecordedBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
