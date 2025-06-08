
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Muestra la lista de comandos disponibles.'),
    async execute(interaction) {
        const user = interaction.user;
        const embedConstructor = new EmbedBuilder()
            .setDescription("Bienvenido a la ayuda de <@1258738952089899078>, aquí encontrarás todos \nlos comandos disponibles.")
            .addFields(
                {
                    name: "Comandos",
                    value: "> Utilice el menú de selección de la parte inferior.",
                    inline: false
                },
            )
            .setColor(0xAA00FF)
            .setFooter({
                text: interaction.guild.name,
                iconURL: interaction.guild.iconURL(),
            });

        const client = interaction.client;
        if (client.user) {
            embedConstructor.setAuthor({name: client.user.username ,iconURL: client.user.displayAvatarURL({ dynamic: true }),})
        }

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId(`infoSelect-${user.id}`)
            .setPlaceholder('Selecciona una opción')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Menú principal')
                    .setEmoji('🍷')
                    .setValue('menu'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Información')
                    .setEmoji('🍷')
                    .setDescription('Muestra comandos sobre información.')
                    .setValue('info'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Entretenimiento')
                    .setEmoji('🃏')
                    .setDescription('Muestra comandos sobre entretenimiento.')
                    .setValue('entrete'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Utilidad')
                    .setEmoji('☕')
                    .setDescription('Muestra los comandos sobre utilidad.')
                    .setValue('util'),
            );

        const selectRow = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({ embeds: [embedConstructor], components: [selectRow] });

        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            try {
                if (i.customId.includes('infoSelect')) {
                    if (i.values[0] === 'menu') {
                        await i.update({ embeds: [embedConstructor], components: [selectRow] });

                    } else if (i.values[0] === 'info') {
                        
                        const infoEmbed = new EmbedBuilder()
                            .setTitle(`Comandos de información`)
                            .setDescription(
                                "> /about - Muestra información sobre.\n> " +
                                "/credits - Muestra información tecnica sobre el bot.\n> " +
                                "/help - Muestra la lista de comandos disponibles\n> " + 
                                "/ping - Muestra latencia del bot\n> " +
                                "/avatar - Muestra el avatar del usuario\n> " + 
                                "/banner - Muestra el banner del usuario\n> " + 
                                "/userinfo - Muestra información sobre el usuario\n> " +
                                "/emojis - Muestra los emojis del servidor\n> " + 
                                "/icon - Muestra el icono del servidor\n> " + 
                                "/roles - Muestra los roles del servidor\n> " + 
                                "/serverbanner - Muestra el banner del servidor\n> " + 
                                "/serverinfo - Muestra información sobre el servidor\n "
                            )
                            .setColor(0xAA00FF)
                            .setAuthor({name: client.user.username ,iconURL: client.user.displayAvatarURL({ dynamic: true }),});

                        await i.update({ embeds: [infoEmbed], components: [selectRow] });

                    } else if (i.values[0] === 'entrete') {
                        const entreteEmbed = new EmbedBuilder()
                            .setTitle(`Comandos de entretenimiento`)
                            .setDescription(
                                "> /8ball - Realiza una pregunta a la mágica bola del 8\n> " +
                                "/choose - Realiza una elección entre opciones\n> " +
                                "/mixnames - Mezcla los nombres de dos usuarios\n> " + 
                                "/pokemon - Obtén información sobre un Pokémon\n> " + 
                                "/shiny - Visualiza el shiny de un pokemon\n> " + 
                                "/rate - El bot puntúa tu perfil\n> " +
                                "/roll - Lanza X cantidad de dados con un número máximo de caras\n> " + 
                                "/rps - Juega a piedra, papel o tijeras con otro usuario\n> " + 
                                "/ship - Calcula el porcentaje de compatibilidad entre dos usuarios\n "
                            )
                            .setColor(0xAA00FF)
                            .setAuthor({name: client.user.username ,iconURL: client.user.displayAvatarURL({ dynamic: true }),});

                        await i.update({ embeds: [entreteEmbed], components: [selectRow] });

                    } else if (i.values[0] === 'util') {
                        const utilEmbed = new EmbedBuilder()
                            .setTitle(`Comandos de utilidad`)
                            .setDescription(
                                "> /allbirthdays - Muestra todos los cumpleaños registrados\n" + 
                                "> /birthday add - Añade tu cumpleaños\n" +
                                "> /birthday remove - Elimina tu cumpleaños\n" +
                                "> /github - Muestra información de un usuario de GitHub\n" +
                                "> /poll - Realiza una encuesta con opciones separadas por |\n"
                            )
                            .setColor(0xAA00FF)
                            .setAuthor({name: client.user.username ,iconURL: client.user.displayAvatarURL({ dynamic: true }),});

                        await i.update({ embeds: [utilEmbed], components: [selectRow] });
                    }
                }
            } catch (error) {
                console.error('Error al responder a la interacción:', error);
            }
        });
    }
};

