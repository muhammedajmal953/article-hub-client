import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/envinorments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }
  api=environments.api
  register(formData:any) {
    return this._http.post(`${this.api}/user`,formData)
  }

  login(formData:any) {
   return this._http.post(`${this.api}/login`,formData)
  }

  getUser() {

  }

}
