const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const ResponseManager = require('./../../utils/responsesManager.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('allresponses')
        .setDescription('Muestra todas las respuestas automáticas registradas.'),
    async execute(interaction) {
        const responses = ResponseManager.getAllResponses();
        const embed = new EmbedBuilder()
            .setTitle('📄 Respuestas Automáticas Registradas')
            .setColor(0x1f8b4c);

        if (Object.keys(responses).length === 0) {
            embed.setDescription('No hay respuestas registradas.');
        } else {
            const list = Object.entries(responses)
                .map(([trigger, reply]) => `🗨️  **${trigger}** → ${reply}`)
                .join('\n');

            embed.setDescription(list);
        }

        await interaction.reply({ embeds: [embed] });
    },
};
