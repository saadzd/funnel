import { Component, OnInit } from "@angular/core";
import { CustomersService } from "../customers.service";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"],
})
export class CustomerListComponent implements OnInit {
  public customers = [];
  public isLoading = true;
  public isError = false;

  constructor(private readonly customersService: CustomersService) {}

  ngOnInit(): void {
    this.customers = [];
    this.isLoading = true;
    this.isError = false;
    this.customersService.getStaffMembers({}).subscribe(
      (staffMembers) => {
        this.customers = staffMembers;
        this.isLoading = false;
        this.isError = false;
      },
      () => {
        this.customers = [];
        this.isLoading = false;
        this.isError = true;
      }
    );
  }

}
