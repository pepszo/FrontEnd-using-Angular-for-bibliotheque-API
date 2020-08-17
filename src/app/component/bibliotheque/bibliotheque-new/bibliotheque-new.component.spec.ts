import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliothequeNewComponent } from './bibliotheque-new.component';

describe('BibliothequeNewComponent', () => {
  let component: BibliothequeNewComponent;
  let fixture: ComponentFixture<BibliothequeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibliothequeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliothequeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
