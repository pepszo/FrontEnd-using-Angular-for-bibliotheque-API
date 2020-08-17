import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreNewComponent } from './livre-new.component';

describe('LivreNewComponent', () => {
  let component: LivreNewComponent;
  let fixture: ComponentFixture<LivreNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivreNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
