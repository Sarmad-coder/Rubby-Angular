import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor( private http: HttpClient) { }
  async CreateProfile(data:Object){
    return await firstValueFrom(this.http.post(environment.apiUrl+"/profile/create-profile", data))
  }
  async GetProfileByID(id:any){
   
    return await firstValueFrom(this.http.get(environment.apiUrl+"/profile/get-profile-by-id?id="+id))
  }
  async GetProfileBySlug(slug:any){
   
    return await firstValueFrom(this.http.get(environment.apiUrl+"/profile/get-profile-by-slug?slug="+slug))
  }
  async UpdateProfile(data:Object){
   
    return await firstValueFrom(this.http.put(environment.apiUrl+"/profile/update-profile",data))
  }

  async GetAllProfiles(userID:any){
   
    return await firstValueFrom(this.http.get(environment.apiUrl+"/profile/get-all-profiles?userID="+userID))
  }
  
  async Views(slug:string){
   
    return await firstValueFrom(this.http.get(environment.apiUrl+"/profile/views?slug="+slug))
  }

}
