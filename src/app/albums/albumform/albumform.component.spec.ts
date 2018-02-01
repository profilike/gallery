import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumformComponent } from './albumform.component';

describe('AlbumformComponent', () => {
  let component: AlbumformComponent;
  let fixture: ComponentFixture<AlbumformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
