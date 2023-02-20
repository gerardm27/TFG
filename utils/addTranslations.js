const { GoogleSpreadsheet } = require("google-spreadsheet");
const secret = require("./secret.json");
const fs = require("fs");

// Initialize the sheet
const doc = new GoogleSpreadsheet("1XkYqHP_a2xy3Oziu02LnHmGT1fkR8qnCGSPAD9N-TxA");

const init = async () => {
  await doc.useServiceAccountAuth({
    client_email: secret.client_email,
    private_key: secret.private_key,
  });
};

const read = async () => {
    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByTitle.Hoja1; //get the sheet by title.
    await sheet.loadHeaderRow(); //Loads the header row (first row) of the sheet
    const colTitles = sheet.headerValues; //array of strings from cell values in the first row
    const rows = await sheet.getRows({ limit: sheet.rowCount }); //fetch rows from the sheet (limited to row count)
  
    let result = {};
    //map rows values and create an object with keys as columns titles starting from the second column (languages names) and values as an object with key value pairs, where the key is a key of translation, and value is a translation in a respective language
    rows.map((row) => {
      colTitles.slice(1).forEach((title) => {
        result[title] = result[title] || [];
        const key = row[colTitles[0]];
        result = {
          ...result,
          [title]: {
            ...result[title],
            [key]: row[title] !== "" ? row[title] : undefined,
          },
        };
      });
    });
    return result;
  };


const write = (data) => {
    Object.keys(data).forEach((key) => {
        fs.writeFile(
        `../src/i18n/${key}.json`,
        JSON.stringify(data[key], null, 2),
        (err) => {
            if (err) {
            console.error(err);
            }
        }
        );
    });
};

init()
.then(() => read())
.then((data) => write(data))
.catch((err) => console.log("There was an error while translating", err));