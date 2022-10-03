import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderTypeService } from 'src/app/_services/order-type.service';
import { CreateOrderTypeComponent } from '../create-order-type/create-order-type.component';

@Component({
    selector: 'app-order-type-list',
    templateUrl: './order-type-list.component.html',
    styleUrls: ['./order-type-list.component.css']
})
export class OrderTypeListComponent implements OnInit {
    displayedColumns: string[];
    dataSource;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog, private orderTypeService: OrderTypeService) {
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit(): void {
        this.displayColumns();
        this.getList();
    }

    displayColumns() {
        this.displayedColumns = ['createdDate', 'code', 'name', 'status','user', 'last_updated', 'action'];
    }

    getList() {
        this.orderTypeService.getList().subscribe(res => {
            this.dataSource = res;
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
        }, error => console.log(error));
    }

    update(data): void {
        const dialogRef = this.dialog.open(CreateOrderTypeComponent, {
            width: '550px',
            disableClose: true,
            data: { data: data }
        });

        dialogRef.afterClosed().subscribe(() => {
            this.getList();
        });
    }

    delete(productId) {
        this.orderTypeService.delete(productId).subscribe(() => {
            this.getList();
        });
    }
}



