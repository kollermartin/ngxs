import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddUser } from 'src/app/actions/user.action';
import { GenerateRandomString } from 'src/app/tools/generate-random-string';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  angForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store
    ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['', Validators.required ]
   });
  }

  addUser(name: string, email: string) {
    this.store.dispatch(new AddUser({name: name, email: email, id: GenerateRandomString.guidGenerator()}));
  }

  ngOnInit() {
  }

}