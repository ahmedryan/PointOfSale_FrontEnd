import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IAttribute } from '../_models/attribute';
import { IProduct } from '../_models/product';
import { ProductParameters } from '../_models/productParameter';
import { CategoryService } from '../_services/category.service';
import { ColorService } from '../_services/color.service';
import { FitService } from '../_services/fit.service';
import { ProductService } from '../_services/product.service';
import { ReportService } from '../_services/report.service';
import { SaleService } from '../_services/sale.service';
import { SizeService } from '../_services/size.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  stockReport: any;
  saleReport: any;

  categoryReport: any;

  categoryLeftReport: any;
  colorLeftReport: any;
  sizeLeftReport: any;
  fitLeftReport: any;

  categorySoldReport: any;
  colorSoldReport: any;
  sizeSoldReport: any;
  fitSoldReport: any;

  constructor(private reportService: ReportService, private saleService: SaleService) { }

  ngOnInit() {
    this.getStockReport();
    this.getSaleReport();
  }

  getSaleReport() {
    this.saleService
      .getSales()
      .subscribe(response => {
        this.saleReport = response;
        console.log(this.saleReport);
      }, err => {
        console.log(err);
      });
  }

  getStockReport() {
    this.reportService
      .getReport()
      .subscribe(response => {
        this.stockReport = response;
        console.log(this.stockReport);

        // for (var [key1, value1] of Object.entries(this.stockReport)) {
        //   console.log(key1 + "->" + value1);
        //   this.categoryReport
        //   for (var [key2, value2] of Object.entries(value1)) {
        //     console.log(key2 + "->" + value2);
        //   }
        // }

        this.categoryLeftReport = Object.keys(this.stockReport.categoryLeftCount).map((key) => [String(key), this.stockReport.categoryLeftCount[key]]);
        this.colorLeftReport = Object.keys(this.stockReport.colorLeftCount).map((key) => [String(key), this.stockReport.colorLeftCount[key]]);
        this.sizeLeftReport = Object.keys(this.stockReport.sizeLeftCount).map((key) => [String(key), this.stockReport.sizeLeftCount[key]]);
        this.fitLeftReport = Object.keys(this.stockReport.fitLeftCount).map((key) => [String(key), this.stockReport.fitLeftCount[key]]);

        // this.categorySoldReport = Object.keys(this.stockReport.categoryLeftCount).map((key) => [String(key), this.stockReport.categorySoldCount[key]]);
        // this.colorSoldReport = Object.keys(this.stockReport.colorLeftCount).map((key) => [String(key), this.stockReport.colorSoldCount[key]]);
        // this.sizeSoldReport = Object.keys(this.stockReport.sizeLeftCount).map((key) => [String(key), this.stockReport.sizeSoldCount[key]]);
        // this.fitSoldReport = Object.keys(this.stockReport.fitLeftCount).map((key) => [String(key), this.stockReport.fitSoldCount[key]]);
        this.categorySoldReport = Object.keys(this.stockReport.categorySoldCount).map((key) => [String(key), this.stockReport.categorySoldCount[key]]);
        this.colorSoldReport = Object.keys(this.stockReport.colorSoldCount).map((key) => [String(key), this.stockReport.colorSoldCount[key]]);
        this.sizeSoldReport = Object.keys(this.stockReport.sizeSoldCount).map((key) => [String(key), this.stockReport.sizeSoldCount[key]]);
        this.fitSoldReport = Object.keys(this.stockReport.fitSoldCount).map((key) => [String(key), this.stockReport.fitSoldCount[key]]);

        // console.log(this.categoryLeftReport);
        // console.log(this.categorySoldReport);
      }, err => {
        console.log(err);
      });
  }

}
