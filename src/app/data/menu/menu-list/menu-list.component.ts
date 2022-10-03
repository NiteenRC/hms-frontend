import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MenuService } from 'src/app/_services/menu.service';
import { CreateMenuComponent } from '../create-menu/create-menu.component';

@Component({
    selector: 'app-menu-list',
    templateUrl: './menu-list.component.html',
    styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
    displayedColumns: string[];
    dataSource;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog, private menuService: MenuService) {
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
        this.menuService.getList().subscribe(res => {
            this.dataSource = res;
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
        }, error => console.log(error));
    }

    update(data): void {
        const dialogRef = this.dialog.open(CreateMenuComponent, {
            width: '550px',
            disableClose: true,
            data: { data: data }
        });

        dialogRef.afterClosed().subscribe(() => {
            this.getList();
        });
    }

    delete(productId) {
        this.menuService.delete(productId).subscribe(() => {
            this.getList();
        });
    }
}



