import { store } from '../redux/store';
import actions from '../redux/actions';

export const initComponent = (nextState, replace, done) => {
  document.body.scrollTop = 0;
  const path = nextState.location.pathname;
  const user = store.getState().user;
  switch (path) {
    case '/home':
    case '/profile':
    case '/manage':
      if (!user) {
        store.dispatch(actions.requestedPath(path));
        return fetch('/auth/validate', {
          method: 'get',
          credentials: 'include'
        })
          .then(r => r.json())
          .then(user => {
            if (!user) replace('/login');
            else store.dispatch(actions.logInUser(user));
            done();
          })
          .catch(err => { store.dispatch(actions.asyncError(err))});
      }
    default: done();
  }
}

export class Queue {
  constructor() {
    this.queue = {};
    this.start = 0;
    this.end = 0;
    this.length = this.end - this.start;
  }

  enqueue(val) {
    this.queue[this.end] = val;
    this.length++;
    this.end++;
  }

  dequeue() {
    const first = this.queue[this.start];
    if (!first) return null;
    this.length--;
    delete this.queue[this.start];
    this.start++;
    return first;
  }

  size() {
    return this.end - this.start;
  }

}