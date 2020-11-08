import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CustomersService } from "../customers.service";

@Component({
  selector: "app-new-customer",
  templateUrl: "./new-customer.component.html",
  styleUrls: ["./new-customer.component.scss"],
})
export class NewCustomerComponent implements OnInit {

  public isLoading = true;
  public isError = false;

  customerForm: FormGroup;

  constructor(private readonly customersService: CustomersService, private fb: FormBuilder) {}

  ngOnInit(): void {

    this.customerForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      notes: [''],
      interest: this.fb.group({
        hardwareType: [''],
        autonomy: [''],
        weight: [''],
        minPrice: [''],
        maxPrice: [''],
        brandId: [''],
      })
    });
  }

  createCustomer(): void {
    console.log(this.customerForm.getRawValue())
    this.customersService.creatCustomer(this.customerForm.getRawValue()).subscribe(
      (customer) => {
        console.log(customer)
      },
      () => {

      }
    );
  }

}
