import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ UserComponent ],
      providers: [FormBuilder, MessageService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let userDataStr = localStorage.getItem('userData');
    if(userDataStr != null) component.user = JSON.parse(userDataStr);
  });

  it('should display gender option', () => {
    let genders = [
      {name: 'Male', value: 'male'},
      {name: 'Female', value: 'female'}
    ];
    expect(component.genders).toEqual(genders);
  });

  it('should contain at least 1 address', () => {
    if(component.user) {
      expect(component.addresses).toBeGreaterThan(0);
    }
    else {
      expect(component.addresses).toEqual([]);
    }
  });

  it('show check privacy policies option', () => {
    if(component.user) {
      expect(component.selectedValues).toContain('privacy');
    }
    else {
      expect(component.selectedValues).toBeUndefined();
    }
  });

  it("should render h3 with text", () => {
    const fixture = TestBed.createComponent(UserComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').innerHTML).toContain('My Account');
  });
});
