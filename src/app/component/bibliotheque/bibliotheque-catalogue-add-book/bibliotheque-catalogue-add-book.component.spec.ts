import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliothequeCatalogueAddBookComponent } from './bibliotheque-catalogue-add-book.component';

describe('BibliothequeCatalogueAddBookComponent', () => {
  let component: BibliothequeCatalogueAddBookComponent;
  let fixture: ComponentFixture<BibliothequeCatalogueAddBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibliothequeCatalogueAddBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliothequeCatalogueAddBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
