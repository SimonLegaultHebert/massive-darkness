import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeTabComponent } from './life-tab.component';

describe('LifeTabComponent', () => {
  let component: LifeTabComponent;
  let fixture: ComponentFixture<LifeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LifeTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
