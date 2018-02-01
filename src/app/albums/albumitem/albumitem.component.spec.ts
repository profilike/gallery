import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumitemComponent } from './albumitem.component';

describe('AlbumlistComponent', () => {
  let component: AlbumitemComponent;
  let fixture: ComponentFixture<AlbumitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
