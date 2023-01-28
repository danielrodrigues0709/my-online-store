import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { productsList } from 'src/app/mocks/productsList';

import { ProdutDetailComponent } from './produt-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProdutDetailComponent', () => {
  let component: ProdutDetailComponent;
  let fixture: ComponentFixture<ProdutDetailComponent>;
  const fakeActivatedRoute = {
    snapshot: { 
      params: {
        id: '6'
      }
     }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ ProdutDetailComponent ],
      providers: [ MessageService,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("show render image", () => {
    const fixture = TestBed.createComponent(ProdutDetailComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    if(!component.product) {
      expect(compiled.querySelector('img')).toBeFalsy();
    }
  });
});
