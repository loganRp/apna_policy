const xlsx = require("xlsx");
const csv = require("csv-parser");
const { Readable } = require("stream");
const { MasterModel } = require("../models/MasterModel");
const { AgentModel } = require("../models/agentModel");
const { PolicyInfoModel } = require("../models/policyInfo");
const { UserModel } = require("../models/userModel");
const { PolicyCategoryModel } = require("../models/policyCategoryModel");
const { PolicyCompanyModel } = require("../models/policyCompanyModel");
const { UserAccountModel } = require("../models/userAccount");

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
        // Process the results array as needed

        // Assuming you have a mapping for agent and policy info
        // Adjust the mapping according to your CSV structure
        let addAgentToAgentTable = results.map((item) => {
          return {
            agent: item["agent"]
            // Map other fields as necessary
          };
        });

        let uniAgent = [];
        let set = new Set();
        for(let obj of addAgentToAgentTable){
          if(!set.has(obj.agent)){
            set.add(obj.agent);
            uniAgent.push({agent : obj.agent})
          }
        }
        // Assuming you have a mapping for policy info
        // Adjust the mapping according to your CSV structure
        let addPolicyInfo = results.map((item) => {
          return {
            policy_number: item["policy_number"],
            policy_type: item["policy_type"],
            policy_mode: item["policy_mode"],
            policy_start_date: item["policy_start_date"],
            policy_end_date: item["policy_end_date"],
            policyCategoryId: item["policyCategoryId"],
            policyCompanyId: item["policyCompanyId"],
            userId: item["userId"],
            hasActive_clientPolicy: item["hasActive_clientPolicy"],
            premium_amount_written: item["premium_amount_written"],
            premium_amount: item["premium_amount"],
            agentId: item["agentId"],
            producer: item["producer"],
            accountId: item["accountId"]
          };
        });


        // Assuming you have a mapping for user details
        // Adjust the mapping according to your CSV structure
        let addUserDetails = results.map((item) => {
          return {
            firstname: item["firstname"],
            dob: item["dob"],
            phone: item["phone"],
            countryCode: item["countryCode"],
            state: item["state"],
            city: item["city"],
            email: item["email"],
            zip: item["zip"],
            gender : item["gender"],
            userType: item["userType"],
            address : item["address"]
          };
        });

        // Assuming you have a mapping for category details
        // Adjust the mapping according to your CSV structure
        let addCategoryToCategoryTable = results.map((item) => {
          return {
            category_name: item["category_name"],
            description: item["description"]
          };
        });


        let addPolicyCompanyToPolicyCompanyTable = results.map((item) => {
          return {
            company_name: item["company_name"],
            csr: item["csr"]
          };
        });

        let addUserAccountToUserAccountTable = results.map((item) => {
          return {
            account_name: item["account_name"],
            account_type: item["account_type"]
          };
        }); 

        // let result = await MasterModel.insertMany(results);
        let result1 = await AgentModel.insertMany(uniAgent);
        let result2 = await PolicyInfoModel.insertMany(addPolicyInfo);
        let result3 = await UserModel.insertMany(addUserDetails);
        let result4 = await PolicyCategoryModel.insertMany(addCategoryToCategoryTable);     
        let result5 = await PolicyCompanyModel.insertMany(addPolicyCompanyToPolicyCompanyTable);
        let result6 = await UserAccountModel.insertMany(addUserAccountToUserAccountTable);

        if (!result1 || !result2 || !result3 || !result4 || !result5 || !result6) {
          throw new Error("Failed to insert data from CSV file");
        }
        return result1;
      });
  } else {
    throw new Error("Unsupported file type");
  }
};
