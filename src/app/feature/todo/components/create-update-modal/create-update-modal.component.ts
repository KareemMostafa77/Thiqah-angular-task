import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-create-update-modal',
  templateUrl: './create-update-modal.component.html',
  styleUrls: ['./create-update-modal.component.scss'],
})
export class CreateUpdateModalComponent {
  displayModal: boolean = false;
  modalOperation: Boolean = true; // true -> create & false -> update
  itemLabel: string = '';
  itemId: string = '';

  constructor(public _TodoService: TodoService) {}

  // Method To Show Modal
  openModal(operationData: any): void {
    this.modalOperation = operationData.operation;
    this.itemLabel = !operationData.operation ? operationData.item : '';
    this.itemId = !operationData.operation ? operationData.id : '';
    this.displayModal = !this.displayModal;
  }
  // Method To Close Modal
  close(): void {
    this.displayModal = !this.displayModal;
  }
  // Method To Save Changes
  async save() {
    if(!this.itemLabel.trim()){
      this.itemLabel = '';
      return;
    }
    if (this.modalOperation) {
      await this._TodoService.addTodo({
        title: this.itemLabel,
        status: false,
      });
    } else {
      await this._TodoService.updateTodo(this.itemId,{
        title: this.itemLabel
      });
    }
    this.close();
  }
}
