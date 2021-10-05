import { toast } from "react-toastify";

class Informer {
  constructor() {
    this.queueLimit = 5;
    this.queue = [];
  }

  /*
   * Method to show a message from queue.
   * Not used publicly.
   */
  show(type, message, duration, pos, callback) {
    setTimeout(
      function () {
        callback.bind(this)();
      }.bind(this),
      duration
    );
    if (type === "valid") {
      toast.success(message, {
        position: pos,
        autoClose: duration,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else if (type === "warning") {
      toast.warn(message, {
        position: pos,
        autoClose: duration,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else if (type === "error") {
      toast.error(message, {
        position: pos,
        autoClose: duration,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  }

  /*
   * Only method to be used in public. This queues a message that appears as long as given
   * duration. Type value is [valid|warning|error].
   */
  queueMessage(
    type = "empty",
    message = "",
    duration = 1500,
    pos = "bottom-center"
  ) {
    if (type !== "empty" && this.queue.length + 1 <= this.queueLimit) {
      this.queue.push({
        type,
        message,
        duration,
        pos,
        active: false,
        done: false,
      });
    }

    let current = this.queue[0];
    if (current && !current.active && !current.done) {
      this.queue[0].active = true;
      this.show(
        current.type,
        current.message,
        current.duration,
        current.pos,
        function () {
          this.queue[0].done = true;
          this.queue.shift();
          this.queueMessage();
        }
      );
    }
  }
}

export default Informer;
