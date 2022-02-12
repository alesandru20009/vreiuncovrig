const Discord = require("discord.js")
global.client = new Discord.Client(
    { intents: 32767 }
);

const prefix = "!";

//connect to DioAnubiBot
client.login("ODMxMTAwNTY2OTE4NzkxMTkw.YHQUuA.RpMlbM7hA2PiyGSteeO4lvk3Pj8")

//show in the console if the bot is online
client.on("ready" , () => {

    console.log("BOT ONLINE!");

})

client.on("ready", () => {

    client.user.setActivity('!serverinfo | v1.0' , {type: "PLAYING"});
})

const fs = require("fs");

client.commands = new Discord.Collection();

const commandsFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandsFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const commandsFolder = fs.readdirSync("./commands");
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.on("message", message => {
    

    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) return

    var comando = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

    if (comando.onlyStaff) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("Non hai il permesso di eseguire questo comando")
            return
        }
    }

    comando.execute(message, args);
})

client.on("messageCreate" , (message) => {
    var words = ["dioporco" , "merda", "DIOPORCO" , "MERDA" ,"CAZZO" ,"STRONZO" , "stronzo", "madonnaputtana" , "madonna puttana", "MADONNA PUTTANA" , "coaie" , "COAIE" , "COGLIONE", "coglione"]
    var found = false;

    words.forEach(word => {
        if(message.content.includes(word)) {
            found = true;
        }
    })

    if (found) {
        message.delete();
        var embed = new Discord.MessageEmbed()
            .setTitle("You said a bad word")
            .setDescription("You wrote a sentence with blocked words")

        message.channel.send({ embeds: [embed] })
    }
})
