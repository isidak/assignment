import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {UserModel} from "../types/user.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersList$: Observable<UserModel[]>;

  private usersList = new BehaviorSubject<UserModel[]>([]);

  constructor(private http: HttpClient) {
    this.usersList$ = this.usersList.asObservable()
  }

  getUsers(): Observable<any> {
    return this.http.get<UserModel[]>('https://63998da716b0fdad77409a5e.mockapi.io/api/v1/hikers').pipe(
      tap((users) => this.usersList.next(users))
    );
  }

  getUsersSnapshot() {
    return this.usersList.value;
  }

  removeItem(id: string) {
    const updatedUserList = this.getUsersSnapshot().filter((user) => user.id !== id);
    this.usersList.next(updatedUserList);

    //TODO save changes to server

  }

  saveUser(updatedUser: UserModel) {
    const userListSnapshot = [...this.getUsersSnapshot()];
    const updatedUserIndex = userListSnapshot.findIndex((user) => user.id === updatedUser.id);
    userListSnapshot.splice(updatedUserIndex, 1, updatedUser);
    this.usersList.next(userListSnapshot);

    //TODO save changes to server

  }

  sortUser(sortBy: any) {
    const userListSnapshot = [...this.getUsersSnapshot()];
    const sortedUserList = this.sortByKey(userListSnapshot, sortBy);
    this.usersList.next(sortedUserList);
  }

  private sortByKey(array: any[], key: any) {
    return array.sort(function (a, b) {
      const x = a[key];
      const y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
}
