import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserModel} from "../../types/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import * as moment from 'moment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input() user?: UserModel;
  @Output() remove = new EventEmitter();
  @Output() saveUser = new EventEmitter();
  editableForm = true;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe) {
    this.userForm = this.createForm();
  }

  removeItem() {
    this.remove.emit()
  }

  editItem() {
    this.patchFormWithUserData();
    this.editableForm = !this.editableForm;
  }

  saveItem() {
    if(this.userForm.valid) {
      const updatedUser = this.userForm.value;
      updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth, 'dd/MM/yyyy').toISOString();
      this.saveUser.emit(updatedUser);
      this.editableForm = !this.editableForm;
    }

  }

  cancelEdit() {
    this.editableForm = !this.editableForm;
    this.patchFormWithUserData();
  }

  private createForm() {
    return this.fb.group({
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      avatar: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      id: ['', Validators.required],
    })
  }

  private patchFormWithUserData() {
    this.userForm.patchValue({
      ...this.user,
      dateOfBirth: this.datePipe.transform(this.user?.dateOfBirth, 'dd/MM/yyyy')
    })
  }
}
