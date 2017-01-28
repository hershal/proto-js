'use strict';

const EventEmitter = require('events');

const Operation = require('adjustable-operation-queue').Operation;

class Model extends EventEmitter {
  constructor(tasks) {
    super();
    this.tasks = tasks;
    this.completed = 0;
  }

  addOperations(queue) {
    for (let i=0; i<this.tasks; ++i) {
      queue.addOperation(new Operation((done) => {
        setTimeout(() => {
          this.completed++;
          this.emit('done', this);
          done();
        }, Math.random()*1000);
      }));
    }
  }
}
module.exports.Model = Model;
