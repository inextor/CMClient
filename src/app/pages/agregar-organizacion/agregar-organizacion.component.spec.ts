import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarOrganizacionComponent } from './agregar-organizacion.component';

describe('AgregarOrganizacionComponent', () => {
  let component: AgregarOrganizacionComponent;
  let fixture: ComponentFixture<AgregarOrganizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarOrganizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarOrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
