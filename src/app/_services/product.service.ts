import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IPagination } from '../_models/pagination';
import { IProduct } from '../_models/product';
import { ProductParameters } from '../_models/productParameter';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }

  getProducts(productParameters: ProductParameters) {
    let params = new HttpParams();

    params = params.append("sort", productParameters.pid);

    params = params.append("categoryId", productParameters.categoryId.toString());
    params = params.append("colorId", productParameters.colorId.toString());
    params = params.append("sizeId", productParameters.sizeId.toString());
    params = params.append("fitId", productParameters.fitId.toString());

    params = params.append("highprice", productParameters.highPrice.toString());
    params = params.append("lowprice", productParameters.lowPrice.toString());

    params = params.append("search", productParameters.search);

    params = params.append("sortPrice", productParameters.sortPrice.toString());
    params = params.append("sortDate", productParameters.sortDate.toString());

    params = params.append("pageIndex", productParameters.pageIndex.toString());
    params = params.append("pageSize", productParameters.pageSize.toString());

    return this.http
      .get<IPagination>(this.baseUrl + "products", { observe: "response", params })
      .pipe(
        map(response => {
          // console.log(response.body);
          return response.body;
        })
      );
  }

  getProduct(id: number) {
    return this.http
      .get<IProduct>(this.baseUrl + "products/" + id);
  }

  deleteProduct(id: number) {
    return this.http
      .delete(this.baseUrl + "products/" + id);
  }

  editProduct(id: number, pid: string, categoryId: number, fitId: number, sizeId: number, colorId: number,
    price: number, dateOfPurchase: Date, saleId: number) {
    const productData: any = {
      id: id,
      pid: pid,
      categoryId: categoryId,
      fitId: fitId,
      sizeId: sizeId,
      colorId: colorId,
      price: price,
      dateOfPurchase: dateOfPurchase,
      saleId: saleId
    };

    return this.http
      .patch(this.baseUrl + "products/" + id, productData);
  }

  addProduct(pid: string, categoryId: number, fitId: number, sizeId: number, colorId: number, price: number) {
    const productData: any = {
      pid: pid,
      categoryId: categoryId,
      fitId: fitId,
      sizeId: sizeId,
      colorId: colorId,
      price: price,
    };

    return this.http
      .post(this.baseUrl + "products/", productData);
  }
}
