const Discord = require('discord.js');


module.exports = {
    name: "kick",
    execute(message, args, client) {
       
        var utenteKick = message.mentions.members.first();

        if (!message.member.permissions.has("KICK_MEMBERS")) {
            message.channel.send("you are not allowed");
            return;
        }

        if (!utenteKick) {
            message.channel.send("You haven't mentioned any users");
            return;
        }

        if (!message.mentions.members.first().kickable) {
            message.channel.send("I'm not a op ");
            return
        }

        utenteKick.kick()
            .then(() => message.channel.send("<@" + utenteKick + ">" + " kiccato"))

    }

}