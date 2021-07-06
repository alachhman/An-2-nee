const Discord = require('discord.js');
import {client} from './index';

export const getApp = (guildId) => {
    const app = client.api.applications(client.user.id);
    if (guildId) {
        app.guilds(guildId)
    }
    return app;
}
export const createAPIMessage = async (interaction, content) => {
    const {data, files} = await Discord.APIMessage.create(
        client.channels.resolve(interaction.channel_id),
        content
    ).resolveData().resolveFiles()
    return {...data, files}
}
export const reply = async (interaction, response) => {
    let data = {
        content: response
    }

    //check for embeds
    if (typeof response === 'object') {
        data = await createAPIMessage(interaction, response)
    }

    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data
        }
    })
}

