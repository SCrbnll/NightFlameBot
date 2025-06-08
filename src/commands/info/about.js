const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Muestra información sobre este bot.'),
  async execute(interaction) {
    const client = interaction.client;

    const embed = new EmbedBuilder()
      .setTitle(`Acerca de ${client.user.username}`)
      .setDescription(`¡Hola! Soy un bot modular de Discord diseñado como plantilla genérica, creado originalmente por SCrbnll}>.\n\nEste proyecto está pensado para que otros desarrolladores puedan adaptarlo fácilmente a sus propios servidores o comunidades.`)
      .addFields(
        {
          name: "¿Qué puedo hacer?",
          value: "`/help` : Lista de comandos disponibles.\n`/credits` : Información técnica del bot.",
          inline: false,
        },
      )
      .setColor(0xAA00FF)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

    await interaction.reply({ embeds: [embed] });
  },
};
