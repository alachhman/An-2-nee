import * as helpers from "./helpers";
require('dotenv').config();
const Discord = require('discord.js');
export const client = new Discord.Client();
export const guildID = "453732177058988034";

client.once('ready', async () => {
    console.log('Ready!');

    const commands = await helpers.getApp(guildID).commands.get();

    //delete guild-level command
    //await getApp(guildID).commands('id of command goes here').delete();

    await helpers.getApp(guildID).commands.post({
        data: {
            name: "ping",
            description: "Test Command",
        }
    })

    await helpers.getApp(guildID).commands.post({
        data: {
            name: 'embed',
            description: "Displays an embed",
            options: [
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
            ]
        }
    })

    client.ws.on('INTERACTION_CREATE', async (interaction) => {
        let {name, options} = interaction.data;
        let command = name.toLowerCase();
        const args = {};

        if(options){
            options.forEach(x => {
                const {name, value} = x
                args[name] = value
            })
        }

        if (command == "ping") {
            await helpers.reply(interaction, "pong")
        }
        if (command == "embed") {
            const embed = new Discord.MessageEmbed().setTitle("Test");
            for(const arg in args) {
                embed.addField(arg, args[arg])
            }
            await helpers.reply(interaction, {embed})
            console.log(args)
        }
    })
});

client.login(process.env.STAGINGTOKEN);
