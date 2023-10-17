import { Component, ViewChild } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { CreateUpdateModalComponent } from '../create-update-modal/create-update-modal.component';
import { Subscription , map , filter } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  todoList: any = [];
  filterString: string = '';
  private todoItemsSubscription: Subscription | undefined;
  @ViewChild('createAndUpdateModal')
  createUpdateModalComponent!: CreateUpdateModalComponent;

  constructor(public _TodoService: TodoService) {}

  ngOnInit() {
    this.displayItems();
  }
  // Method To Display All Items In ToDo List
  displayItems() {
    console.log(1)
    if(this.todoItemsSubscription) this.todoItemsSubscription.unsubscribe();
    this.todoItemsSubscription = this._TodoService.getTodos().pipe(
      map((todos) => {
        return todos.filter((item) =>
          item.title.toLowerCase().includes(this.filterString) || this.filterString.trim() == ''
        );
      })
    ).subscribe((todo_list_items) => {
      console.log(todo_list_items)
      this.todoList = todo_list_items;
    });
  }
  // Method To Create New Item
  createNew(): void {
    this.openCreateOrUpdateModal({
      operation: true, // for create operation
    });
  }
  // Method To Update Item Label
  updateItemLabel(title: string, id: string): void {
    this.openCreateOrUpdateModal({
      operation: false, // for update operation
      item: title,
      id: id,
    });
  }
  // Method To Open Create Or Update Modal
  openCreateOrUpdateModal(operationData: any) {
    this.createUpdateModalComponent.openModal(operationData);
  }
  // Method To Change Item Status
  changeStatus(itemId: string, status: boolean) {
    this._TodoService.updateTodo(itemId, {
      status: !status,
    });
  }
  // Method To Delete Item
  deleteItem(itemId: string){
    this._TodoService.deleteTodo(itemId);
  }
}
