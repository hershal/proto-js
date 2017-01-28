'use strict';

const Model = require('./model').Model;
const Gauge = require('clui').Gauge;

class ModelViewController {
  constructor(tasks) {
    this.model = new Model(tasks);
    this._string = this.updateString();

    this.model.on('done', (model) => {
      this._string = this.updateString();
    });
  }

  updateString() {
    const completed = this.model.completed;
    const tasks = this.model.tasks;
    return Gauge(completed, tasks, 40, tasks, `${completed} / ${tasks}`);
  }

  toString() {
    return this._string;
  }
}
module.exports.ModelViewController = ModelViewController;
