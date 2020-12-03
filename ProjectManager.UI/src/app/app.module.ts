import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLoadService } from '@app/modules/core/services';
import { ACCESS_TOKEN_KEY, AUTH_SCHEME } from '@app/shared/constants';
import { SharedModule } from '@app/shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function initializeApp(injector: Injector) {
  return (): Promise<any> => {
    const appInitService = injector.get(AppLoadService);
    return appInitService.initApp();
  };
}

export function accessTokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY) ? decodeURIComponent(
    atob(localStorage.getItem(ACCESS_TOKEN_KEY))
  ) : null;
}


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //
    NgxPermissionsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: accessTokenGetter,
        authScheme: AUTH_SCHEME,
        blacklistedRoutes: [
          new RegExp('\/assets\/.*')
        ]
      }
    }),
    //
    SharedModule.forRoot(),
    AppRoutingModule,
    NgbModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Injector],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
