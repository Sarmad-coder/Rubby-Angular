// country.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getCountryDataByCode(countryCode: string) {
    return this.http.get(`https://restcountries.com/v3.1/alpha/${countryCode}`).toPromise();
  }
}
