// const { json, download } = require("express/lib/response");
const fs = require("fs");
const csvtojson = require("csvtojson");
const https = require("https");
// const express = require("express");
// const app = express();
const axios = require("axios");
const Downloader = require("nodejs-file-downloader");
const download = require("download");

const sym = require(`${process.cwd()}/CSV/Nifty_200_Symbol/Json/nifty200symbols.json`);

// NSE TO Nifty 200 Download and convert into json
let url = "https://www1.nseindia.com/content/indices/ind_nifty200list.csv";

let downloader = new Downloader({
  url: url,
  directory: `${__dirname}/CSV/Nifty_200_Symbol/CSV/`,
  fileName: "nifty200symbols.csv",
  cloneFiles: false,
});
downloader.download();
console.log("Nifty 200 Symbol ===>Download");

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

// Download the file
(async () => {
  for (let i = 0; i < 25; i++) {
    if (i % 2 == 0) {
      url = `https://query1.finance.yahoo.com/v7/finance/download/${sym[i].Symbol}.NS?period1=${s1}&period2=${s2}&interval=1d&events=history&includeAdjustedClose=true`;
      await download(url, "./N/",);
      console.log(i + 1);
    }
  }
})();

(async () => {
  for (let i = 25; i < 50; i++) {
    if (i % 2 != 0) {
      url = `https://query1.finance.yahoo.com/v7/finance/download/${sym[i].Symbol}.NS?period1=${s1}&period2=${s2}&interval=1d&events=history&includeAdjustedClose=true`;
      await download(url, "./N/");
      console.log(i + 1);
    }
  }
})();
(async () => {
  for (let i = 50; i < 75; i++) {
    if (i % 2 != 0) {
      url = `https://query1.finance.yahoo.com/v7/finance/download/${sym[i].Symbol}.NS?period1=${s1}&period2=${s2}&interval=1d&events=history&includeAdjustedClose=true`;
      await download(url, "./N/");
      console.log(i + 1);
    }
  }
})();
(async () => {
  for (let i = 75; i < 100; i++) {
    if (i % 2 != 0) {
      url = `https://query1.finance.yahoo.com/v7/finance/download/${sym[i].Symbol}.NS?period1=${s1}&period2=${s2}&interval=1d&events=history&includeAdjustedClose=true`;
      await download(url, "./N/");
      console.log(i + 1);
    }
  }
})();
(async () => {
  for (let i = 100; i < 125; i++) {
    if (i % 2 != 0) {
      url = `https://query1.finance.yahoo.com/v7/finance/download/${sym[i].Symbol}.NS?period1=${s1}&period2=${s2}&interval=1d&events=history&includeAdjustedClose=true`;
      await download(url, "./N/");
      console.log(i + 1);
    }
  }
})();
(async () => {
  for (let i = 125; i < 150; i++) {
    if (i % 2 != 0) {
      url = `https://query1.finance.yahoo.com/v7/finance/download/${sym[i].Symbol}.NS?period1=${s1}&period2=${s2}&interval=1d&events=history&includeAdjustedClose=true`;
      await download(url, "./N/");
      console.log(i + 1);
    }
  }
})();
(async () => {
  for (let i = 150; i < 175; i++) {
    if (i % 2 != 0) {
      url = `https://query1.finance.yahoo.com/v7/finance/download/${sym[i].Symbol}.NS?period1=${s1}&period2=${s2}&interval=1d&events=history&includeAdjustedClose=true`;
      await download(url, "./N/");
      console.log(i + 1);
    }
  }
})();
(async () => {
  for (let i = 175; i < 200; i++) {
    if (i % 2 != 0) {
      url = `https://query1.finance.yahoo.com/v7/finance/download/${sym[i].Symbol}.NS?period1=${s1}&period2=${s2}&interval=1d&events=history&includeAdjustedClose=true`;
      await download(url, "./N/");
      console.log(i + 1);
    }
  }
})();





