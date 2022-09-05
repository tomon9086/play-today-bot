import { verifyKeyMiddleware } from 'discord-interactions'
import {
  InteractionResponseType,
  InteractionType,
  InteractionReplyOptions,
  MessagePayload
} from 'discord.js'
import { config } from 'dotenv'
import { RequestHandler, Response } from 'express'

config()

const { DISCORD_CLIENT_PUBLIC_KEY } = process.env

if (!DISCORD_CLIENT_PUBLIC_KEY) {
  throw new Error('not set DISCORD_CLIENT_PUBLIC_KEY')
}

type Snowflake = string

type InteractionData = {
  id: Snowflake
  name: string
  type: number
  resolved?: {}
  options?: []
  guild_id?: Snowflake
  target_id?: Snowflake
}

type User = {
  id: Snowflake
  username: string
  discriminator: string
  avatar: string
  bot?: boolean
  system?: boolean
  mfa_enabled?: boolean
  banner?: string
  accent_color?: number
  locale?: string
  verified?: boolean
  email?: string
  flags?: number
  premium_type?: number
  public_flags?: number
}

type Message = {
  id: Snowflake
  channel_id: Snowflake
  author: User
  content: string
  // timestamp: timestamp
  // edited_timestamp:  timestamp
  // tts: boolean
  // mention_everyone: boolean
  // mentions: User[]
  // mention_roles: role object ids[]
  // mention_channels?: channel mention objects[]
  // attachments: attachment objects[]
  // embeds: embed objects[]
  // reactions?: reaction objects[]
  // nonce?: number |string
  // pinned: boolean
  // webhook_id?: Snowflake
  // type: number
  // activity?: message activity object
  // application?: partial application object
  // application_id?: snowflake
  // message_reference?: message reference object
  // flags?: number
  // referenced_message?: ?message object
  // interaction?: message interaction object
  // thread?: channel object
  // components?: message components[]
  // sticker_items?: message sticker item objects[]
  // stickers?: sticker objects[]
  // position?: number
}

type Interaction = {
  id: Snowflake
  application_id: Snowflake
  type: InteractionType
  data?: InteractionData
  guild_id?: Snowflake
  channel_id?: Snowflake
  member?: {
    user?: User
    // nick?: string
    // avatar?: string
    // roles: Snowflake[]
    // joined_at: IsoTimestamp
    // premium_since?: IsoTimestamp
    // deaf: boolean
    // mute: boolean
    // pending?: boolean
    // permissions?: string
    // communication_disabled_until?: IsoTimestamp
  }
  // user?: User
  token: string
  version: number
  message?: Message
  app_permissions?: string
  locale?: string
  guild_locale?: string
}

const reply = (
  res: Response,
  type: InteractionResponseType,
  // ?
  options: string | InteractionReplyOptions | MessagePayload
) =>
  res.send({
    type,
    data: {
      content: options
    }
  })

export const interactionsHandler: RequestHandler[] = [
  verifyKeyMiddleware(DISCORD_CLIENT_PUBLIC_KEY),
  (req, res) => {
    const interaction = req.body as Interaction

    if (interaction.type === InteractionType.ApplicationCommand) {
      const { name } = interaction.data ?? {}

      console.log('interaction:', interaction.id)
      // console.log(interaction)

      switch (name) {
        case 'ping':
          return reply(
            res,
            InteractionResponseType.ChannelMessageWithSource,
            `Hi, ${interaction.member?.user?.username ?? 'anonymous'}!`
          )
      }
    }
  }
]
