const trainerPath = "C:\\Users\\Anthony\\WebstormProjects\\An-2-nee\\src\\Data\\Trainer\\";
// @ts-ignore
const cheerio = require("cheerio");
// @ts-ignore
const axios = require("axios");
// @ts-ignore
const index = require("../Data/index.json");
// @ts-ignore
const fs = require('fs')

const getTrainerData = async () => {
    await index.map(async function (trainer) {
        const trainerUri = await axios.get(trainer.link);
        let $ = cheerio.load(trainerUri.data);

        const description = $('.trainer-description > p').text();

        const recruitMethod = $('#sync-pair-table > tbody > tr:nth-child(3) > td').text();

        const otherForms = $('.other-versions-cell').text().split('\n').filter(x => x != "");

        const image = $('.trainer-top-image > a > img').attr("src")

        const iconLinks = []

        const stampLinks = [];

        $('.trainer-images-cell > .image-cells-stamp').each(function () {
            const link = $(this)
                .find('a')
                .attr("href")
            stampLinks.push(link);
        })

        $('.trainer-images-cell > .image-cells-icon').each(function () {
            const link = $(this)
                .find('a')
                .attr("href")
            iconLinks.push(link);
        })

        const object = {
            name: trainer.name,
            info: description,
            recruit_method: recruitMethod,
            otherForms: otherForms,
            imageLink: image,
            iconLinks: iconLinks,
            stampLinks: stampLinks,
            pokemon_list: trainer.pokemon
        };

        await fs.writeFile(trainerPath + trainer.name + ".json", JSON.stringify(object), err => {
            if (err) {
                console.error(err)
                return
            }
        })
        console.log(object.name + " has been written");
    });
};

getTrainerData();
