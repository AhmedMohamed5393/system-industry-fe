import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ILoginCustomerRequest } from '../models/interfaces/requests/ILoginCustomerRequest';
import { ICustomer } from '../models/interfaces/responses/ICustomer';
import { IOrder } from '../models/interfaces/responses/IOrder';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
@Injectable({ providedIn: 'root' })
export class Service {
  private server = `${environment.apiUrl}/api`;
  private orderModuleName = 'orders';
  private customerModuleName = 'customers';
  private readonly route = '/';
  constructor(private http: HttpClient) {}
  public getAllOrders(): Observable<IOrder[]> {
    const url = `${this.server}${this.route}${this.orderModuleName}`;
    return this.http.get<IOrder[]>(url, httpOptions);
  }
  public signin(customer: ILoginCustomerRequest): Observable<any> {
    const url = `${this.server}${this.route}login`;
    return this.http.post<any>(url, customer, httpOptions);
  }
  public getAllCustomers(): Observable<ICustomer[]> {
    const url = `${this.server}${this.route}${this.customerModuleName}`;
    return this.http.get<ICustomer[]>(url, httpOptions);
  }
}
