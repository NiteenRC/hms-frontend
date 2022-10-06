import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { RegisterComponent } from './setting/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MobileMenuComponent } from './menu/mobile-menu/mobile-menu.component';
import { TableModule } from 'primeng/table';
import { ActionBarComponent } from './menu/action-bar/action-bar.component';
import { ActionBarItemComponent } from './menu/action-bar-item/action-bar-item.component';
import { DemoMaterialModule } from './material.module';
import { MatSortModule } from '@angular/material/sort';
import { DateAdapter } from '@angular/material/core';
import { UpdateBankInfoComponent } from './setting/update-bank-info/update-bank-info.component';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './setting/login/login.component';
import { NavigationBarComponent } from './menu/navigation-bar/navigation-bar.component';
import { SubscriptionComponent } from './subscription/register/subscription.component';
import { CreateTaxComponent } from './data/tax-code/create-tax/create-tax.component';
import { TaxListComponent } from './data/tax-code/tax-list/tax-list.component';
import { CreateItemComponent } from './data/item/create-item/create-item.component';
import { ItemListComponent } from './data/item/item-list/item-list.component';
import { CreateOrderTypeComponent } from './data/order-type/create-order-type/create-order-type.component';
import { OrderTypeListComponent } from './data/order-type/order-type-list/order-type-list.component';
import { CreateSessionComponent } from './data/session/create-session/create-session.component';
import { SessionListComponent } from './data/session/session-list/session-list.component';
import { CreateOutletComponent } from './data/outlet/create-outlet/create-outlet.component';
import { OutletListComponent } from './data/outlet/outlet-list/outlet-list.component';
import { CreateKitchenComponent } from './data/kitchen/create-kitchen/create-kitchen.component';
import { KitchenListComponent } from './data/kitchen/kitchen-list/kitchen-list.component';
import { CreateMenuComponent } from './data/menu/create-menu/create-menu.component';
import { MenuListComponent } from './data/menu/menu-list/menu-list.component';
import { PropertyListComponent } from './data/property/property-list/property-list.component';
import { CreatePropertyComponent } from './data/property/create-property/create-property.component';
import { CreateDesignationComponent } from './data/designation/create-designation/create-designation.component';
import { DesignationListComponent } from './data/designation/designation-list/designation-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ActionBarComponent,
    ActionBarItemComponent,
    NavigationBarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NotfoundComponent,
    MobileMenuComponent,
    UpdateBankInfoComponent,
    SubscriptionComponent,
    CreateTaxComponent,
    TaxListComponent,
    CreateItemComponent,
    ItemListComponent,
    CreateOrderTypeComponent,
    OrderTypeListComponent,
    CreateSessionComponent,
    SessionListComponent,
    CreateOutletComponent,
    OutletListComponent,
    CreateKitchenComponent,
    KitchenListComponent,
    CreateMenuComponent,
    MenuListComponent,
    CreatePropertyComponent,
    PropertyListComponent,
    CreateDesignationComponent,
    DesignationListComponent,
  ],
  imports: [
    TableModule,
    DemoMaterialModule,
    MatTableModule,
    MatSortModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    NgbModule,
    NgxPaginationModule,
    RouterModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale("en-in"); // DD/MM/YYYY
  }
}
