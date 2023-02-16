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

    removeItem(id: string){
     const updatedUserList =  this.getUsersSnapshot().filter((user) => user.id !== id);
     this.usersList.next(updatedUserList);

      //TODO save changes to server

    }

   editItem(){
      //TODO write edit functionality

    }
}
