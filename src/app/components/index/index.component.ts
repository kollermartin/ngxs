import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserState } from 'src/app/state/user.state';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public users: Observable<User[]>;

  constructor(private store: Store) {
    this.users = this.store.select(UserState.getUsers);
  }

  ngOnInit(): void {
  }

}
