import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {UserModel} from "../types/user.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersList$: Observable<UserModel[]>;

  private usersList = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    // this.usersList$ = this.usersList.asObservable()
    this.usersList$ = this.getUsers();
  }

  getUsers(): Observable<any> {
      return this.http.get<UserModel[]>('https://63998da716b0fdad77409a5e.mockapi.io/api/v1/hikers').pipe(
        tap((users) => this.usersList.next(users))
      );
    }

    removeItem(id: string){
      //TODO write delete functionality

    }
}
