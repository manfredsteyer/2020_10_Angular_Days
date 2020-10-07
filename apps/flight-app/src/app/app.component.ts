import {Component} from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { debounceTime, filter } from 'rxjs/operators';
import { authCodeFlowConfig } from './auth.config';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  loading = false;

  constructor(
    private oauthService: OAuthService,
    private router: Router) {


      oauthService.configure(authCodeFlowConfig);
      oauthService.loadDiscoveryDocumentAndTryLogin();

    
    this.router.events.pipe(
      filter(e =>
        e instanceof NavigationStart
        || e instanceof NavigationEnd
        || e instanceof NavigationError
        || e instanceof NavigationCancel
      ),
      debounceTime(300)
    ).subscribe(e => {

      if (e instanceof NavigationStart) {
        this.loading = true;
      }
      else {
        this.loading = false;
      }
    })

  }
}

