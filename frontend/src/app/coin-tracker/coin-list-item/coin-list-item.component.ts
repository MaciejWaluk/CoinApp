import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cryptocurrency } from 'src/models/Cryptocurrency';
import { CoinService } from '../coin.service';

@Component({
  selector: 'app-coin-list-item',
  templateUrl: './coin-list-item.component.html',
  styleUrls: ['./coin-list-item.component.css'],
})
export class CoinListItemComponent implements OnInit {
  @Input() coin!: Cryptocurrency;
  @Output() deleteClicked: EventEmitter<Cryptocurrency> =
    new EventEmitter<Cryptocurrency>();
  @Output() editClicked: EventEmitter<Cryptocurrency> =
    new EventEmitter<Cryptocurrency>();

  priceData: any = 'Click "Get price"';

  constructor(private coinService: CoinService) {}
  ngOnInit(): void {}

  removeCoin() {
    this.coinService.deleteCryptocurrency(this.coin.id).subscribe(() => {
      this.deleteClicked.emit(this.coin);
    });
  }

  editCoin() {
    this.editClicked.emit(this.coin);
  }

  getPrice() {
    this.coinService
      .getPrice(this.coin.symbol, 'USD')
      .subscribe((data: any) => {
        if (typeof data === 'string') {
          this.priceData = data;
        }
        this.priceData = '$' + data.rate.toFixed(2).replace('.', ',');
      });
  }
}
