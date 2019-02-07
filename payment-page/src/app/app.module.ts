import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { PayToComponent } from './pay-to/pay-to.component';
import { GetPaymentComponent } from './get-payment/get-payment.component';
import { PayFromAnyComponent } from './pay-to/pay-from-any/pay-from-any.component';
import { PayFromMyComponent } from './pay-to/pay-from-my/pay-from-my.component';
import { FooterComponent } from './footer/footer.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LargeContentComponent } from './large-content/large-content.component';
import { NavbarMainComponent } from './navbar-main/navbar-main.component';
import { NavbarHidComponent } from './navbar-hid/navbar-hid.component'
import { Routes, RouterModule } from '@angular/router';
import { ServerService } from './server.service';
import { InAuthAdminComponent } from './admin-panel/in-auth-admin/in-auth-admin.component';

const appRoutes: Routes = [
  {path: 'pay-to', component: PayToComponent},
  {path: 'pay-from-my', component: PayFromMyComponent},
  {path: 'pay-from-any', component: PayFromAnyComponent},
  {path: 'get-payment', component: GetPaymentComponent},
  {path: 'admin', component: AdminPanelComponent},
  {path: 'admin/admin-ok-auth', component: InAuthAdminComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    PayToComponent,
    GetPaymentComponent,
    PayFromAnyComponent,
    PayFromMyComponent,
    FooterComponent,
    AdminPanelComponent,
    LargeContentComponent,
    NavbarMainComponent,
    NavbarHidComponent,
    InAuthAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
