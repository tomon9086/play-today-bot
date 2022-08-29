import { Client, GatewayIntentBits, SlashCommandBuilder } from 'discord.js'
import { config } from 'dotenv'

config()

const { DISCORD_API_KEY } = process.env

if (!DISCORD_API_KEY) {
  throw new Error('not set DISCORD_API_KEY')
}

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!')
].map((command) => command.toJSON())

const client = new Client({
  intents: [GatewayIntentBits.GuildIntegrations]
})

client.login(DISCORD_API_KEY)

export const registerSlashCommands = () => {
  if (!client.isReady() || !client.application) {
    return Promise.reject('not ready')
  }

  return client.application.commands
    .set(commands)
    .then(() => {
      client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) {
          return
        }

        const { commandName } = interaction

        switch (commandName) {
          case 'ping':
            await interaction.reply(`Hi, ${interaction.user.username}!`)
            break
        }
      })

      return
    })
    .catch(console.error)
}
