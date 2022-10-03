import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OutletService } from 'src/app/_services/outlet.service';
import { CreateOutletComponent } from '../create-outlet/create-outlet.component';

@Component({
    selector: 'app-outlet-list',
    templateUrl: './outlet-list.component.html',
    styleUrls: ['./outlet-list.component.css']
})
export class OutletListComponent implements OnInit {
    displayedColumns: string[];
    dataSource;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog, private outletService: OutletService) {
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
        this.outletService.getList().subscribe(res => {
            this.dataSource = res;
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
        }, error => console.log(error));
    }

    update(data): void {
        const dialogRef = this.dialog.open(CreateOutletComponent, {
            width: '550px',
            disableClose: true,
            data: { data: data }
        });

        dialogRef.afterClosed().subscribe(() => {
            this.getList();
        });
    }

    delete(productId) {
        this.outletService.delete(productId).subscribe(() => {
            this.getList();
        });
    }
}



