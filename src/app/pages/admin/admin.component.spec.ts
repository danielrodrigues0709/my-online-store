import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [ AdminComponent ],
      providers: [MessageService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should render p-tabView", () => {
    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p-tabView').innerHTML).toBeTruthy();
  });

  it("should render image or avatar", () => {
    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let products = component.products;
    if(products.length > 0) {
      products.forEach(prod => {
        if(prod.image) {
          expect(compiled.querySelector('image').innerHTML).toBeTruthy();
        }
        else {
          expect(compiled.querySelector('p-avatar').innerHTML).toBeTruthy();
        }
      })
    }
  });
});
