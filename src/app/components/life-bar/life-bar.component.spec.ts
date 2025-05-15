import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeBarComponent } from './life-bar.component';

describe('LifeBarComponent', () => {
  let component: LifeBarComponent;
  let fixture: ComponentFixture<LifeBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LifeBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
