import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserState } from 'src/app/state/user.state';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public editedUser$: Observable<User>;
  public editedUser: User;

  constructor(private usersService: UsersService, private store: Store) { }

  ngOnInit(): void {
    this.registerEventListenerForEditUserAction();
  }

  private registerEventListenerForEditUserAction(): void {
    this.usersService.editUserAction.subscribe((user: User) => {
      this.editedUser$ = this.store.select(UserState.getUser(user.id));

      this.editedUser$.subscribe(user => this.editedUser = user);
    })
  }

}
