class Scheduler {
  constructor() {
    this.queue = [];
    this.disable = false;
  }

  add(callback, duration, skip = false) {
    if (!skip) {
      this.queue.push({ callback, duration, active: false, done: false });
    }
    if (this.disable) return;
    let curr = this.queue[0];
    if (curr && !curr.active && !curr.done) {
      this.queue[0].active = true;
      setTimeout(
        function () {
          try {
            this.queue[0].done = true;
            curr.callback();
            this.queue.shift();
            this.add(null, null, true);
          } catch (e) {}
        }.bind(this),
        curr.duration
      );
    }
  }
  pause() {
    this.disable = true;
  }
  clear() {
    this.queue = [];
  }
  continue() {
    this.disable = false;
    this.add(null, null, true);
  }
}

export default Scheduler;
