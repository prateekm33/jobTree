import { store } from '../redux/store';
import actions from '../redux/actions';

export const initComponent = (nextState, replace, done) => {
  document.body.scrollTop = 0;
  const path = nextState.location.pathname;
  const user = store.getState().user;

  if (user) {
    if (path === '/') replace('/home');
    return done();
  }
  else {
    store.dispatch(actions.fetchingUser(true));
    fetch('/auth/validate', {
          method: 'get',
          credentials: 'include'
        })
          .then(r => r.json())
          .then(user => {
            if (!user) {
              switch (path) {
                case '/home':
                case '/profile':
                case '/manage': replace('/login');
                default: break;
              }
            }
            else {
              store.dispatch(actions.logInUser(user));
              if (path === '/') replace('/home');
            }
            done();
          })
          .catch(err => { 
            done(err)
            store.dispatch(actions.asyncError(err))
          });
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

  first() {
    return this.queue[this.start];
  }

}