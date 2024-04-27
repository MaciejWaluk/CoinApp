import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  requestCoinApiOptions = {
    headers: {
      'X-CoinAPI-Key': environment.coinApiKey,
    },
  };

  public getCryptocurrencies() {
    console.log("baseUrl: ", this.baseUrl)
    return this.http.get(`${this.baseUrl}`);
  }

  public getCryptocurrency(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  public createCryptocurrency(cryptocurrency: any) {
    return this.http.post(`${this.baseUrl}`, cryptocurrency);
  }

  public updateCryptocurrency(id: string, cryptocurrency: any) {
    return this.http.put(
      `${this.baseUrl}/${id}`,
      cryptocurrency
    );
  }

  public deleteCryptocurrency(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  public getPrice(symbol: string, currency: string) {
    return this.http
      .get(
        `${environment.coinApiUrl}/${symbol}/${currency}`,
        this.requestCoinApiOptions
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching price:', error);
          return of('Coin not found');
        })
      );
  }

  public getCoin(symbol: string) {
    return this.http
      .get(
        `https://rest.coinapi.io/v1/assets/${symbol}`,
        this.requestCoinApiOptions
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching coin:', error);
          return of('Coin not found');
        })
      );
  }
}
