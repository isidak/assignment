import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserModel} from "../../types/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
 @Input() user?: UserModel;
 @Output() remove = new EventEmitter();
 @Output() edit = new EventEmitter();

  removeItem(){
    this.remove.emit()
  }

  editItem(){
    this.remove.emit()
  }
}
