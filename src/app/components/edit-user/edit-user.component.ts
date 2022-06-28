import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EditUser } from 'src/app/actions/user.action';
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

  angForm: FormGroup;

  constructor(private usersService: UsersService, private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.registerEventListenerForEditUserAction();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      id: [{ value: '', disabled: true }, Validators.required]
    });
  }

  editUser() {
    const user = this.prepareUserEditedData();

    this.store.dispatch(new EditUser(user));
  }

  private registerEventListenerForEditUserAction(): void {
    this.usersService.editUserAction.subscribe((user: User) => {
      this.editedUser$ = this.store.select(UserState.getUser(user.id));

      this.editedUser$.subscribe(user => {
        this.editedUser = user;

        this.angForm.patchValue({
          name: user.name,
          email: user.email,
          id: user.id
        })
      });
    })
  }

  prepareUserEditedData(): User {
    let user: User = new User();

    console.log(this.angForm.get('name').value);

    user.name = this.angForm.get('name').value;
    user.email = this.angForm.get('email').value;
    user.id = this.angForm.get('id').value;

    return user;
  }

}
