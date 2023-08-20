import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor() { }
  public profilePage=new BehaviorSubject(true)

}
