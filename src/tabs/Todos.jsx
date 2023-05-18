import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
    isEditing: false,
    currentTodo: {},
  };

  onEdit = id => {
    this.setState({
      isEditing: true,
      currentTodo: this.state.todos.find(todo => (todo.id = id)),
    });
  };

  onSubmit = value => {
    const toDo = {
      id: nanoid(),
      text: value,
    };

    this.setState(prev => ({ todos: [...prev.todos, toDo] }));
  };

  delTodo = id => {
    this.setState(prev => ({
      todos: prev.todos.filter(todo => todo.id !== id),
    }));
  };

  onUpdate = e => {
    e.preventDefault();
    if (this.state.currentTodo.text === '') {
      return alert('empty todo');
    }
    const newTodos = this.state.todos.map(
      todo =>
        (todo.id = this.state.currentTodo.id ? this.state.currentTodo : todo)
    );
    this.setState({ todos: newTodos, isEditing: false });
  };
  onCancel = () => {};
  onChange = e => {
    this.setState({
      currentTodo: { ...this.state.currentTodo, text: e.target.value },
    });
  };

  render() {
    return (
      <>
        {this.state.isEditing ? (
          <EditForm
            onUpdate={this.onUpdate}
            onCancel={this.onCancel}
            onChange={this.onChange}
            currentTodo={this.state.currentTodo}
          />
        ) : (
          <SearchForm onSubmit={this.onSubmit} />
        )}
        <Grid>
          {this.state.todos.map((todo, index) => (
            <GridItem key={todo.id}>
              <Todo
                text={todo.text}
                index={index}
                delTodo={this.delTodo}
                id={todo.id}
                onEdit={this.onEdit}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
