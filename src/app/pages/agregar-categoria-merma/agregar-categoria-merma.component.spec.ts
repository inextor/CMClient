import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCategoriaMermaComponent } from './agregar-categoria-merma.component';

describe('AgregarCategoriaMermaComponent', () => {
  let component: AgregarCategoriaMermaComponent;
  let fixture: ComponentFixture<AgregarCategoriaMermaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarCategoriaMermaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCategoriaMermaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
