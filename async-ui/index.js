'use strict';

const OperationQueue = require('adjustable-operation-queue').OperationQueue;
const logUpdate = require('log-update');

const ModelViewController = require('./model-view-controller').ModelViewController;

const numViewControllers = 10;
const numTasks = 100;

let viewControllers = [];

for (let i=0; i<numViewControllers; ++i) {
  viewControllers.push(new ModelViewController(numTasks));
}

setInterval(() => {
  let str = '';
  for (let i=0; i<numViewControllers; ++i) {
    str += viewControllers[i].toString() + '\n';
  }
  logUpdate(str);
}, 100);

let queue = new OperationQueue(20);

for (let i=0; i<numViewControllers; ++i) {
  viewControllers[i].model.addOperations(queue);
}

queue.start().then(() => {
  setTimeout(() => process.exit(0), 100);
});
