import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  async GetOrderByEmail(email:String){
   
    return await firstValueFrom(this.http.get(environment.apiUrl+"/get-order-by-email?email="+email))
  }
  async GetOrder(email:String){
   
    return await firstValueFrom(this.http.get(environment.apiUrl+"/get-order?email="+email))
  }
}
