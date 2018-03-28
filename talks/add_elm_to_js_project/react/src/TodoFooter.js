import React, { Component } from 'react';
import * as Utils from './Utils';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './constants';
import classNames from 'classnames';

export default class TodoFooter extends Component {
  render() {
    var activeTodoWord = Utils.pluralize(this.props.count, 'item');
    var clearButton = null;

    var elmApp = (
      <div className="elm">
      </div>
    );

    var nowShowing = this.props.nowShowing;
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.count}</strong> {activeTodoWord} left
        </span>
        <ul className="filters">
          <li>
            <a
              href="#/"
              className={classNames({ selected: nowShowing === ALL_TODOS })}>
              All
            </a>
          </li>
          {' '}
          <li>
            <a
              href="#/active"
              className={classNames({ selected: nowShowing === ACTIVE_TODOS })}>
              Active
            </a>
          </li>
          {' '}
          <li>
            <a
              href="#/completed"
              className={classNames({ selected: nowShowing === COMPLETED_TODOS })}>
              Completed
            </a>
          </li>
        </ul>
        {elmApp}
      </footer>
    );
  }
}
