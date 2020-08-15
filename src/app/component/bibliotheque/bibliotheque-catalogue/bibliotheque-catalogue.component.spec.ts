import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliothequeCatalogueComponent } from './bibliotheque-catalogue.component';

describe('BibliothequeCatalogueComponent', () => {
  let component: BibliothequeCatalogueComponent;
  let fixture: ComponentFixture<BibliothequeCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibliothequeCatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliothequeCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
