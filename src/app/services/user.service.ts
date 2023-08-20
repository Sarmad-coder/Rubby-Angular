import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }

 async CreateUser(data:Object){
    return await firstValueFrom(this.http.post(environment.apiUrl+"/users/create-user", data))
  }
  async GetUser(data:any){
  
    return await firstValueFrom(this.http.get(environment.apiUrl+"/users/get-user?email="+data.email+"&&password="+data.password))
  }
  async GetUserByEmail(email:any){
   
    return await firstValueFrom(this.http.get(environment.apiUrl+"/users/get-user-by-email?email="+email))
  }

  async GetUserByToken(token:any){
   
    return await firstValueFrom(this.http.get(environment.apiUrl+"/users/get-user-by-token?token="+token))
  }
  async ChangePassword(data:Object){
    return await firstValueFrom(this.http.put(environment.apiUrl+"/users/change-password",data))
  }
 
  
}
