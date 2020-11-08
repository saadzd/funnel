import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomersRoutingModule } from "./customers-routing.module";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { NewCustomerComponent } from "./new-customer-form/new-customer.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomerListComponent, NewCustomerComponent],
  imports: [CommonModule, CustomersRoutingModule, ReactiveFormsModule, FormsModule],
})
export class CustomersModule {}
