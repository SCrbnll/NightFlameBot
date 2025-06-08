const { Client, GatewayIntentBits, Collection, ActivityType, EmbedBuilder } = require('discord.js');
const path = require('path')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const config = require('./src/utils/config.js');
const ErrorNotifier = require('./src/utils/errorNotifier.js');
const ResponseManager = require('./src/utils/responsesManager.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessageReactions,
    ]
});
const clientco = {
    commands: new Map(), // Simulación de la estructura de comandos del cliente
};

const errorNotifier = new ErrorNotifier(client);

clientco.commands = new Collection();
const clientId = config.client_id;
const guildId = config.guild_id;

// Registro de comandos slash
const commands = [];
function readCommands(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.lstatSync(filePath);

        if (stat.isDirectory()) {
            readCommands(filePath); // Llamada recursiva
        } else if (file.endsWith('.js')) {
            const command = require(filePath);
            commands.push(command.data);
            clientco.commands.set(command.data.name, command);
        }
    }
}

readCommands(path.resolve(__dirname, './src/commands'));

const rest = new REST({ version: '9' }).setToken(config.token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.once('ready', async () => {
    console.log('Bot is ready!');
    client.user.setPresence({
        activities: [{ name: `as darkness blooms`, type: ActivityType.Watching }],
        status: 'online',
    });
});

client.on('guildMemberAdd', async (member) => {
  updateMemberCount(member.guild);

  const welcomeChannelId = config.channels.welcome;
  if (!welcomeChannelId) return; 

  const channel = member.guild.channels.cache.get(welcomeChannelId);
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setTitle('👋 ¡Bienvenido al servidor!')
    .setDescription(`Hola ${member.user}, ¡bienvenido a **${member.guild.name}**! 🎉`)
    .setColor(0x00ff00)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp();

  channel.send({ embeds: [embed] });
});

client.on('guildMemberRemove', async (member) => {
  updateMemberCount(member.guild);

  const goodbyeChannelId = config.channels.goodbye;
  if (!goodbyeChannelId) return; 

  const channel = member.guild.channels.cache.get(goodbyeChannelId);
  if (!channel) return; 

  const embed = new EmbedBuilder()
    .setTitle('😢 Alguien nos ha dejado...')
    .setDescription(`${member.user.tag} ha salido de **${member.guild.name}**.`)
    .setColor(0xff0000)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp();

  channel.send({ embeds: [embed] });
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const responses = ResponseManager.getAllResponses();
    const response = responses[message.content.toLowerCase()];

    if (response) {
        await message.reply(response);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    const command = clientco.commands.get(commandName);

    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '> Ha habido un error ejecutando el comando', ephemeral: true });
    }
});

async function updateMemberCount(guild) {
    const countChannel = guild.channels.cache.get(config.channels.memberCount);
    if (!countChannel) {
        await errorNotifier.notifyErrorEmbed('index.js', 'No se encuentra el canal especificado para mostrar **countChannel**\nCompruebe que el canal existe o realice el comando **/setchannel**', Date.now());
        return;
    }

    try {
        const members = guild.memberCount;
        await countChannel.setName(`🍷 || Members: ${members}`);
    } catch (error) {
        await errorNotifier.notifyErrorEmbed('index.js', 'Error al cambiar el nombre al canal establecido para mostrar **countChannel**', Date.now());
    }

}

client.login(config.token);