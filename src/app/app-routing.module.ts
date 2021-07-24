import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { SaleComponent } from './sale/sale.component';
import { StaffComponent } from './staff/staff.component';
import { StockComponent } from './stock/stock.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    // data: { breadcrumb: "Home" }
  },
  {
    path: "stock",
    component: StockComponent,
    canActivate: [AuthGuard]
    // data: { breadcrumb: "Stock" }
  },
  {
    path: "report",
    component: ReportComponent,
    canActivate: [AuthGuard]
    // data: { breadcrumb: "Report" }
  },
  {
    path: "staff",
    component: StaffComponent,
    canActivate: [AuthGuard]
    // data: { breadcrumb: "Staff" }
  },
  {
    path: "sale",
    component: SaleComponent,
    canActivate: [AuthGuard]
    // data: { breadcrumb: "Staff" }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
