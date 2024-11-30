import { Injectable } from '@angular/core';
import { environments } from '../../environments/envinorments';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';
import { __generator } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private _http: HttpClient) { }
  api = environments.api

  addArticle(formData: any) {
    return this._http.post(`${this.api}/article`,formData)
  }

  getAllArticles() {
    return this._http.get(`${this.api}/get-all-articles`)
  }

  getOwnArticles() {
    return this._http.get(`${this.api}/get-own-articles`)
  }

  getArticle(id: string) {
    return this._http.get(`${this.api}/article?id=${id}`)
  }

  editArticle(id: string,formData:any) {
    return this._http.put(`${this.api}/article?id=${id}`,formData)
  }

  deleteArticle(id: string) {
    return this._http.delete(`${this.api}/article?id=${id}`)
  }
}
