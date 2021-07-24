import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { isVariableDeclarationList } from 'typescript';
import { IProduct } from '../_models/product';
import { ProductParameters } from '../_models/productParameter';
import { CustomerService } from '../_services/customer.service';
import { ProductService } from '../_services/product.service';
import { SaleService } from '../_services/sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  @ViewChild("mysearch", { static: false }) searchTerm: ElementRef;

  products: IProduct[] = [];
  productParameters = new ProductParameters();

  cart: IProduct[] = [];

  customer: any = {};
  validation: any = {};
  showNotFound = false;
  totalPrice = 0;

  constructor(private productService: ProductService, private customerService: CustomerService, private saleService: SaleService) { }

  ngOnInit() {
    this.getProducts();
    this.customer.name = "";
    this.customer.contact = "";
    // if (localStorage.getItem("cart") !== null) this.calculateTotalPrice();
  }

  getProducts() {
    this.productParameters.pageSize = 0;
    this.productParameters.pageIndex = 0;
    // console.log(this.productParameters);
    this.productService
      .getProducts(this.productParameters)
      .subscribe(response => {
        this.products = response.data;
        // this.pageIndex = response.pageIndex;
        // this.pageSize = response.pageSize;
        // this.totalCount = response.count;
        // console.log(this.products);
      }, err => {
        console.log(err);
      });
  }

  addToCart() {
    var productToAdd = this.searchTerm.nativeElement.value;
    var isProductFound = this.products.find(x => x.pid.toLowerCase() === productToAdd.toLowerCase());
    // console.log(this.products.find(x => x.pid.toLowerCase === productToAdd.toLowerCase));
    if (isProductFound) {
      this.cart.push(isProductFound);
      this.products = this.products.filter(x => x.pid.toLowerCase() !== productToAdd.toLowerCase());
      // localStorage.setItem("cart", JSON.stringify(this.cart));
      this.calculateTotalPrice();

      console.log(this.cart);

      // console.log("tostring---" + JSON.stringify(this.cart));
      // console.log("tostring---" + JSON.parse(JSON.stringify(this.cart)));

      // console.log(this.products);
      // console.log(this.cart);
      this.showNotFound = false;
    } else {
      this.showNotFound = true;
      setTimeout(() => {
        this.showNotFound = false;
      }, 2000);
    }
  }

  removeFromCart(item: IProduct) {
    this.cart = this.cart.filter(x => x.pid.toLowerCase() !== item.pid.toLowerCase());
    this.products.push(item);
    this.calculateTotalPrice();
    // console.log(this.cart);
    // console.log(this.products);
  }

  calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((prev, next) => {
      return prev + next.price;
    }, 0);
  }

  customerNameValidation() {
    if (this.customer.name.length < 4) this.validation.name = false;
    else this.validation.name = true;
  }

  customerContactValidation() {
    if (this.customer.name.length < 4) this.validation.name = false;
    else this.validation.name = true;
    if (this.customer.contact.length !== 11) this.validation.contact = false;
    else this.validation.contact = true;
  }

  confirmOrder() {
    // console.log(this.customer.name);
    // console.log(this.customer.contact);
    // console.log(this.cart);
    // console.log(this.totalPrice);

    if (this.validation.name === false || this.validation.contact === false) return;

    this.addCustomer();

    // localStorage.removeItem("cart");
    // localStorage.removeItem("customerName");
    // localStorage.removeItem("customerContact");

    // this.cart.forEach(x => {
    //   this.editProduct(x.id, x.pid, x.categoryId, x.fitId, x.sizeId, x.colorId, x.price, x.dateOfPurchase, saleId);
    //   console.log("entered.......");
    // });
  }

  addCustomer(): any {
    this.customerService
      .addCustomer(this.customer.name, this.customer.contact)
      .subscribe(response => {
        console.log("Customer Id -------> " + response);
        return this.addSale(response);
      }, err => {
        console.log(err);
      });
  }

  addSale(customerId) {
    this.saleService
      .addSale(customerId, this.totalPrice)
      .subscribe(response => {
        // console.log("Sale Id -------> " + response);
        var saleId = parseInt(response.toString());
        // console.log("Sale Id Integer-------> " + saleId);
        console.log("Cart -------> " + this.cart);

        this.cart.forEach(x => {
          console.log("entered 2 .......");
          this.editProduct(x.id, x.pid, x.categoryId, x.fitId, x.sizeId, x.colorId, x.price, x.dateOfPurchase, saleId);
          console.log("entered 1 .......");
        });

        this.customer.name = "";
        this.customer.contact = "";
        this.cart = [];
      }, err => {
        console.log(err);
      })
  }

  editProduct(id: number, pid: string, categoryId: number, fitId: number, sizeId: number, colorId: number,
    price: number, dateOfPurchase: Date, saleId: number) {
    // console.log("id: " + id);
    // console.log("pid: " + pid);
    // console.log("categoryId: " + categoryId);
    // console.log("fitId: " + fitId);
    // console.log("sizeId: " + sizeId);
    // console.log("colorId: " + colorId);
    // console.log("price: " + price);
    // console.log("dateOfPurchase: " + dateOfPurchase);

    this.productService
      .editProduct(id, pid, categoryId, fitId, sizeId, colorId, price, dateOfPurchase, saleId)
      .subscribe(response => {
        console.log(response);
        this.getProducts();
      });
  }

  resetOrder() {

  }
}
