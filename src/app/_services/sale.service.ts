import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  baseUrl = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }

  getSales() {
    return this.http
      .get<any>(this.baseUrl + "sales");
  }

  // deleteProduct(id: number) {
  //   return this.http
  //     .delete(this.baseUrl + "products/" + id);
  // }

  addSale(customerId: number, bill: number) {
    const saleData: any = {
      customerId: customerId,
      bill: bill
    };

    return this.http
      .post(this.baseUrl + "sales/", saleData);
  }

}
