export type TCheckToUndefined = string | undefined

export type TRepliedMessage =
  | {
      repliedMessageId: string | undefined
      repliedMessageBody: string | undefined
    }
  | undefined
