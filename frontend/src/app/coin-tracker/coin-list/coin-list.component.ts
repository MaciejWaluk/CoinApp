import { Component, OnInit } from '@angular/core';
import { Cryptocurrency } from 'src/models/Cryptocurrency';
import { CoinService } from '../coin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css'],
})
export class CoinListComponent implements OnInit {
  cryptocurrencies: Cryptocurrency[] = [];
  isEditing: boolean = false;
  editCoinData: Cryptocurrency | null = null;

  constructor(private coinService: CoinService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.coinService.getCryptocurrencies().subscribe((data: any) => {
      this.cryptocurrencies = data;
    });
  }

  handleCoinAdded(data: any) {
    var existingCoin = this.cryptocurrencies.find((coin) => coin.symbol === data.symbol);

    if (existingCoin) {
      this.toastr.error('Coin already exists', "", {
        positionClass: "toast-bottom-center"
      });
    }
    else{
      this.cryptocurrencies.push(data);
      this.toastr.success('Coin added', "", {
        positionClass: "toast-bottom-center"
      });

    }

  }
  handleCoinDeleted(data: any) {
    this.cryptocurrencies = this.cryptocurrencies.filter(
      (coin) => coin.id !== data.id
    );

    this.toastr.success('Coin deleted', "", {
      positionClass: "toast-bottom-center"
    });
  }

  handleEditClicked(data: any) {
    this.editCoinData = data;
    this.isEditing = true;
  }

  handleCoinUpdated(updatedCoin: Cryptocurrency) {
    const index = this.cryptocurrencies.findIndex(
      (coin) => coin.id === updatedCoin.id
    );
    if (index !== -1) {
      this.cryptocurrencies[index] = updatedCoin;
    }
    this.isEditing = false;

    this.toastr.success('Coin updated', "", {
      positionClass: "toast-bottom-center"
    });
  }

  handleEditCanceled() {
    this.isEditing = false;
    this.editCoinData = null;
  }
}
