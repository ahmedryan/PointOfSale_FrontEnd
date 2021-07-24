import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  baseUrl = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }

  getStaffs() {
    return this.http
      .get(this.baseUrl + "accounts");
  }

  deleteStaff(staffId: string) {
    return this.http
      .delete(this.baseUrl + "accounts/" + staffId);
  }

}
