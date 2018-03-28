import React, { Component } from 'react';
import * as Utils from './Utils';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './constants';
import classNames from 'classnames';
import Elm from 'react-elm-components';
import { Main as MyElmApp } from './MyElmApp.elm';

function setupPorts(ports) {
  subscribe = ports.outgoing.subscribe;
  send = ports.incoming.send;
};

let send = function () {};
let subscribe = function (data) {
  console.log("Got:", data);
};

export default class TodoFooter extends Component {
  render() {
    var activeTodoWord = Utils.pluralize(this.props.count, 'item');

    var nowShowing = this.props.nowShowing;
    const flags = 42;
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
        <Elm src={MyElmApp} flags={flags} ports={setupPorts} />
      </footer>
    );
  }
}
