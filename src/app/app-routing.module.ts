import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { RegisterComponent } from './setting/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { UpdateBankInfoComponent } from './setting/update-bank-info/update-bank-info.component';
import { LoginComponent } from './setting/login/login.component';
import { TaxListComponent } from './data/tax-code/tax-list/tax-list.component';
import { ItemListComponent } from './data/item/item-list/item-list.component';
import { OrderTypeListComponent } from './data/order-type/order-type-list/order-type-list.component';
import { SessionListComponent } from './data/session/session-list/session-list.component';
import { OutletListComponent } from './data/outlet/outlet-list/outlet-list.component';
import { KitchenListComponent } from './data/kitchen/kitchen-list/kitchen-list.component';
import { MenuListComponent } from './data/menu/menu-list/menu-list.component';
import { PropertyListComponent } from './data/property/property-list/property-list.component';
import { DesignationListComponent } from './data/designation/designation-list/designation-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent },
  { path: '404', component: NotfoundComponent },

  {
    path: 'dashboard', pathMatch: 'prefix', canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'updateBankDetails', component: UpdateBankInfoComponent },
      { path: 'tax-list', component: TaxListComponent },
      { path: 'item-list', component: ItemListComponent },
      { path: 'order-type-list', component: OrderTypeListComponent },
      { path: 'session-list', component: SessionListComponent },
      { path: 'outlet-list', component: OutletListComponent },
      { path: 'kitchen-list', component: KitchenListComponent },
      { path: 'menu-list', component: MenuListComponent },
      { path: 'property-list', component: PropertyListComponent },
      { path: 'designation-list', component: DesignationListComponent },
    ]
  },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
