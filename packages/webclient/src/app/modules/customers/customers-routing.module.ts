import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { NewCustomerComponent } from "./new-customer-form/new-customer.component"

const routes: Routes = [
  {
    path: "",
    component: CustomerListComponent,
  },
  {
    path: "new-customer",
    component: NewCustomerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
