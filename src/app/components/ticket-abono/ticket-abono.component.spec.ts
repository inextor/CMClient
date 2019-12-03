import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAbonoComponent } from './ticket-abono.component';

describe('TicketAbonoComponent', () => {
  let component: TicketAbonoComponent;
  let fixture: ComponentFixture<TicketAbonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketAbonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
