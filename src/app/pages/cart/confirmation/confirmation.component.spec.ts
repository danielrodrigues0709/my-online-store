import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationComponent } from './confirmation.component';

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("show render h2 with text", () => {
    const fixture = TestBed.createComponent(ConfirmationComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2')).toBeTruthy();
    expect(compiled.querySelector('h2').innerHTML).toBe('Congratulations!');
  });

  it("show render h5 with text", () => {
    const fixture = TestBed.createComponent(ConfirmationComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h5')).toBeTruthy();
    expect(compiled.querySelector('h5').innerHTML).toContain('Your purchase was successfully completed');
  });
});
