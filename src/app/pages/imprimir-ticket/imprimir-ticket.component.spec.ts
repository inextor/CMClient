import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirTicketComponent } from './imprimir-ticket.component';

describe('ImprimirTicketComponent', () => {
  let component: ImprimirTicketComponent;
  let fixture: ComponentFixture<ImprimirTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprimirTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
