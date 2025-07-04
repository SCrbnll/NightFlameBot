const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('./../../utils/config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listevents')
        .setDescription('Muestra información detallada de los eventos del servidor.'),
    async execute(interaction) {
        const guild = interaction.guild;
        const channels = config.channels;
        const errorUserId = config.errorUserId;

        const embed = new EmbedBuilder()
            .setTitle('Información de Eventos del Servidor')
            .setDescription(`Para cambair dichos eventos deberá realizar los comandos\n- </setchannel:1268154803691716680> para cambiar los **canales**`)
            .setColor(0xAA00FF)

        let channelDescriptions = '';
        for (const [key, value] of Object.entries(channels)) {
            const channel = guild.channels.cache.get(value);
            if (channel) {
                channelDescriptions += `> **${key}:** ${channel}\n`;
            } else {
                channelDescriptions += `> **${key}:** Canal no establecido\n`;
            }
        }

        const errorUser = guild.members.cache.get(errorUserId);
        const errorUserMention = errorUser ? errorUser.toString() : 'Usuario no establecido';
        const errorUserDescription = `> **errorUserId:** ${errorUserMention}`;

        embed.addFields(
            { name: 'Canales', value: channelDescriptions },
            { name: 'Usuario de Errores', value: errorUserDescription }
        );

        await interaction.reply({ embeds: [embed] });
    },
};
