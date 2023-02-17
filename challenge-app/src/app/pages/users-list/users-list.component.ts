import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UserModel} from "../../types/user.model";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users$?: Observable<UserModel[]>;
  pageSize = 10;
  currentPage = 1;
  totalItems = 0;

  constructor(protected userService: UsersService) {
  }

  ngOnInit() {
    this.users$ = this.userService.usersList$;
  }

  removeItem(index: number, id: string) {
    this.userService.removeItem(id);
  }

  saveUser(user: UserModel) {
    this.userService.saveUser(user)
  }

  sortUser(sortBy: string) {
    this.userService.sortUser(sortBy)
  }

}
