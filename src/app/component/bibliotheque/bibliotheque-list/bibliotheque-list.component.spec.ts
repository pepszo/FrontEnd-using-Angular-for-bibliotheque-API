import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliothequeListComponent } from './bibliotheque-list.component';

describe('BibliothequeListComponent', () => {
  let component: BibliothequeListComponent;
  let fixture: ComponentFixture<BibliothequeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibliothequeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliothequeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
