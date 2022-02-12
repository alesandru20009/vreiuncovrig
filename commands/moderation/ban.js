const Discord = require('discord.js');


module.exports = {
    name: "ban",
    execute(message, args, client) {
       
        var utenteBan = message.mentions.members.first();

        if (!message.member.permissions.has("BAN_MEMBERS")) {
            message.channel.send('you are not allowed');
            return;
        }

        if (!utenteBan) {
            message.channel.send("You haven't mentioned any users");
            return;
        }

        if (!utenteBan.kickable) {
            message.channel.send("you are not allowed");
            return
        }

        utenteBan.ban()
            .then(() => message.channel.send("<@" + utenteBan + ">" + "has banned"))

    }

}