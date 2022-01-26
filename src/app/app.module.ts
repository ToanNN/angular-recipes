import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageModule } from './message/message/message.module';
import { AppReactiveFormModule } from './reactive-form/reactive-form-module/app-reactive-form.module';
import { AuthGuard } from './security/auth.guard';
import { SecurityModule } from './security/security.module';
import { ProductListComponent } from './product-rxjs/product-list/product-list.component';
import { ProductShellComponent } from './product-rxjs/product-shell/product-shell.component';
import { ProductDetailComponent } from './product-rxjs/product-detail/product-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductShellComponent,
    ProductDetailComponent
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
