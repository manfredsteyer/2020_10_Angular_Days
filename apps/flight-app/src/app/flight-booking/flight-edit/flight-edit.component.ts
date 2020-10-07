import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Flight } from '@flight-workspace/flight-lib';
import { Observable, Observer } from 'rxjs';
import { ComponentWithExitWarning } from '../../shared/exit.guard';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit, ComponentWithExitWarning {
  id: string;
  showDetails: string;
  showWarning = false;

  flight: Flight;

  sender: Observer<boolean>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.data.subscribe(data => {
      this.flight = data['flight'];
    });

    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];
    });
  }

  decide(decision: boolean): void {
    this.showWarning = false;
    this.sender.next(decision);
    this.sender.complete();
  }

  canExit(): Observable<boolean> {
  
    this.showWarning = true;
    return new Observable<boolean>(observer => {
      this.sender = observer;
    });

  }



}
