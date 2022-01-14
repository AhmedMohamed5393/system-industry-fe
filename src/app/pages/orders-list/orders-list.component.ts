import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { storeProvider } from "../../ngrx/app.provider";
import { Router } from "@angular/router";
import { IOrdersListResponse } from "src/app/models/interfaces/responses/IOrdersListResponse";
import { Observable } from "rxjs";
import { IOrder } from "src/app/models/interfaces/responses/IOrder";
import { ICustomer } from "src/app/models/interfaces/responses/ICustomer";
@Component({ selector: 'app-orders-list', templateUrl: './orders-list.component.html', styleUrls: ['./orders-list.component.css'] })
export class OrdersListComponent implements OnInit {
  public orders$!: Observable<IOrder[]>;
  public customers$!: Observable<ICustomer[]>;
  public shownData!: IOrdersListResponse[];
  constructor(private cookieService: CookieService, private provider: storeProvider, private router: Router) {}
  public ngOnInit(): void {
    const token = this.cookieService.get('token');
    if (token) {
      this.shownData = [];
      this.customers$ = this.provider.getAllCustomers$();
      this.orders$ = this.provider.getAllOrders$();
      this.customers$.subscribe((customers) => {
        if (!customers.length) console.log("No customers fetched");
        else {
          this.orders$.subscribe((orders) => {
            if (!orders.length) console.log("No orders fetched");
            else {
              for (const customer of customers) {
                for (const order of orders) {
                  this.shownData.push(this.mapOrderWithCustomerData(customer, order));
                }
              }
            }
          });
        }
      });
    }
    else this.router.navigateByUrl('/login');
  }
  private mapOrderWithCustomerData(customer: ICustomer, order: IOrder): IOrdersListResponse {
    return { id: order.id, customerName: customer.name, address: order.address, totalAmount: order.totalAmount };
  }
}
