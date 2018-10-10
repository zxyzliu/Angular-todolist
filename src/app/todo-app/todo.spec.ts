import { Todo } from './todo';

describe('Todo', () => {

    it('ShouldCreateIstance', () => {
        expect(new Todo()).toBeTruthy();
    });

    it('ShouldAcceptValuesinConstructor', () => {
        const todo = new Todo({
            value: 'hello',
            done: true
        });
        expect(todo.value).toEqual('hello');
        expect(todo.done).toEqual(true);
        expect(todo.edit).toEqual(false);
    });

});