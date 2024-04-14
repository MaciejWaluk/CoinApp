import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinListItemComponent } from './coin-list-item.component';

describe('CoinListItemComponent', () => {
  let component: CoinListItemComponent;
  let fixture: ComponentFixture<CoinListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoinListItemComponent],
    });
    fixture = TestBed.createComponent(CoinListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
