import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasMermaComponent } from './categorias-merma.component';

describe('CategoriasMermaComponent', () => {
  let component: CategoriasMermaComponent;
  let fixture: ComponentFixture<CategoriasMermaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasMermaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasMermaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
