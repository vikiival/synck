import { BlockData, Log } from '../utils/types'
import { handleTokenBurn } from './burn'
import { handleTokenCreate } from './mint'
import { handleTokenTransfer } from './transfer'
import { safeDecode721Transfer, isBurn, isMint } from './utils'

export function handler(log: Log, block: BlockData) {
  const transfer = safeDecode721Transfer(log)

  if (!transfer) {
    return null
  }

  if (isMint(transfer)) {
    return handleTokenCreate(transfer, log)
  }

  if (isBurn(transfer)) {
    return handleTokenBurn(transfer, log)
  }

  return handleTokenTransfer(transfer, log)
}
