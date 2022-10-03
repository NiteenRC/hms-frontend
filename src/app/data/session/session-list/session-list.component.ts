import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SessionService } from 'src/app/_services/session.service';
import { CreateSessionComponent } from '../create-session/create-session.component';

@Component({
    selector: 'app-session-list',
    templateUrl: './session-list.component.html',
    styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {
    displayedColumns: string[];
    dataSource;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog, private sessionService: SessionService) {
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
        this.sessionService.getList().subscribe(res => {
            this.dataSource = res;
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
        }, error => console.log(error));
    }

    update(data): void {
        const dialogRef = this.dialog.open(CreateSessionComponent, {
            width: '550px',
            disableClose: true,
            data: { data: data }
        });

        dialogRef.afterClosed().subscribe(() => {
            this.getList();
        });
    }

    delete(productId) {
        this.sessionService.delete(productId).subscribe(() => {
            this.getList();
        });
    }
}



