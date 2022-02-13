
const {Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu} = require('discord.js');

module.exports = {
    name: "help",
    run: async(message, args, client) => {
        const directories = [...new Set(client.commands.map(cmd => cmd.directories)),
        ];

        console.log(directories);

        const formatString = (str) => 
            `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;


        const categories = directories.map((dir) => {
            const getCommands = client.commands.filter((cmd) => cmd.directories == dir
            ).map(cmd => {
                return {
                    name: cmd.name || "there is no name",
                    description: cmd.description || "there is no descriptiption for this command",

                }
            });
        
        return {

            directory: formatString(dir),
            commands: getCommands,
        } 

        });

        const embed = new MessageEmbed().setDescription("Chose a category in the dropdown menu"
        );

        const components = (state) => [

            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId("help-menu")
                .setPlaceholder("Please select a category")
                .setDisabled(state)
                .addOptions(
                    categories.map((cmd) => {

                        return{
                            label: cmd.directory,
                            value: cmd.directory.toLocaleLowerCase(),
                            description: `Commands from ${cmd.directory} category`, 
                        };
                    })
                )
            ),
        ];

        const initialMessage = await message.channel.send({
            embeds: [embed],
            components: components(false),
        });

        const filter = (interaction) => interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector({filter, componentType: 'SELECT_MENU', time: 5000, });

         collector.on('collect', (interaction) => {
             const [ directory ] = interaction.values;
             const category = category.find(x => x.directory.toLocaleLowerCase() === directory);

             const categoryEmbed = new MessageEmbed()
             .setTitle(`${directory} commands`)
             .setDescription("Here are the list of commands")
             .addFields(
                 category.commands.map((cmd) => {
                     return {
                         name: `\`${cmd.name}\``,
                         value: cmd.description,
                         inline: true,

                     };
                 })
             )


             interaction.update({ embeds: [categoryEmbed] });
         });

         collector.on('end', () => {
             initialMessage.edit({components: components(true)});
         });
    },
};