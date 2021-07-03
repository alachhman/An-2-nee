const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const map = webdriver.promise.map;
const Builder = webdriver.Builder;
const filePath = "C:\\Users\\Anthony\\WebstormProjects\\An-2-nee\\src\\Data\\";
require("chromedriver");


async function scrape(): Promise<any> {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://gamepress.gg/pokemonmasters/database/trainer-list");
    await delay(5000)

    const rows = await driver.findElements(By.css("#trainer-container > tr"));
    const trainerArray = await map(rows, async e => {
        let trainerData = await e.findElement(By.css(".trainer-cell > .trainer-title"));
        console.log("Writing " + await trainerData.getText());
        let pokemonData = await map(await e.findElements(By.css(".pokemon-cell > .trainer-pokemon-div")), async e => {
            let pokemonEntry = await e.findElement(By.css(".pokemon-title"))
            return {
                name: await pokemonEntry.getText(),
                link: (await pokemonEntry.getText() === "") ? "" : await pokemonEntry.findElement(By.css("a")).getAttribute("href")
            }
        });
        return {
            name: await trainerData.getText(),
            link: await trainerData.findElement(By.css("a")).getAttribute("href"),
            pokemon: pokemonData
        }
    })

    // console.dir(trainerArray, {depth: 10})
    driver.quit();

    await fs.writeFile(filePath + 'index.json', JSON.stringify(trainerArray), err => {
        if (err) {
            console.error(err)
            return
        }
    })
}

const delay = ms => new Promise(res => setTimeout(res, ms));

scrape();
