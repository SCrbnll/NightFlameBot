const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('credits')
    .setDescription('Muestra información técnica y de desarrollo del bot.'),
  async execute(interaction) {
    const client = interaction.client;

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${client.user.username} – Créditos`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setDescription("Este bot fue creado como una plantilla genérica, pensada para ser reutilizable y personalizable por cualquier desarrollador.")
      .addFields(
        {
          name: "🧑‍💻 Desarrollador",
          value: "- [SCrbnl](https://github.com/SCrbnll) - Creador original del bot y estructura base.",
          inline: false,
        },
        {
          name: "📚 Librerías principales",
          value: "- [discord.js](https://discord.js.org/)\n- [node.js](https://nodejs.org/)",
          inline: false,
        },
        {
          name: "🔍 APIs utilizadas",
          value: "- [PokéAPI](https://pokeapi.co/)\n- [GitHub API](https://docs.github.com/rest)",
          inline: false,
        },
        {
          name: "📦 Repositorio",
          value: "- Puedes ver el código fuente y adaptarlo desde: - [GitHub - Nightflame](https://github.com/SCrbnll/NightFlameBot)",
          inline: false,
        },
      )
      .setColor(0xAA00FF)

    await interaction.reply({ embeds: [embed] });
  },
};
