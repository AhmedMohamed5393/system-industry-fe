import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { storeProvider } from "../../ngrx/app.provider";
import { Router } from "@angular/router";
import { IOrdersResponse } from "src/app/models/interfaces/responses/IOrdersResponse";
@Component({ selector: 'app-orders-list', templateUrl: './orders-list.component.html', styleUrls: ['./orders-list.component.css'] })
export class OrdersListComponent implements OnInit {
  public orders: any;
  public customers: any;
  public shownData: any;
  constructor(private cookieService: CookieService, private provider: storeProvider, private router: Router) {}
  public ngOnInit(): void {
    const token = this.cookieService.get('token');
    if (token) {
      this.shownData = [];
      this.provider.getAllCustomers$().subscribe((customers) => { this.customers = customers; });
      this.provider.getAllOrders$().subscribe((orders) => { this.orders = orders; });
      for (const customer of this.customers) {
        for (const order of this.orders) {
          this.shownData.push(this.mapOrderWithCustomerData(customer, order));
        }
      }
    }
    else this.router.navigateByUrl('/login');
  }
  private mapOrderWithCustomerData(customer: any, order: any): IOrdersResponse {
    return { id: order._id, customerName: customer.name, address: order.address, totalAmount: order.totalAmount };
  }
}
