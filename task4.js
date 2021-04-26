const cheerio = require("cheerio");
const axios = require("axios");
const json2csv = require("json2csv").Parser;
const fs = require("fs");


baseurl = "https://scrapethissite.com/pages/ajax-javascript/?ajax=true&year="

flist = [];
const config = {
    header: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36 Edg/89.0.774.68",
        "authority": "scrapethissite.com",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9",
    }, br: true
};

async function getData(url) {

    await axios.get(url, config)
        .then((res) => {

            list = res["data"];

        })

    return list;

};

(async () => {

    data = [];

    year = ["2015", "2014", "2013"];

    for (const i of year) {
        url = baseurl + i

        let data = await getData(url)


        await flist.push(data);

        const j2cp = new json2csv();
        const csv = j2cp.parse(data);
     
        fs.appendFileSync("./Info.csv", csv, "utf-8");
    }

    console.log(flist);
   
})();


