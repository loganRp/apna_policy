const { parentPort, workerData } = require('worker_threads');
const mongoose = require('mongoose');
const XLSX = require('xlsx');
const csv = require('csv-parser');
const fs = require('fs');
const Record = require('../models/Record');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
  const filePath = workerData.filePath;
  const ext = filePath.split('.').pop().toLowerCase();
  const data = [];

  try {
    if (ext === 'xlsx') {
      const workbook = XLSX.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      data.push(...jsonData);
    } else if (ext === 'csv') {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => data.push(row))
        .on('end', async () => {
          await Record.insertMany(data);
          parentPort.postMessage('CSV data inserted successfully.');
        });
      return;
    }

    if (data.length) {
      await Record.insertMany(data);
      parentPort.postMessage('XLSX data inserted successfully.');
    }
  } catch (err) {
    parentPort.postMessage({ error: err.message });
  }
})();
