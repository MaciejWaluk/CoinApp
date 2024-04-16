import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { circulatingSupplyValidator } from './invalidCirculatingSupply';
import { CoinService } from '../coin.service';
import { Cryptocurrency } from 'src/models/Cryptocurrency';

@Component({
  selector: 'app-coin-form',
  templateUrl: './coin-form.component.html',
  styleUrls: ['./coin-form.component.css'],
})
export class CoinFormComponent {
  @Input() coin!: Cryptocurrency;
  @Output() coinUpdated: EventEmitter<Cryptocurrency> =
    new EventEmitter<Cryptocurrency>();
  @Output() coinAdded: EventEmitter<Cryptocurrency> =
    new EventEmitter<Cryptocurrency>();
  @Output() editCanceled: EventEmitter<void> = new EventEmitter<void>();

  public coinExistsMessage = '';
  public existsButtonClicked: boolean = false;

  constructor(private coinService: CoinService) {}

  public coinForm = new FormGroup({
    coinName: new FormControl('', [Validators.required]),
    coinSymbol: new FormControl('', [Validators.required]),
    coinCirulatingSupply: new FormControl('', [
      Validators.required,
      Validators.min(0),
      circulatingSupplyValidator,
    ]),
    coinTotalSupply: new FormControl('', [
      Validators.required,
      Validators.min(0),
      circulatingSupplyValidator,
    ]),
  });

  ngOnChanges() {
    if (this.coin) {
      this.coinForm.patchValue({
        coinName: this.coin.name,
        coinSymbol: this.coin.symbol,
        coinCirulatingSupply: this.coin.circulatingSupply.toString(),
        coinTotalSupply: this.coin.totalSupply.toString(),
      });
    }
  }

  updateCoin() {
    const id = this.coin.id;
    const name = this.coinForm.get('coinName')!.value as string;
    const symbol = this.coinForm.get('coinSymbol')!.value as string;
    const circulatingSupplyValue = this.coinForm.get(
      'coinCirulatingSupply'
    )!.value;
    const totalSupplyValue = this.coinForm.get('coinTotalSupply')!.value;

    const circulatingSupply = circulatingSupplyValue
      ? parseFloat(circulatingSupplyValue)
      : null;
    const totalSupply = totalSupplyValue ? parseFloat(totalSupplyValue) : null;

    if (
      circulatingSupply != null &&
      totalSupply != null &&
      !isNaN(circulatingSupply) &&
      !isNaN(totalSupply)
    ) {
      const updatedCoin = new Cryptocurrency(
        id,
        name,
        symbol,
        circulatingSupply,
        totalSupply
      );
      this.coinService
        .updateCryptocurrency(id, updatedCoin)
        .subscribe((data: any) => {
          this.coinUpdated.emit(data);
          console.log(data);
        });
    } else {
      console.error('Invalid circulatingSupply or totalSupply value.');
    }
  }

  addNewCoin() {
    const id = "00000000-0000-0000-0000-000000000000";
    const name = this.coinForm.get('coinName')!.value as string;
    const symbol = this.coinForm.get('coinSymbol')!.value as string;
    const circulatingSupplyValue = this.coinForm.get(
      'coinCirulatingSupply'
    )!.value;
    const totalSupplyValue = this.coinForm.get('coinTotalSupply')!.value;

    const circulatingSupply = circulatingSupplyValue
      ? parseFloat(circulatingSupplyValue)
      : null;
    const totalSupply = totalSupplyValue ? parseFloat(totalSupplyValue) : null;

    if (
      circulatingSupply != null &&
      totalSupply != null &&
      !isNaN(circulatingSupply) &&
      !isNaN(totalSupply)
    ) {
      const newCoin = new Cryptocurrency(
        id,
        name,
        symbol,
        circulatingSupply,
        totalSupply
      );
      this.coinService.createCryptocurrency(newCoin).subscribe((data: any) => {
        this.coinAdded.emit(data);
      });

      this.resetForm();
    } else {
      console.error('Invalid circulatingSupply or totalSupply value.');
    }
  }

  handleForm() {
    if (this.coin) {
      this.updateCoin();
    } else {
      this.addNewCoin();
    }
  }

  editCancelClicked() {
    this.editCanceled.emit();
  }

  ifCoinExists() {
    this.existsButtonClicked = true;

    const symbol = this.coinForm.get('coinSymbol')!.value as string;
    if (symbol === '') {
      this.coinExistsMessage = 'Please enter a symbol';
      return;
    }
    this.coinService.getCoin(symbol).subscribe((data: any) => {
      if (data.length > 0 && data[0].asset_id === symbol) {
        this.coinExistsMessage = `This coin exists, it's name is: ${data[0].name}`;
        this.coinForm.patchValue({coinName: data[0].name})
      } else {
        this.coinExistsMessage = 'This coin does not exist';
      }
    });
  }

  resetForm() {
    this.coinForm.reset();
    this.coinExistsMessage = '';
    this.existsButtonClicked = false;
  }
}
