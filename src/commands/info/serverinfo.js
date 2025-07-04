const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Muestra información sobre el servidor'),
    async execute(interaction) {
        const guild = interaction.guild;
        const user = interaction.user;

        const owner = await guild.fetchOwner();
        const textChannels = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size;
        const voiceChannels = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size;
        const threadChannels = guild.channels.cache.filter(channel => channel.isThread()).size;
        const creationTimestamp = Math.floor(guild.createdAt / 1000);
        
        const members = await guild.members.fetch();
        const totalUsers = members.filter(member => !member.user.bot).size;
        const totalBots = members.filter(member => member.user.bot).size;

        const embedConstructor = new EmbedBuilder()
            .setAuthor({
                name: guild.name,
                iconURL: guild.iconURL({ dynamic: true }),
            })
            .addFields(
                { name: "ID Servidor", value: guild.id, inline: true },
                { name: "Dueño/a", value: `<@${owner.id}>`, inline: true },
                { name: "Fecha creación", value: `<t:${creationTimestamp}:d>`, inline: true },
                { name: `Canales (${textChannels + voiceChannels + threadChannels})`, value: `**${textChannels}** texto | **${voiceChannels}** voz | **${threadChannels}** hilo`, inline: true },
                { name: `Miembros (${guild.memberCount})`, value: `**${totalUsers}** usuarios | **${totalBots}** bots`, inline: true },
                { name: "Mejoras", value: `${guild.premiumSubscriptionCount || 0}`, inline: true },
                { name: "Emojis", value: `${guild.emojis.cache.size}`, inline: true },
                { name: "Roles", value: `${guild.roles.cache.size}`, inline: true },
            )
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setColor(0xAA00FF)
            .setFooter({
                text: interaction.client.user.username,
                iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }),
            });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`serverIcon-${user.id}`)
                    .setLabel('Icono')
                    .setEmoji('🖼️')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`serverBanner-${user.id}`)
                    .setLabel('Banner')
                    .setEmoji('🖼️')
                    .setStyle(ButtonStyle.Primary)
            );

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId(`infoSelect-${user.id}`)
            .setPlaceholder('Selecciona una opción')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Servidor')
                    .setEmoji('🍷')
                    .setDescription('Muestra la información general del servidor.')
                    .setValue('server'),
                    new StringSelectMenuOptionBuilder()
                    .setLabel('Roles')
                    .setEmoji('🃏')
                    .setDescription('Muestra los roles del servidor.')
                    .setValue('roles'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Emojis')
                    .setEmoji('☕')
                    .setDescription('Muestra los emojis del servidor.')
                    .setValue('emojis'),
            );

        const selectRow = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({ embeds: [embedConstructor], components: [row, selectRow] });

        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            try {
                if (i.customId.includes('serverIcon')) {
                    const iconURL = guild.iconURL({ dynamic: true, size: 1024 });
                    if (iconURL) {
                        const iconEmbed = new EmbedBuilder()
                            .setTitle('Icono del servidor')
                            .setImage(iconURL)
                            .setColor(0xAA00FF);
                        await i.reply({ embeds: [iconEmbed], ephemeral: true });
                    } else {
                        await i.reply({ content: `> **${guild.name}** no tiene un icono establecido.`, ephemeral: true });
                    }
                } else if (i.customId.includes('serverBanner')) {
                    const bannerURL = guild.bannerURL({ size: 1024 });
                    if (bannerURL) {
                        const bannerEmbed = new EmbedBuilder()
                            .setTitle('Banner del servidor')
                            .setImage(bannerURL)
                            .setColor(0xAA00FF);
                        await i.reply({ embeds: [bannerEmbed], ephemeral: true });
                    } else {
                        await i.reply({ content: `> **${guild.name}** no tiene un banner establecido.`, ephemeral: true });
                    }
                } else if (i.customId.includes('infoSelect')) {
                    if (i.values[0] === 'server') {
                        await i.update({ embeds: [embedConstructor], components: [row, selectRow] });

                    } else if (i.values[0] === 'roles'){
                        const allRoles = guild.roles.cache;
                        const members = await guild.members.fetch();
                
                        const botNames = members.filter(member => member.user.bot).map(bot => {
                            const botName = bot.user.username.toLowerCase();
                            return botName === 'disboard' ? `${botName}.org` : botName;
                        });
                
                        const filteredRoles = allRoles.filter(role => {
                            const roleName = role.name.toLowerCase();
                            return roleName !== '@everyone' &&
                                !role.name.startsWith('@+─') &&
                                !botNames.includes(roleName); 
                        }).sort((a, b) => b.position - a.position);
                
                        let description = '';
                        filteredRoles.forEach(role => {
                            description += `<@&${role.id}>\n`;
                        });
                
                        const emojiEmbed = new EmbedBuilder()
                            .setTitle(`Roles de ${guild.name}`)
                            .setDescription(description || `> **${guild.name}** no dispone de ningún rol`)
                            .setColor(0xAA00FF);
                
                        await i.update({ embeds: [emojiEmbed], components: [selectRow] });
                        
                    } else if (i.values[0] === 'emojis') {
                        const emojis = guild.emojis.cache.map(emoji => emoji.toString()).join(' ');
                        const emojiEmbed = new EmbedBuilder()
                            .setTitle(`Emojis de ${guild.name}`)
                            .setDescription(emojis || `> **${guild.name}** no dispone de ningún emoji`)
                            .setColor(0xAA00FF);

                        await i.update({ embeds: [emojiEmbed], components: [selectRow] });
                    }
                }
            } catch (error) {
                console.error('Error al responder a la interacción:', error);
            }
        });
    }
};