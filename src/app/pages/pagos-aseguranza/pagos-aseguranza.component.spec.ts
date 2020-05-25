import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosAseguranzaComponent } from './pagos-aseguranza.component';

describe('PagosAseguranzaComponent', () => {
  let component: PagosAseguranzaComponent;
  let fixture: ComponentFixture<PagosAseguranzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosAseguranzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosAseguranzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
