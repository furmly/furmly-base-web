const inherit = function(source, target) {
  target.prototype = Object.create(source.prototype);
  target.prototype.constructor = target;
  const Constructor = function() {
    const args = Array.prototype.slice.call(arguments);
    source.apply(this, args);
    target.apply(this, args);
  };
  Constructor.prototype = Object.create(target.prototype);
  Constructor.prototype.constructor = target;
  return Constructor;
};
const live_components = {};
const live_instances = {};
const message_types = {};
function Base(msg, parent) {
  this.parent = parent;
  this.id = msg.id;
}
Base.prototype.error = function(message) {
  postMessage({ error: true, message });
};
Base.prototype.message = function(msg) {
  if (!msg.type || !this[msg.type])
    return this.error("Method is unknown or does not exist");
  this[msg.type].call(this, msg.body);
};
Base.prototype.destroy = function() {
  live_instances[this.id] -= 1;
  if (!live_instances[this.id] <= 0) this.parent[this.id] = null;
};

function _Input(msg) {
  this.idleTimeout = msg.body.idleTimeout;
}
const Input = inherit(Base, _Input);

Input.prototype.init = function() {
  if (typeof live_components[this.id] === "undefined")
    live_components[this.id] = 0;
  live_instances[this.id] += 1;
};
Input.prototype.busy = function() {
  this.reset();
  this.handle = setTimeout(this.expired.bind(this), this.idleTimeout);
};

Input.prototype.expired = function() {
  postMessage({ type: "expired", id: this.id });
};

Input.prototype.reset = function() {
  if (this.handle) clearTimeout(this.handle);
};

message_types["input"] = Input;

onmessage = function({ data: msg }) {
  if (live_components[msg.id]) {
    live_components[msg.id].message(msg);
    return;
  }
  if (!msg.component || !msg.id) {
    console.log(
      "Unknown message handler. Message does not have an either an id or a component"
    );
    console.warn(msg);
    return;
  }
  live_components[msg.id] = new message_types[msg.component](
    msg,
    live_components
  );
};
