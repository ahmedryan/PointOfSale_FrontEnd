import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAttribute } from '../_models/attribute';
import { IPagination } from '../_models/pagination';
import { IProduct } from '../_models/product';
import { ProductParameters } from '../_models/productParameter';
import { CategoryService } from '../_services/category.service';
import { ColorService } from '../_services/color.service';
import { FitService } from '../_services/fit.service';
import { ProductService } from '../_services/product.service';
import { SizeService } from '../_services/size.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  @ViewChild("mysearch", { static: false }) searchTerm: ElementRef;

  products: IProduct[];
  categories: IAttribute[];
  colors: IAttribute[];
  sizes: IAttribute[];
  fits: IAttribute[];
  selectedProduct: IProduct | null | undefined;
  productToAdd: IProduct | null | undefined | any;

  productParameters = new ProductParameters();
  totalCount = 0;
  pageIndex = 0;
  pageSize = 0;

  constructor(private productService: ProductService, private categoryService: CategoryService, private colorService: ColorService,
    private sizeService: SizeService, private fitService: FitService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.getColors();
    this.getSizes();
    this.getFits();
  }

  addProduct(pid: string, categoryId: number, fitId: number, sizeId: number, colorId: number,
    price: number, dateOfPurchase: Date) {
    // console.log("id: " + id);
    console.log("pid: " + pid);
    console.log("categoryId: " + categoryId);
    console.log("fitId: " + fitId);
    console.log("sizeId: " + sizeId);
    console.log("colorId: " + colorId);
    console.log("price: " + price);
    // console.log("dateOfPurchase: " + dateOfPurchase);

    this.productService
      .addProduct(pid, categoryId, fitId, sizeId, colorId, price)
      .subscribe(response => {
        console.log(response);
        this.getProducts();
      });
  }

  editProduct(id: number, pid: string, categoryId: number, fitId: number, sizeId: number, colorId: number,
    price: number, dateOfPurchase: Date) {
    console.log("id: " + id);
    console.log("pid: " + pid);
    console.log("categoryId: " + categoryId);
    console.log("fitId: " + fitId);
    console.log("sizeId: " + sizeId);
    console.log("colorId: " + colorId);
    console.log("price: " + price);
    console.log("dateOfPurchase: " + dateOfPurchase);

    this.productService
      .editProduct(id, pid, categoryId, fitId, sizeId, colorId, price, dateOfPurchase, null)
      .subscribe(response => {
        console.log(response);
        this.getProducts();
      });
  }

  deleteProduct(id: number) {
    console.log(id + " is about to be deleted...");
    this.productService
      .deleteProduct(id)
      .subscribe(response => {
        console.log(response);
        this.getProducts();
      });
  }

  getProducts() {
    console.log(this.productParameters);
    this.productService
      .getProducts(this.productParameters)
      .subscribe(response => {
        this.products = response.data;
        this.pageIndex = response.pageIndex;
        this.pageSize = response.pageSize;
        this.totalCount = response.count;
        console.log(this.pageIndex);
        console.log(this.pageSize);
        console.log(this.totalCount);
      }, err => {
        console.log(err);
      });
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe(response => {
        this.categories = response;
      }, err => {
        console.log(err);
      });
  }

  getColors() {
    this.colorService
      .getColors()
      .subscribe(response => {
        this.colors = response;
      }, err => {
        console.log(err);
      });
  }

  getSizes() {
    this.sizeService
      .getSizes()
      .subscribe(response => {
        this.sizes = response;
      }, err => {
        console.log(err);
      });
  }

  getFits() {
    this.fitService
      .getFits()
      .subscribe(response => {
        this.fits = response;
      }, err => {
        console.log(err);
      });
  }

  onCategorySelected(categoryId: number) {
    this.productParameters.categoryId = categoryId;
    this.productParameters.pageIndex = 1;
    this.getProducts();
  }

  onColorSelected(colorId: number) {
    this.productParameters.colorId = colorId;
    this.productParameters.pageIndex = 1;
    this.getProducts();
  }

  onSizeSelected(sizeId: number) {
    this.productParameters.sizeId = sizeId;
    this.productParameters.pageIndex = 1;
    this.getProducts();
  }

  onFitSelected(fitId: number) {
    this.productParameters.fitId = fitId;
    this.productParameters.pageIndex = 1;
    this.getProducts();
  }

  onSortByPriceSelected(sortType: string) {
    this.productParameters.sortPrice = sortType;
    this.productParameters.pageIndex = 1;
    this.getProducts();
  }

  onSortByDateSelected(sortType: string) {
    this.productParameters.sortDate = sortType;
    this.productParameters.pageIndex = 1;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.pageIndex !== event) {
      this.productParameters.pageIndex = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.productParameters.search = this.searchTerm.nativeElement.value;
    this.productParameters.pageIndex = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = "";
    this.productParameters = new ProductParameters();
    this.getProducts();
  }

  openModal(content, product) {
    if (product) {
      this.productToAdd = null;
      this.selectedProduct = product;
    }
    else {
      this.selectedProduct = null;
      this.productToAdd = new Object();
      this.productToAdd.pid = "";
      this.productToAdd.price = 0;
      this.productToAdd.categoryId = 1;
      this.productToAdd.colorId = 1;
      this.productToAdd.sizeId = 1;
      this.productToAdd.fitId = 1;
    }
    console.log(this.selectedProduct);
    console.log(this.productToAdd);

    this.modalService
      .open(content)
      .result
      .then((result) => {
        console.log("Closed with " + result);
      }, (reason) => {
        console.log("Dismissed with " + reason);
      });

  }
}
