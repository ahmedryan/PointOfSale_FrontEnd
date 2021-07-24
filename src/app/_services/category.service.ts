import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAttribute } from '../_models/attribute';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http
      .get<IAttribute[]>(this.baseUrl + "categories");
  }
}
