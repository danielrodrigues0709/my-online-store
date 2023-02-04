import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeComponent } from './resume.component';

describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should render h3 with text", () => {
    const fixture = TestBed.createComponent(ResumeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    if(component.products) {
      expect(compiled.querySelector('h3').innerHTML).toContain('Resume');
    }
    else  {
      expect(compiled.querySelector('h3').innerHTML).toContain('Your cart is empty');
    }
  });

  it("should display totals", () => {
    fixture.detectChanges();
    if(component.products) {
      expect(component.values.total).toBeGreaterThan(0);
      expect(component.values.totalWithDiscount).toBeGreaterThan(0);
    }
    else {
      expect(component.values.total).toEqual(0);
      expect(component.values.totalWithDiscount).toEqual(0);
    }
  });
});
