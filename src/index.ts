import * as helpers from "./helpers";

require('dotenv').config();
const Discord = require('discord.js');
export const client = new Discord.Client();
export const guildID = "453732177058988034";
import * as commands from "./commands";
import {getApp} from "./helpers";

client.once('ready', async () => {
    console.log('Ready!');

    const registeredCommandList = await helpers.getApp(guildID).commands.get();

    console.log(registeredCommandList)

    //delete guild-level command
    //await getApp(guildID).commands('id of command goes here').delete();

    let commandList = [
        commands.ping,
        commands.embed,
        commands.ms,
        commands.mp
    ]
    //
    // for (let command of commandList) {
    //     await command.registerCommand();
    // }

    await getApp(guildID).commands.post({
        data: {
            name: "mp",
            description: "Get exact names to use in the /ms command",
            options: [
                {
                    name: "name",
                    description: "The name of a trainer.",
                    required: true,
                    type: 3
                }
            ]
        }
    });


    client.ws.on('INTERACTION_CREATE', async (interaction) => {
        let {name, options} = interaction.data;
        let command = name.toLowerCase();
        const args = {};

        if (options) {
            options.forEach(x => {
                const {name, value} = x
                args[name] = value
            })
        }

        for (const x of commandList) {
            if(x._name === command){
                await x.execute(interaction, args)
            }
        }

        // if (command == "ping") {
        //     await helpers.reply(interaction, "pong")
        // }
        // if (command == "embed") {
        //     const embed = new Discord.MessageEmbed().setTitle("Test");
        //     for (const arg in args) {
        //         embed.addField(arg, args[arg])
        //     }
        //     await helpers.reply(interaction, {embed})
        //     console.log(args)
        // }
    })
});

client.login(process.env.STAGINGTOKEN);
