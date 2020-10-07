
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({providedIn: 'root'})
export class AuthService {
    
    // userName: string = null;
    
    get userName() {
        const claims = this.oauthService.getIdentityClaims();

        if (!claims) return null;
        return claims['given_name'];
        //                 ^----- ODIC (auch last_name)
    }

    constructor(private oauthService: OAuthService) { }
 
    login() {
        this.oauthService.initCodeFlow();
    }

    logout() {
        this.oauthService.logOut();
    }


}