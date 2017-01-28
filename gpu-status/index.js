'use strict';

const os = require('os');
const clui = require('clui');
const shell = require('shelljs');
const logUpdate = require('log-update');

const Gauge = clui.Gauge;
const width = 40;

function update() {
  let str = '';
  str += queryStr('name') + '\n';

  const pDraw = query('power.draw');
  const pLimit = query('power.max_limit');
  str += ('Power Draw:     ' + Gauge(pDraw, pLimit, width, pLimit * 0.8, `${pDraw} / ${pLimit} W`)) + '\n';

  const fSpeed = query('fan.speed');
  str += ('Fan Duty Cycle: ' + Gauge(fSpeed, 100, width, 4000 * 0.8, `${fSpeed} / ${100} %`)) + '\n';

  const mUsed = query('memory.used');
  const mTotal = query('memory.total');
  str += ('Memory Usage:   ' + Gauge(mUsed, mTotal, width, mTotal * 0.8, `${mUsed} / ${mTotal} MiB`)) + '\n';

  const uMem = query('utilization.memory');
  str += ('Mem Pressure:   ' + Gauge(uMem, 100, width, 100 * 0.8, `${uMem}%`)) + '\n';

  const uGpu = query('utilization.gpu');
  str += ('GPU Pressure:   ' + Gauge(uGpu, 100, width, 100 * 0.8, `${uGpu}%`)) + '\n';

  const temp = query('temperature.gpu');
  str += ('Temperature:    ' + Gauge(temp-30, 100-30, width, 100 * 0.8-30, `${temp} degC`)) + '\n';

  return str;
}

setInterval(() => logUpdate(update()), 100);

function queryStr(param) {
  return _query(param);
}

function query(param) {
  return Number.parseInt(_query(param));
}

function _query(param) {
  return shell
    .exec(`nvidia-smi --query-gpu=${param} --format=csv,noheader,nounits`,
          {silent: true})
    .stdout
    .toString()
    .trim();
}
