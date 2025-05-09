import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarknessCounterComponent } from './darkness-counter.component';

describe('DarknessCounterComponent', () => {
  let component: DarknessCounterComponent;
  let fixture: ComponentFixture<DarknessCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DarknessCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarknessCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
