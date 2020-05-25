import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAseguranzaComponent } from './agregar-aseguranza.component';

describe('AgregarAseguranzaComponent', () => {
  let component: AgregarAseguranzaComponent;
  let fixture: ComponentFixture<AgregarAseguranzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarAseguranzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAseguranzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
