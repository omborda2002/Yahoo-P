// const { json, download } = require("express/lib/response");
const fs = require("fs");
const csvtojson = require("csvtojson");
const https = require("https");
const axios = require("axios");
const Downloader = require("nodejs-file-downloader");
const download = require("download");
const { json } = require("body-parser");
const { addAbortSignal } = require("stream");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
const router = express.Router();
// app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// variable section
const res = require("express/lib/response");
const { name } = require("ejs");
const { count } = require("console");

const sym = require(`${process.cwd()}/CSV/Nifty_200_Symbol/Json/nifty200symbols.json`);
let data = [];
let symbols_name = [];
for (let i = 0; i < 200; i++) {
  symbols_name.push(sym[i].Symbol);
}
for (let i = 0; i < 200; i++) {
  data.push(require(`${process.cwd()}/JSON/${sym[i].Symbol}.json`));
  // console.log(data[i][i])
}

//HERE COMMENT OUT:

// NSE TO Nifty 200 Download and convert into json
let url = "https://www1.nseindia.com/content/indices/ind_nifty200list.csv";

let downloader = new Downloader({
  url: url,
  directory: `${__dirname}/CSV/Nifty_200_Symbol/CSV/`,
  fileName: "nifty200symbols.csv",
  cloneFiles: false,
});
downloader.download();
// console.log("Nifty 200 Symbol ===>Download");

let csvfilepath = `${process.cwd()}/CSV/Nifty_200_Symbol/CSV/nifty200symbols.csv`;
csvtojson()
  .fromFile(csvfilepath)
  .then((json) => {
    fs.writeFileSync(
      `${process.cwd()}/CSV/Nifty_200_Symbol/Json/nifty200symbols.json`,
      JSON.stringify(json),
      "utf-8",
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });

// Nifty 200 Data download ::
// DATE
let d = new Date();
let year = d.getFullYear();
let month = d.getMonth();
let day = d.getDate();
let oldYear = year - 2;

let s1 = Math.round(new Date(oldYear, month, day).getTime() / 1000).toString();
let s2 = Math.round(new Date(year, month, day).getTime() / 1000).toString();

//TODO: Download the file
(async () => {
  for (let i = 0; i < 25; i++) {
    url = `https://query1.finance.yahoo.com/v7/finance/download/${sym[i].Symbol}.NS?period1=${s1}&period2=${s2}&interval=1d&events=history&includeAdjustedClose=true`;
    await download(url, "./N/");
    console.log(i + 1);
  }
})();

(async () => {
  for (let i = 25; i < 50; i++) {
    url = `https://query1.finance.yahoo.com/v7/finance/download/${sym[i].Symbol}.NS?period1=${s1}&period2=${s2}&interval=1d&events=history&includeAdjustedClose=true`;
    await download(url, "./N/");
    console.log(i + 1);
  }
})();
(async () => {
  for (let i = 50; i < 75; i++) {
    url = `https://query1.finance.yahoo.com/v7/finance/download/${sym[i].Symbol}.NS?period1=${s1}&period2=${s2}&interval=1d&events=history&includeAdjustedClose=true`;
    await download(url, "./N/");
    console.log(i + 1);
  }
})();
(async () => {
  for (let i = 75; i < 100; i++) {
    url = `https://query1.finance.yahoo.com/v7/finance/download/${sym[i].Symbol}.NS?period1=${s1}&period2=${s2}&interval=1d&events=history&includeAdjustedClose=true`;
    await download(url, "./N/");
    console.log(i + 1);
  }
})();
(async () => {
  for (let i = 100; i < 125; i++) {
    url = `https://query1.finance.yahoo.com/v7/finance/download/${sym[i].Symbol}.NS?period1=${s1}&period2=${s2}&interval=1d&events=history&includeAdjustedClose=true`;
    await download(url, "./N/");
    console.log(i + 1);
  }
})();
(async () => {
  for (let i = 125; i < 150; i++) {
    url = `https://query1.finance.yahoo.com/v7/finance/download/${sym[i].Symbol}.NS?period1=${s1}&period2=${s2}&interval=1d&events=history&includeAdjustedClose=true`;
    await download(url, "./N/");
    console.log(i + 1);
  }
})();
(async () => {
  for (let i = 150; i < 175; i++) {
    url = `https://query1.finance.yahoo.com/v7/finance/download/${sym[i].Symbol}.NS?period1=${s1}&period2=${s2}&interval=1d&events=history&includeAdjustedClose=true`;
    await download(url, "./N/");
    console.log(i + 1);
  }
})();
(async () => {
  for (let i = 175; i < 200; i++) {
    url = `https://query1.finance.yahoo.com/v7/finance/download/${sym[i].Symbol}.NS?period1=${s1}&period2=${s2}&interval=1d&events=history&includeAdjustedClose=true`;
    await download(url, "./N/");
    console.log(i + 1);
  }
})();

//TODO: JSON PARSER
setTimeout(async () => {
  for (let i = 0; i < sym.length; i++) {
    csvfilepath = `N/${sym[i].Symbol}.NS.csv`;
    try {
      const users = await csvtojson().fromFile(csvfilepath);
      // Write JSON array to a file
      fs.writeFile(
        `${process.cwd()}/JSON/${sym[i].Symbol}.json`,
        JSON.stringify(users, null, 4),
        (err) => {
          if (err) {
            throw err;
          }
          console.log("JSON array is saved.");
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
}, 25000);

app.get("/", (req, res) => {
  res.render("home", { data, symbols_name });
});

app.get("/symbol/:name", (req, res) => {
  const { name } = req.params;

  let file = require(`${process.cwd()}/JSON/${name}.json`);
  // for (let i = file.length - 1; i >= 0; i--) {
  //   console.log(file[0]);
  // }

  // for (let i = file.length - 1; i >= 0; i--) {
  //   console.log(file[i].Close);

  // }
  let main1 = [];
  let main2 = [];
  let main3 = [];
  let main4 = [];

  function sma5() {
    let avg = 5;
    let value;
    let sum = 0;
    main1 = [];
    for (let i = file.length - 1; i > 0; i--) {
      if (i > avg - 2) {
        for (let j = i; j > i - 5; j--) {
          sum += parseFloat(file[j].Close);
        }
        value = sum / avg;
        main1.push(value);
        sum = value = 0;
      }
    }
  }
  sma5();
  function sma20() {
    let avg = 20;
    let value;
    let sum = 0;
    main2 = [];
    for (let i = file.length - 1; i > 0; i--) {
      if (i > avg - 2) {
        for (let j = i; j > i - 20; j--) {
          sum += parseFloat(file[j].Close);
        }
        value = sum / avg;
        main2.push(value);
        sum = value = 0;
      }
    }
  }
  sma20();
  function sma45() {
    let avg = 45;
    let value;
    let sum = 0;
    main3 = [];
    for (let i = file.length - 1; i > 0; i--) {
      if (i > avg - 2) {
        for (let j = i; j > i - 45; j--) {
          sum += parseFloat(file[j].Close);
        }
        value = sum / avg;
        main3.push(value);
        sum = value = 0;
      }
    }
  }
  sma45();
  function sma65() {
    let avg = 65;
    let value;
    let sum = 0;
    main4 = [];

    for (let i = file.length - 1; i > 0; i--) {
      if (i > avg - 2) {
        for (let j = i; j > i - 65; j--) {
          sum += parseFloat(file[j].Close);
        }
        value = sum / avg;
        main4.push(value);
        sum = value = 0;
      }
    }
  }
  sma65();

  //Golden and Death:
  let golden = [];
  function golden_death() {
    let co = 0;
    let mLen = main3.length - 1;
    let p, go;

    for (let i = mLen; i >= 0; i--) {
      if (main2[i] > main3[i]) {
        if (co == 0) {
          go = {
            No: i,
            bool: "Golden",
          };
          golden.push(go);
          p = true;
          co++;
        }

        if (p == true) {
        } else {
          go = {
            No: i,
            bool: "Golden",
          };
          golden.push(go);
          p = true;
        }
      } else {
        if (co == 0) {
          go = {
            No: i,
            bool: "Dead",
          };
          golden.push(go);
          p = false;
          co++;
        }
        if (p == false) {
        } else {
          go = {
            No: i,
            bool: "Dead",
          };
          golden.push(go);
          p = false;
        }
      }
    }
  }
  golden_death();

  res.render("inner", { file, name, main1, main2, main3, main4, golden });
});

app.listen(3000, () => {
  console.log("RUN AT http://localhost:3000/");
});
