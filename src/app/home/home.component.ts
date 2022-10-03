import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    productsCount: number;
    customersCount: number;
    suppliersCount: number;
    purchaseOrdersCount: number;
    salesOrdersCount: number;
    totalCustomerBalance: number;
    totalSupplierBalance: number;

    constructor() {
    }

    ngOnInit(): void {
    }
}
