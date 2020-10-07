

import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CustomPreloadingStrategy implements PreloadingStrategy {
    constructor() { }
    
    // Wird 1 x pro lazy route aufgerufen
    preload(route: Route, fn: () => Observable<any>): Observable<any> {
        
        if (route.data && route.data['preload']) {
            return fn();
        }

        return of(true);
        
        // return of(true).pipe(delay(7000), switchMap(_ => fn()));

        // return combineLatest(this.authService.user$, this.authService.permissions$).pipe(
        //    filter(([u, p]) => needsRoute(route, u, p))
        //    switchMap(_ => fn())
        //)
    }
    
}