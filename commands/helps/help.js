const Discord = require('discord.js');

module.exports = {
    name: "help",
    execute(message, args) {
        var embed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name}'Commands`)
        .addField("!clear => clear a number of messages")
        .addField("!help => list of all commands")
        .addField("!ban => ban a user in the server")
        .addField("!kick => kick a user in the server")
        .addField("!ping => calculate the ping of the bot")
        .addField("!serverinfo => all server statistics")
        .setTimestamp()

    message.channel.send({ embeds: [embed] })
    }
}