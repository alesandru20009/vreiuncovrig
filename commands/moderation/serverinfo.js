const Discord = require('discord.js');

module.exports = {
    name: "serverinfo",
    execute(message, args) {
        var embed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name}'s Info`)
        .addField("Server Name:", `${message.guild.name}`)
        .addField("Server Members", `${message.guild.memberCount}`)
        .addField("Server Security:", `${message.guild.verificationLevel}`)
        .addField("Channels:", `${message.guild.channels.cache.size}`)
        .addField("Roles:", `${message.guild.roles.cache.size}, Highest Roles: ${message.guild.roles.highest}`)
        .addField("AFK Channel:", `${message.guild.afkChannel}`)
        .addField("AFK Timeout:", `${message.guild.emojis.cache.size}`)
        .addField("Animated Emojis", `${message.guild.emojis.cache.filter(emoji => emoji.animated).size}`)
        .setTimestamp()

    message.channel.send({ embeds: [embed] })
    }
}