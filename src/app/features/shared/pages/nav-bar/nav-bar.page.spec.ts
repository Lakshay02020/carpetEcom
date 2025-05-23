import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarPage } from './nav-bar.page';

describe('NavBarPage', () => {
  let component: NavBarPage;
  let fixture: ComponentFixture<NavBarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
