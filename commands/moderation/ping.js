const Discord = require('discord.js');


module.exports = {
    name: "ping",
    execute(message, args, client) {
        message.channel.send("finding the bot ping...").then(message => {
        const ping = Date.now() - message.createdTimestamp;
         message.channel.send(`The ping of the bot is ${ping}ms!`)
        })
    }
}