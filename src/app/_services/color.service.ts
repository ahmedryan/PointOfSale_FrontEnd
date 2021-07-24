import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAttribute } from '../_models/attribute';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  baseUrl = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }

  getColors() {
    return this.http
      .get<IAttribute[]>(this.baseUrl + "colors");
  }
}
