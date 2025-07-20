const xlsx = require("xlsx");
const csv = require("csv-parser");
// const PolicyCategoryModel = require('../models/policyCategoryModel');
const { Readable } = require("stream");
const { MasterModel } = require("../models/MasterModel");

exports.uploadFile = async (data) => {
  const buffer = data.buffer;
  const fileName = data.originalname;

  if (fileName.endsWith(".xlsx")) {
    const workbook = xlsx.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    let result = await MasterModel.insertMany(jsonData);
    if (!result) {
      throw new Error("Failed to insert data from XLSX file");
    }
    return result;
  } else if (fileName.endsWith(".csv")) {
    const results = [];
    const stream = Readable.from(buffer.toString());

    stream
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        let result = await MasterModel.insertMany(results);
        if (!result) {
          throw new Error("Failed to insert data from CSV file");
        }
        return result;
      });
  } else {
    throw new Error("Unsupported file type");
  }
};
