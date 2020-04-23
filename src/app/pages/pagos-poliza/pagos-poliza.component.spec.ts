import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosPolizaComponent } from './pagos-poliza.component';

describe('PagosPolizaComponent', () => {
  let component: PagosPolizaComponent;
  let fixture: ComponentFixture<PagosPolizaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosPolizaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosPolizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
