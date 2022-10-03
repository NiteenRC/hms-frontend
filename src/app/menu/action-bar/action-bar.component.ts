import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBarComponent implements OnInit {
  private _transformer = (node: MasterNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  dataSource_Order = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  dataSourceReports = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  dataSourceBalance = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  dataSourceSummary = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  dataSourceSetting = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  role: boolean;

  constructor(private router: Router) {
    this.dataSource.data = TREE_DATA;
    this.dataSource_Order.data = Order_DATA;
    this.dataSourceReports.data = REPORTS;
    this.dataSourceSummary.data = SUMMARY;
    this.dataSourceSetting.data = SETTING;

    console.log('dataSourceReports', this.dataSourceReports);
  }
  ngOnInit(): void {
    this.role = AppComponent.role_admin || AppComponent.role_super_admin;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  expanded = true;
  selected = '';

  goTohome() {
    this.router.navigate(['dashboard']);
  }

  getComponent(item) {
    this.selected = TREE_DATA[0].name + item;
    if (item == "Tax") {
      this.router.navigate(['dashboard/tax-list']);
    }
    if (item == "Item") {
      this.router.navigate(['dashboard/item-list']);
    }
    if (item == "Order Type") {
      this.router.navigate(['dashboard/order-type-list']);
    }
    if (item == "Session") {
      this.router.navigate(['dashboard/session-list']);
    }
    if (item == "Outlet") {
      this.router.navigate(['dashboard/outlet-list']);
    }
    if (item == "Kitchen") {
      this.router.navigate(['dashboard/kitchen-list']);
    }
    if (item == "Menu") {
      this.router.navigate(['dashboard/menu-list']);
    }
  }

  getOrder(item) {
    this.selected = Order_DATA[0].name + item;
  }

  getSummary(item) {
    this.selected = SUMMARY[0].name + item;
  }

  getSetting(item) {
    this.selected = SETTING[0].name + item;
  }

  private _redirectToPage(route) {
    this.router.navigate([route]);
  }
}

interface MasterNode {
  name: string;
  children?: MasterNode[];
}

const TREE_DATA: MasterNode[] = [
  {
    name: 'DATA',
    children: [
      {
        name: 'Tax',
      }, {
        name: 'Item',
      }, {
        name: 'Order Type',
      }, {
        name: 'Session',
      }, {
        name: 'Outlet',
      }, {
        name: 'Kitchen',
      }, {
        name: 'Menu',
      }
    ]
  },
];

const Order_DATA: MasterNode[] = [
];

const REPORTS: MasterNode[] = [
];

const SUMMARY: MasterNode[] = [
];

const SETTING: MasterNode[] = [
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
