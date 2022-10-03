import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemService } from 'src/app/_services/item.service';
import { CreateItemComponent } from '../create-item/create-item.component';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
    displayedColumns: string[];
    dataSource;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog, private taxService: ItemService) {
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
        this.taxService.getList().subscribe(res => {
            this.dataSource = res;
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
        }, error => console.log(error));
    }

    update(data): void {
        const dialogRef = this.dialog.open(CreateItemComponent, {
            width: '550px',
            disableClose: true,
            data: { data: data }
        });

        dialogRef.afterClosed().subscribe(() => {
            this.getList();
        });
    }

    delete(productId) {
        this.taxService.delete(productId).subscribe(() => {
            this.getList();
        });
    }
}



