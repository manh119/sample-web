import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDepartmentComponent } from './page-department.component';

describe('PageDepartmentComponent', () => {
  let component: PageDepartmentComponent;
  let fixture: ComponentFixture<PageDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
