import { sendChatMessage } from '@/api/send-chat-message'
import { IPlaybackManager } from '@/core/playback-manager'
import { ISongQueue } from '@/core/song-queue'
import { VoteManager } from '@/core/vote-manager'
import { logger } from '@/helpers/logger'
import { RateLimitConfig } from '@/helpers/rate-limit'
import { TwitchMessagePayload } from '@/types/twitch-ws-message'

export type Deps = {
  songQueue: ISongQueue
  voteManager: VoteManager
  logger: typeof logger
  playbackManager: IPlaybackManager
  sendChatMessage: typeof sendChatMessage
}

export type ExecuteParams = {
  payload: TwitchMessagePayload
  deps: Deps
  messageId: string | undefined
  sanitizedMessage: string
  isMod: boolean
}

export abstract class CommandHandler {
  rateLimit?: RateLimitConfig

  canHandle(messageText: string): boolean {
    throw new Error('Method canHandle has not been implemented.')
  }

  async execute(data: ExecuteParams): Promise<void> {
    throw new Error('Method execute has not been implemented.')
  }
}
