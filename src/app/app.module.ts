import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageModule } from './message/message/message.module';
import { ProductDataInMemoryDbService } from './products/product-data';
import { AppReactiveFormModule } from './reactive-form/reactive-form-module/app-reactive-form.module';
import { AuthGuard } from './security/auth.guard';
import { SecurityModule } from './security/security.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppReactiveFormModule,
    MessageModule,
    SecurityModule,
    RouterModule.forRoot([
      {
        path: 'products',
        canActivate: [AuthGuard],
        data: { preload: false },
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      }
    ], { preloadingStrategy: PreloadAllModules }),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
