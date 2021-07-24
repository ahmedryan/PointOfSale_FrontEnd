import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductParameters } from '../_models/productParameter';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }

  // getProduct(id: number) {
  //   return this.http
  //     .get<IProduct>(this.baseUrl + "products/" + id);
  // }

  // deleteProduct(id: number) {
  //   return this.http
  //     .delete(this.baseUrl + "products/" + id);
  // }

  addCustomer(name: string, contactNumber: string) {
    const customerData: any = {
      name: name,
      contactNumber: contactNumber
    };

    return this.http
      .post(this.baseUrl + "customers/", customerData);
  }

}
