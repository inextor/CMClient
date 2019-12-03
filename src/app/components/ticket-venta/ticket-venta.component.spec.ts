import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketVentaComponent } from './ticket-venta.component';

describe('TicketVentaComponent', () => {
  let component: TicketVentaComponent;
  let fixture: ComponentFixture<TicketVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
