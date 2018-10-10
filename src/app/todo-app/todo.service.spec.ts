import {
  inject, TestBed
} from '@angular/core/testing';

import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('Todo Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [TodoService]
    });
  });

  describe('#getAllTodos()', () => {

    it('ReturnEmptyArray', inject([TodoService], (service: TodoService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('ReturnAllTodos', inject([TodoService], (service: TodoService) => {
      const todo1 = new Todo({ value: 'Hello 1', done: false });
      const todo2 = new Todo({ value: 'Hello 2', done: true });
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo2, todo1]);
    }));

  });

  describe('#save(todo)', () => {

    it('AssignIncrementID', inject([TodoService], (service: TodoService) => {
      const todo1 = service.addTodo(new Todo({ value: 'Hello 1', done: false }));
      const todo2 = service.addTodo(new Todo({ value: 'Hello 2', done: true }));
      expect(service.getTodoById(todo1.id)).toEqual(todo1);
      expect(service.getTodoById(todo2.id)).toEqual(todo2);
    }));

  });

  describe('#deleteTodoById(id)', () => {

    it('DeleteTodoswithID', inject([TodoService], (service: TodoService) => {
      const todo1 = service.addTodo(new Todo({ value: 'Hello 1', done: false }));
      const todo2 = service.addTodo(new Todo({ value: 'Hello 2', done: true }));
      expect(service.getAllTodos()).toEqual([todo2, todo1]);
      service.deleteTodoById(todo1.id);
      expect(service.getAllTodos()).toEqual([todo2]);
      service.deleteTodoById(todo2.id);
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('NoIDFoundNoDelete', inject([TodoService], (service: TodoService) => {
      const todo1 = service.addTodo(new Todo({ value: 'Hello 1', done: false }));
      const todo2 = service.addTodo(new Todo({ value: 'Hello 2', done: true }));
      expect(service.getAllTodos()).toEqual([todo2, todo1]);
      service.deleteTodoById(3);
      expect(service.getAllTodos()).toEqual([todo2, todo1]);
    }));

  });

  describe('#updateTodoById(id, values)', () => {

    it('ReturnUpdatedTodoswithID', inject([TodoService], (service: TodoService) => {
      const todo = service.addTodo(new Todo({ value: 'Hello 1', done: false }));
      const updatedTodo = service.updateTodoById(todo.id, {
        value: 'new value'
      });
      expect(updatedTodo.value).toEqual('new value');
    }));

    it('NoFoundReturnNull', inject([TodoService], (service: TodoService) => {
      const todo = service.addTodo(new Todo({ value: 'Hello 1', done: false }));
      const updatedTodo = service.updateTodoById(2, {
        value: 'new value'
      });
      expect(updatedTodo).toEqual(null);
    }));

  });

  describe('#toggleTodoDone(todo)', () => {

    it('ReturnUpdatedStatus', inject([TodoService], (service: TodoService) => {
      const todo = new Todo({ value: 'Hello 1', done: false });
      service.addTodo(todo);
      const updatedTodo = service.toggleTodoDone(todo);
      expect(updatedTodo.done).toEqual(true);
      service.toggleTodoDone(todo);
      expect(updatedTodo.done).toEqual(false);
    }));

  });

});