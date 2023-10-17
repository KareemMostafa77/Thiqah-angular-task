import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosCollection: AngularFirestoreCollection<Todo>;
  todos: Observable<Todo[]>;

  constructor(private readonly afs: AngularFirestore) {
    this.todosCollection = afs.collection<Todo>('todos');
    this.todos = this.todosCollection.valueChanges({ idField: 'id' });
  }

  getTodos(): Observable<Todo[]> {
    return this.todos;
  }

  addTodo(todo: Todo): void {
    this.todosCollection.add(todo);
  }

  updateTodo(id: string, changes: Partial<Todo>): void {
    this.todosCollection.doc(id).update(changes);
  }

  deleteTodo(id: string): void {
    this.todosCollection.doc(id).delete();
  }
}
