// @ts-ignore
const index = require("../Data/index.json");
// @ts-ignore
const fs = require('fs')
const finalPath = "C:\\Users\\Anthony\\WebstormProjects\\An-2-nee\\src\\Data\\UsableData\\";
const pokemonFilePath = "C:\\Users\\Anthony\\WebstormProjects\\An-2-nee\\src\\Data\\Pokemon\\";
const trainerFilePath = "C:\\Users\\Anthony\\WebstormProjects\\An-2-nee\\src\\Data\\Trainer\\";

let readFileStore = async (resourcePath) => {
    let files = fs.readdirSync(resourcePath).filter(file => file.endsWith('.json'));
    let returnArr = [];
    for (let file of files) {
        let rawData = await fs.readFileSync(resourcePath + file);
        returnArr.push(await JSON.parse(rawData));
    }
    return returnArr;
}

const generateFiles = async () => {
    let trainerFiles = await readFileStore(trainerFilePath);
    let pokemonFiles = await readFileStore(pokemonFilePath)
    let trainerToPokemonMap = [];
    for (let data of trainerFiles) {
        trainerToPokemonMap.push(
            await data.pokemon_list.map(x => {
                let pair = x.name.split(" & ");
                return {
                    trainer: data.name,
                    pokemon: pair[1],
                }
            }).filter(y => {
                return y.pokemon !== undefined
            })
        );
    }
    trainerToPokemonMap.filter(x => x.length > 0).forEach(x => {
        let trainer = trainerFiles.find(y => y.name === x[0].trainer)
        let pokemonList = [];
        trainer.pokemon_list.forEach(y => {
            let pokemon = pokemonFiles.find(z => z.name === y.name.split(" & ")[1] && x[0].trainer === z.trainer)
            pokemonList.push(pokemon);
        })
        trainer.pokemon_list = pokemonList;
        fs.writeFile(finalPath + trainer.name + ".json", JSON.stringify(trainer), err => {
            if (err) {
                console.error(err)
                return
            }
        })
        console.log(trainer.name + " has been written");
    })
}

generateFiles();
