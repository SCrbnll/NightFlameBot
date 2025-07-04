const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Muestra el avatar del usuario.')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('El usuario cuyo avatar quieres ver.')
                .setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('usuario') || interaction.user;
        const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });
        if (avatarURL) {
            const embedConstructor = new EmbedBuilder()
                .setTitle(`Avatar de ${user.username}`)
                .setImage(avatarURL)
                .setColor(0xAA00FF)
                .setFooter({
                    text: `User ID: ${user.id}`,
                });
            interaction.reply({ embeds: [embedConstructor] });
        } else {
            await interaction.reply({ content: `> **${user.username}** no tiene un banner establecido.` });
        }

    }
};

