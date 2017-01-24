export const initComponent = () => {
  document.body.scrollTop = 0;
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