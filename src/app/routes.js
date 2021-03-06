import urlJoin from 'url-join'
import { isString, ary } from 'lodash'
import qs from 'query-string'

import log from 'Utilities/log'

const createPath = (...paths) => {
  const fullPath = paths
    .map((path) => path && path.path ? path.path : path)
    .filter(isString)
    .reduce(ary(urlJoin, 2))
  const pathParamNames = fullPath
    .split('/')
    .filter((token) => token.startsWith(':'))
    .map((token) => token.slice(1))

  log.debug(`Created path ${fullPath}`)

  const subPathParams = (...params) => {
    let substitutedPath = fullPath
    pathParamNames.forEach((paramName, i) => {
      const paramValue = params[i]
      if (paramValue) {
        substitutedPath = substitutedPath.replace(`:${paramName}`, paramValue)
      }
    })
    const queryParams = params[pathParamNames.length]
    let query = ''
    if (typeof queryParams === 'object' && queryParams !== null) {
      query = '?' + qs.stringify(queryParams)
    }
    return substitutedPath + query
  }
  subPathParams.path = fullPath
  return subPathParams
}

export const root = createPath('/')
export const dashboard = createPath('/dashboard')
export const settings = createPath('/settings')
export const rebalance = createPath('/rebalance')
export const rebalanceInstructions = createPath(rebalance, '/instructions')
export const viewOnlyAddress = createPath('/address/:addressQuery')
export const tradeHistory = createPath('/orders')
export const tradeWidgetDetail = createPath('/orders/widget/:tradeId')
export const tradeDetail = createPath('/orders/:tradeId')
export const swapWidgetStepTwo = createPath('/swap/send')
export const swapWidget = createPath('/swap')
export const watchlist = createPath('/assets/watchlist')
export const trending = createPath('/assets/trending/:timeFrame?')
export const assetDetail = createPath('/assets/:symbol')
export const assetIndex = createPath('/assets')

export const affiliateLogin = createPath('/affiliates/login')
export const affiliateSignup = createPath('/affiliates/signup')
export const affiliateAccountModal = createPath('/affiliates/dashboard/account')
export const affiliateDashboard = createPath('/affiliates/dashboard')
export const affiliateSettings = createPath('/affiliates/settings')
export const affiliateSwaps = createPath('/affiliates/swaps')
export const affiliatePayouts = createPath('/affiliates/withdrawals')
export const affiliateTerms = createPath('/affiliates/terms')

export const connectMobileWallet = createPath(connect, '/mobile/connect/:walletType')
export const connect = createPath('/connect')
export const connectHwWallet = createPath(connect, '/hw/:walletType')
export const walletInfoModal = createPath(connect, '/:walletType')
export const connectHwWalletAsset = createPath(connectHwWallet, '/:assetSymbol')
export const connectHwWalletAssetConfirm = createPath(connectHwWalletAsset, '/confirm')
export const connectHwWalletAssetAccounts = createPath(connectHwWalletAsset, '/accounts')

export default {
  root,
  dashboard,
  rebalance,
  rebalanceInstructions,
  tradeHistory,
  tradeDetail,
  swapWidget,
  swapWidgetStepTwo,
  tradeWidgetDetail,
  assetDetail,
  connect,
  connectHwWallet,
  connectHwWalletAsset,
  connectHwWalletAssetConfirm,
  connectHwWalletAssetAccounts,
  viewOnlyAddress,
  assetIndex,
  walletInfoModal,
  affiliateLogin,
  affiliateSignup,
  affiliateDashboard,
  affiliateSettings,
  affiliateSwaps,
  affiliatePayouts,
  affiliateAccountModal,
  affiliateTerms,
  watchlist,
  trending,
  settings,
}
