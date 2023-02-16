import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  constructor(private userService: UsersService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    const userSubscription = this.userService.getUsers().subscribe();
    this.subscriptions.add(userSubscription)
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
