import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CustomersService {
  constructor(private readonly http: HttpClient) {}

  public getStaffMembers(filters = {}) {
    return this.http.get<any>("/api/customers", { params: filters });
  }

  public creatCustomer(customer: any) {
    return this.http.post<any>("/api/customers/addCustomer", customer,{ });
  }
}
