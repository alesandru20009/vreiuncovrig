const Discord = require('discord.js');

module.exports = {
    name: "clear",
    execute(message, args, client, prefix) {

        if(!message.member.permissions.has("MANAGE_MESSAGES")) {
            message.channel.send("you are not allowed");
            return;
        }

        var count = message.content.slice(7);
        count = parseInt(count);

        if (!count) {

            message.channel.send("insert a valid number")
            return;
        }

        message.channel.bulkDelete(count ,true)
        message.channel.send(count + " deleted messages").then(msg => {
            msg.delete({ timeout : 2000})
        })

     }

    }




