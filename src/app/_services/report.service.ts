import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  baseUrl = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }

  getReport() {
    return this.http
      .get(this.baseUrl + "reports");
  }

}
