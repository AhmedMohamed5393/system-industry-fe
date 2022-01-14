import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { storeProvider } from "../../providers/app.provider";
import { Router } from "@angular/router";
import { IOrdersListResponse } from "src/app/models/interfaces/responses/IOrdersListResponse";
import { map, Observable } from "rxjs";
import { IOrder } from "src/app/models/interfaces/responses/IOrder";
import { ICustomer } from "src/app/models/interfaces/responses/ICustomer";
@Component({ selector: 'app-orders-list', templateUrl: './orders-list.component.html', styleUrls: ['./orders-list.component.css'] })
export class OrdersListComponent implements OnInit {
  private subscriptions: any[] = [];
  public notFoundMessage!: string;
  public shownData!: IOrdersListResponse[];
  constructor(private cookieService: CookieService, private provider: storeProvider, private router: Router) {}
  public ngOnInit(): void {
    const token = this.cookieService.get('token');
    if (token) {
      this.subscriptions.push(
        this.provider.getAllCustomers$().pipe(map((customers) => {
          if (!customers.length) this.notFoundMessage = "No data to show";
          else {
            this.subscriptions.push(
              this.provider.getAllOrders$().subscribe((orders) => {
                  if (!orders.length) this.notFoundMessage = "No data to show";
                  else this.shownData = this.mapOrderWithCustomerData(customers, orders);
              })
            );
          }
        })
      ).subscribe())
    }
    else this.router.navigateByUrl('/login');
  }
  public ngOnDestroy(): void { this.subscriptions.forEach((subscribe) => subscribe.unsubscribe()); }
  private mapOrderWithCustomerData(customers: ICustomer[], orders: IOrder[]): IOrdersListResponse[] {
    const mappedOrderListData = [] as IOrdersListResponse[];
    for (const order of orders) {
      const customer = customers.find((customer) => order.customerEmail === customer.email) as ICustomer;
      mappedOrderListData.push({ id: order.id, customerName: customer.name, address: order.address, totalAmount: order.totalAmount });
    }
    return mappedOrderListData;
  }
}
