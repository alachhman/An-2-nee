const Discord = require('discord.js');
import {Command} from "./Command";
import * as helpers from "./helpers";

const fetch = require("node-fetch");

export const ping: Command<any, any, any> = new Command("ping", "Test Command", null, async (interaction, args) => {
    await helpers.reply(interaction, "pong")
});

export const embed: Command<any, any, any> = new Command("embed", "Displays an embed", [
        {
            name: "name",
            description: "Your Name",
            required: true,
            type: 3
        },
        {
            name: "age",
            description: "Your Age",
            type: 4
        }
    ],
    async (interaction, args) => {
        const embed = new Discord.MessageEmbed().setTitle("Test");
        for (const arg in args) {
            embed.addField(arg, args[arg])
        }
        await helpers.reply(interaction, {embed})
        console.log(args)
    }
);

export const mp: Command<any, any, any> = new Command("mp", "Get exact names to use in the /ms command", [
        {
            name: "name",
            description: "The name of a trainer.",
            required: true,
            type: 3
        }
    ],
    async (interaction, args) => {
        const trainerList = await fetch("http://localhost:3000/api/trainer?name=" + args.name).then(function (response) {
            return response.json();
        })
        let trainers = []
        trainerList.map(x => x.name).forEach(y => {
            if(!trainers.includes(y)){
                trainers.push(y)
            }
        });
        const embed = new Discord.MessageEmbed().setTitle("Results");
        embed.addField("Trying using /ms on these:", trainers.join("\n"))
        await helpers.reply(interaction, {embed})
        console.log(args)
    }
)

export const ms: Command<any, any, any> = new Command("ms", "Search for a PM trainer.", [
        {
            name: "name",
            description: "The trainer you want to look for.",
            required: true,
            type: 3
        }
    ],
    async (interaction, args) => {
        const trainerList = await fetch("http://localhost:3000/api/trainer?name=" + encodeURIComponent(args.name.toLowerCase().trim())).then(function (response) {
            return response.json();
        })
        trainerList.forEach(x => {
            console.log(x.name.toLowerCase() + " | " + args.name.toLowerCase())
        })
        let trainer = trainerList.filter(x => x.name.toLowerCase() == args.name.toLowerCase())[0]
        const embed = new Discord.MessageEmbed().setTitle(trainer.name);
        embed.setImage("https://gamepress.gg" + trainer.imageLink)
        await helpers.reply(interaction, {embed})
        console.log(args)
    }
)
