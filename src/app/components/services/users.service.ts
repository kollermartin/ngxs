import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public editUserAction: Subject<User> = new Subject();

  constructor() { }
}
