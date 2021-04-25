import { Component, OnInit } from '@angular/core';
import { CounterService } from './counter.service';
import { UsersService } from './users.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UsersService ]
})
export class AppComponent {
  inactiveToActive: number = 0;
  activeToInActive: number = 0;

  constructor(private usersService: UsersService,
              private counterService: CounterService) { }

  onSetToInactive(id: number) {
    this.usersService.setToInactive(id);
    this.activeToInActive = this.counterService.activeToInactiveCounter;
  }

  onSetToActive(id: number) {
    this.usersService.setToActive(id);
    this.inactiveToActive = this.counterService.inactiveToActiveCounter;

  }
}
