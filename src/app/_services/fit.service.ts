import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAttribute } from '../_models/attribute';

@Injectable({
  providedIn: 'root'
})
export class FitService {
  baseUrl = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }

  getFits() {
    return this.http
      .get<IAttribute[]>(this.baseUrl + "fits");
  }
}
