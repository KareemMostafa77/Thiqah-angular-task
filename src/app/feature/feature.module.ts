import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateUpdateModalComponent } from './todo/components/create-update-modal/create-update-modal.component';
import { TodoListComponent } from './todo/components/todo-list/todo-list.component';


@NgModule({
  declarations: [
    CreateUpdateModalComponent,
    TodoListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    CreateUpdateModalComponent,
    TodoListComponent
  ]
})
export class FeatureModule {}
