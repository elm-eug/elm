import React, { Component } from 'react';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './constants';
import TodoFooter from './TodoFooter';
import TodoItem from './TodoItem';
import hasher from 'hasher';
import Elm from 'react-elm-components';
import { Main as MyElmApp } from './MyElmApp.elm';

const ENTER_KEY = 13;

export default class App extends Component {
  state = {
    nowShowing: ALL_TODOS,
    editing: null,
    newTodo: ''
  };

  componentDidMount() {
    const handleChanges = (newHash, oldHash) => {
      switch(newHash) {
        case 'active': return this.setState({nowShowing: ACTIVE_TODOS});
        case 'completed': return this.setState({nowShowing: COMPLETED_TODOS});
        default: return this.setState({nowShowing: ALL_TODOS});
      }
    };

    hasher.changed.add(handleChanges);
    hasher.initialized.add(handleChanges);
    hasher.init();
  }

  handleChange = (event) => {
    this.setState({newTodo: event.target.value});
  }

  handleNewTodoKeyDown = (event) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = this.state.newTodo.trim();

    if (val) {
      this.props.model.addTodo(val);
      this.setState({newTodo: ''});
    }
  }

  toggleAll = (event) => {
    var checked = event.target.checked;
    this.props.model.toggleAll(checked);
  }

  toggle = (todoToToggle) => {
    this.props.model.toggle(todoToToggle);
  }

  destroy = (todo) => {
    this.props.model.destroy(todo);
  }

  edit = (todo) => {
    this.setState({editing: todo.id});
  }

  save = (todoToSave, text) => {
    this.props.model.save(todoToSave, text);
    this.setState({editing: null});
  }

  cancel = () => {
    this.setState({editing: null});
  }

  clearCompleted = () => {
    this.props.model.clearCompleted();
  }

  render() {
    var footer;
    var main;
    var todos = this.props.model.todos;

    var shownTodos = todos.filter(function (todo) {
      switch (this.state.nowShowing) {
        case ACTIVE_TODOS:
        return !todo.completed;
        case COMPLETED_TODOS:
        return todo.completed;
        default:
        return true;
      }
    }, this);

    var todoItems = shownTodos.map(function (todo) {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo)}
          onDestroy={this.destroy.bind(this, todo)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing === todo.id}
          onSave={this.save.bind(this, todo)}
          onCancel={this.cancel}
        />
      );
    }, this);

    var activeTodoCount = todos.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    var completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer =
      <TodoFooter
        count={activeTodoCount}
        completedCount={completedCount}
        nowShowing={this.state.nowShowing}
        onClearCompleted={this.clearCompleted}
      />;
    }

    if (todos.length) {
      main = (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll}
            checked={activeTodoCount === 0}
          />
          <label
            htmlFor="toggle-all"
          />
          <ul className="todo-list">
            {todoItems}
          </ul>
        </section>
      );
    }

    return (
      <div>
        <Elm src={MyElmApp}/>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.newTodo}
            onKeyDown={this.handleNewTodoKeyDown}
            onChange={this.handleChange}
            autoFocus={true}
          />
        </header>
        {main}
        {footer}
      </div>
    );
  }
}
