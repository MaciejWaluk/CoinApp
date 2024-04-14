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
    return this.http.get(`${this.baseUrl}/Cryptocurrencies`);
  }

  public getCryptocurrency(id: number) {
    return this.http.get(`${this.baseUrl}/Cryptocurrencies/${id}`);
  }

  public createCryptocurrency(cryptocurrency: any) {
    return this.http.post(`${this.baseUrl}/Cryptocurrencies`, cryptocurrency);
  }

  public updateCryptocurrency(id: number, cryptocurrency: any) {
    return this.http.put(
      `${this.baseUrl}/Cryptocurrencies/${id}`,
      cryptocurrency
    );
  }

  public deleteCryptocurrency(id: number) {
    return this.http.delete(`${this.baseUrl}/Cryptocurrencies/${id}`);
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
