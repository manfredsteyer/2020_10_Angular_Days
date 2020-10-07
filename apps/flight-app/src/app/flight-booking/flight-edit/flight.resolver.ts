
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Flight, FlightService } from '@flight-workspace/flight-lib';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FlightResolver implements Resolve<Flight> {
    
    constructor(private flightService: FlightService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Flight> {
        return this.flightService.findById(route.params['id']).pipe(delay(7000));
    }
}