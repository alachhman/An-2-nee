const Discord = require('discord.js');
import {Command} from "./Command";
import * as helpers from "./helpers";

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
)
