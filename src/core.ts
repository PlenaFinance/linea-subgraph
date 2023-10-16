import { Bytes } from '@graphprotocol/graph-ts'
import {
  Wallet,
  LogSell,
  LogMint,
  LogRedeem,
  TransferTokens,
  LogClaimMatic,
  Claim,
  Stake,
  UnStake,
  ZapIn,
  ZapOut,
  ZapOutPair,
  BridgeAsset,
  ClaimedAnyTokens,
  NftTransfer,
  Pay,
  Bet,
  ClaimPredictionReward,
  Deposit,
  LifiBridge as LifiBridgeEvent,
  PlenaConnectTxnWithVal as PlenaConnectTxnWithValEvent,
} from '../generated/templates/Wallet/Wallet'
import {
  SwapTransaction,
  Transfer,
  Transaction,
  Withdraw,
  WithdrawAnyToken,
  Supply,
  UnStake as UnStakeSchema,
  Stake as StakeSchema,
  ClaimTransaction,
  ClaimMaticTransaction,
  ZapIn as ZapInSchema,
  ZapOut as ZapOutSchema,
  ZapOutPair as ZapOutPairSchema,
  BrigeTransaction,
  TransferNFT,
  TransferInChat,
  BetPrediction,
  ClaimBetReward,
  Deposit as DepositSchema,
  LifiBridge,
  PlenaConnectTxnWithVal,
} from '../generated/schema'

export function handlePlenaConnectTxnWithVal(
  event: PlenaConnectTxnWithValEvent,
): void {
  let entity = PlenaConnectTxnWithVal.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  if (entity == null) {
    entity = new PlenaConnectTxnWithVal(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'plenaConnect'
  } else {
    transaction.transferEvent = 'plenaConnect'
  }

  entity.targets = event.params.targets.map<Bytes>((e: Bytes) => e)
  entity.wallet = event.params.wallet
  entity.values = event.params.values
  entity.erc20 = event.params.erc20
  entity.fee = event.params.fee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  transaction.plenaConnect = entity.id
  transaction.save()
}

export function handleDeposit(event: Deposit): void {
  let entity = DepositSchema.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new DepositSchema(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )
  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'portfolioDeposit'
  } else {
    transaction.transferEvent = 'portfolioDeposit'
  }

  entity.dToken = event.params.dToken
  entity.folio = event.params.folio
  entity.amount = event.params.amount
  entity.tokens = event.params.tokens.map<Bytes>((e: Bytes) => e)
  entity.weights = event.params.weights
  entity.tokensBought = event.params.tokensBought
  entity.fee = event.params.fee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  transaction.portfolioDeposit = entity.id
  transaction.save()
}

export function handleLifiBridge(event: LifiBridgeEvent): void {
  let entity = LifiBridge.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new LifiBridge(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'lifiBridge'
  } else {
    transaction.transferEvent = 'lifiBridge'
  }

  entity.from = event.params.fromUser
  entity.to = event.params.toUser
  entity.fromToken = event.params.fromToken
  entity.toToken = event.params.toToken
  entity.amount = event.params.amount
  entity.fee = event.params.fee
  entity.feeRecipient = event.params.feeRecipient
  entity.timestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  transaction.lifiBridge = entity.id
  transaction.save()
}

export function handleBet(event: Bet): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type

  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = BetPrediction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new BetPrediction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )
  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'bet'
  } else {
    transaction.transferEvent = 'bet'
  }

  entity.user = event.params.user
  entity.epoch = event.params.epoch
  entity.timestamp = event.block.timestamp
  entity.amount = event.params.amount
  entity.token = event.params.token
  entity.direction = event.params.direction
  entity.fee = event.params.fee
  entity.transactionHash = event.transaction.hash.toHexString()
  entity.predictionContract = event.params.predictionContract
  // Entities can be written to the store with `.save()`
  entity.save()
  transaction.bet = entity.id
  transaction.save()
}

export function handleClaimPredictionReward(
  event: ClaimPredictionReward,
): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type

  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ClaimBetReward.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ClaimBetReward(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )
  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'claimBetReward'
  } else {
    transaction.transferEvent = 'claimBetReward'
  }

  entity.user = event.params.user
  entity.epochs = event.params.epochs
  entity.timestamp = event.block.timestamp
  entity.reward = event.params.reward
  entity.fee = event.params.fee
  entity.token = event.params.token
  entity.transactionHash = event.transaction.hash.toHexString()
  entity.predictionContract = event.params.predictionContract

  // Entities can be written to the store with `.save()`
  entity.save()
  transaction.claimBetReward = entity.id
  transaction.save()
}

export function handleLogSell(event: LogSell): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = SwapTransaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new SwapTransaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )
  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'swap'
  } else {
    transaction.transferEvent = 'swap'
  }

  //swap
  // let swaps = transaction.transfer;

  // Entity fields can be set based on event parameters
  entity.buyToken = event.params.buyToken
  entity.sellToken = event.params.sellToken
  entity.buyAmt = event.params.buyAmt
  entity.sellAmt = event.params.sellAmt
  entity.fee = event.params.fee
  entity.timestamp = event.block.timestamp
  entity.wallet = event.address.toHexString()
  entity.transactionHash = event.transaction.hash.toHexString()

  // Entities can be written to the store with `.save()`
  entity.save()
  transaction.swap = entity.id
  transaction.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // None
}

export function handleNftTransfer(event: NftTransfer): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = TransferNFT.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new TransferNFT(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )
  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'transferNFT'
  } else {
    transaction.transferEvent = 'transferNFT'
  }

  //swap
  // let swaps = transaction.transfer;

  // Entity fields can be set based on event parameters
  entity.token = event.params.token
  entity.from = event.params.from
  entity.to = event.params.to
  entity.feeToken = event.params.feeToken
  entity.fee = event.params.fee
  entity.nftType = event.params.nftType
  entity.nftId = event.params.nftId
  entity.timestamp = event.block.timestamp
  entity.wallet = event.address.toHexString()
  entity.transactionHash = event.transaction.hash.toHexString()

  // Entities can be written to the store with `.save()`
  entity.save()
  transaction.transferNFT = entity.id
  transaction.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // None
}

export function handleLogMint(event: LogMint): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Supply.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Supply(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )
  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'supplied'
  } else {
    transaction.transferEvent = 'supplied'
  }

  //swap
  // let supplied = transaction.supplied;

  // Entity fields can be set based on event parameters
  entity.fee = event.params.fee
  entity.timestamp = event.block.timestamp
  entity.wallet = event.address.toHexString()
  entity.tokenAmt = event.params.tokenAmt
  entity.erc20 = event.params.erc20
  entity.transactionHash = event.transaction.hash.toHexString()

  // Entities can be written to the store with `.save()`
  entity.save()
  transaction.supplied = entity.id
  transaction.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // None
}

export function handleLogRedeem(event: LogRedeem): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Withdraw.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Withdraw(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )
  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'withdraw'
  } else {
    transaction.transferEvent = 'withdraw'
  }

  //swap
  // let withdraw = transaction.withdraw;

  // Entity fields can be set based on event parameters
  entity.fee = event.params.fee
  entity.timestamp = event.block.timestamp
  entity.wallet = event.address.toHexString()
  entity.tokenAmt = event.params.tokenAmt
  entity.erc20 = event.params.erc20
  entity.transactionHash = event.transaction.hash.toHexString()

  // Entities can be written to the store with `.save()`
  entity.save()
  transaction.withdraw = entity.id
  transaction.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // None
}

export function handlePay(event: Pay): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = TransferInChat.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new TransferInChat(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'transferInChat'
  } else {
    transaction.transferEvent = 'transferInChat'
  }

  //transfer
  // let transfers = transaction.transfer;

  // BigInt and BigDecimal math are supported

  // Entity fields can be set based on event parameters
  entity.recipient = event.params.recipient
  entity.tokenAmt = event.params.tokenAmt
  entity.wallet = event.address.toHexString()
  entity.fee = event.params.fee
  entity.erc20 = event.params.erc20
  entity.timestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash.toHexString()
  entity.tokenName = event.params.tokenName
  entity.decimals = event.params.decimals

  // Entities can be written to the store with `.save()`
  entity.save()
  transaction.tranferInChat = entity.id
  transaction.save()
}

export function handleTransferTokens(event: TransferTokens): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Transfer.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Transfer(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'transfer'
  } else {
    transaction.transferEvent = 'transfer'
  }

  //transfer
  // let transfers = transaction.transfer;

  // BigInt and BigDecimal math are supported

  // Entity fields can be set based on event parameters
  entity.recipient = event.params.recipient
  entity.tokenAmt = event.params.tokenAmt
  entity.wallet = event.address.toHexString()
  entity.fee = event.params.fee
  entity.erc20 = event.params.erc20
  entity.timestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash.toHexString()

  // Entities can be written to the store with `.save()`
  entity.save()
  transaction.transfer = entity.id
  transaction.save()
}

export function handleLogClaimMatic(event: LogClaimMatic): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ClaimMaticTransaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ClaimMaticTransaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )
  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'claimMatic'
  } else {
    transaction.transferEvent = 'claimMatic'
  }

  //swap
  // let claimMatic = transaction.claimMatic;

  // Entity fields can be set based on event parameters
  entity.fee = event.params.fee
  entity.timestamp = event.block.timestamp
  entity.wallet = event.address.toHexString()
  entity.amount = event.params.amount
  entity.transactionHash = event.transaction.hash.toHexString()

  // Entities can be written to the store with `.save()`
  entity.save()
  transaction.claimMatic = entity.id
  transaction.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // None
}

export function handleClaim(event: Claim): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ClaimTransaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ClaimTransaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )
  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'claimPlena'
  } else {
    transaction.transferEvent = 'claimPlena'
  }

  //swap
  // let claimPlena = transaction.claimPlena;

  // Entity fields can be set based on event parameters
  entity.fee = event.params.fee
  entity.timestamp = event.block.timestamp
  entity.wallet = event.address.toHexString()
  entity.amount = event.params.amount
  entity.erc20 = event.params.erc20
  entity.transactionHash = event.transaction.hash.toHexString()

  // Entities can be written to the store with `.save()`
  entity.save()
  transaction.claim = entity.id
  transaction.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // None
}

export function handleStake(event: Stake): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = StakeSchema.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new StakeSchema(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )
  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'stake'
  } else {
    transaction.transferEvent = 'stake'
  }

  //swap
  // let stake = transaction.stake;

  // Entity fields can be set based on event parameters
  entity.fee = event.params.fee
  entity.timestamp = event.block.timestamp
  entity.wallet = event.address.toHexString()
  entity.amount = event.params.amount
  entity.erc20 = event.params.erc20
  entity.transactionHash = event.transaction.hash.toHexString()

  // Entities can be written to the store with `.save()`
  entity.save()
  transaction.stake = entity.id
  transaction.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // None
}

export function handleUnStake(event: UnStake): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = UnStakeSchema.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new UnStakeSchema(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )
  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'unstake'
  } else {
    transaction.transferEvent = 'unstake'
  }

  //swap
  // let unstake = transaction.unstake;

  // Entity fields can be set based on event parameters
  entity.fee = event.params.fee
  entity.timestamp = event.block.timestamp
  entity.wallet = event.address.toHexString()
  entity.amount = event.params.amount
  entity.erc20 = event.params.erc20
  entity.transactionHash = event.transaction.hash.toHexString()

  // Entities can be written to the store with `.save()`
  entity.save()
  transaction.unstake = entity.id
  transaction.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // None
}

export function handleZapIn(event: ZapIn): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ZapInSchema.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ZapInSchema(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )
  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'zapIn'
  } else {
    transaction.transferEvent = 'zapIn'
  }

  //swap
  // let zapIn = transaction.zapIn;

  // Entity fields can be set based on event parameters
  entity.fee = event.params.fee
  entity.timestamp = event.block.timestamp
  entity.wallet = event.address.toHexString()
  entity.fromToken = event.params.fromToken
  entity.pairAddress = event.params.pairAddress
  entity.lpBought = event.params.lpBought
  entity.transactionHash = event.transaction.hash.toHexString()
  entity.fromTokenAmount = event.params.fromTokenAmount

  // Entities can be written to the store with `.save()`
  entity.save()
  transaction.zapIn = entity.id
  transaction.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // None
}

export function handleClaimedAnyTokens(event: ClaimedAnyTokens): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = WithdrawAnyToken.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new WithdrawAnyToken(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )
  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'claimAnyTokens'
  } else {
    transaction.transferEvent = 'claimAnyTokens'
  }

  //swap
  // let zapIn = transaction.zapIn;

  // Entity fields can be set based on event parameters
  entity.fee = event.params.fee
  entity.timestamp = event.block.timestamp
  entity.wallet = event.address.toHexString()
  entity.token = event.params.token
  entity.amount = event.params.amount
  entity.transactionHash = event.transaction.hash.toHexString()

  // Entities can be written to the store with `.save()`
  entity.save()
  transaction.withdrawAnyToken = entity.id
  transaction.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // None
}

export function handleZapOut(event: ZapOut): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ZapOutSchema.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ZapOutSchema(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )
  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'zapOut'
  } else {
    transaction.transferEvent = 'zapOut'
  }

  //swap
  // let zapIn = transaction.zapIn;

  // Entity fields can be set based on event parameters
  entity.fee = event.params.fee
  entity.timestamp = event.block.timestamp
  entity.wallet = event.address.toHexString()
  entity.fromPoolAddress = event.params.fromPoolAddress
  entity.toTokenAddress = event.params.toTokenAddress
  entity.incomingLP = event.params.incomingLP
  entity.totalTokensRec = event.params.totalTokensRec
  entity.transactionHash = event.transaction.hash.toHexString()

  // Entities can be written to the store with `.save()`
  entity.save()
  transaction.zapOut = entity.id
  transaction.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // None
}

export function handleZapOutPair(event: ZapOutPair): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ZapOutPairSchema.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ZapOutPairSchema(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )
  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'zapOutPair'
  } else {
    transaction.transferEvent = 'zapOutPair'
  }

  //swap
  // let zapIn = transaction.zapIn;

  // Entity fields can be set based on event parameters
  entity.fee = event.params.fee
  entity.timestamp = event.block.timestamp
  entity.wallet = event.address.toHexString()
  entity.fromPoolAddress = event.params.fromPoolAddress
  entity.amount0 = event.params.amount0
  entity.amount1 = event.params.amount1
  entity.incomingLP = event.params.incomingLP
  entity.feeTokenAddress = event.params.feeTokenAddress
  entity.transactionHash = event.transaction.hash.toHexString()

  // Entities can be written to the store with `.save()`
  entity.save()
  transaction.zapOutPair = entity.id
  transaction.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // None
}

export function handleBridgeAsset(event: BridgeAsset): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = BrigeTransaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new BrigeTransaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
  }

  let transaction = Transaction.load(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )
  if (transaction === null) {
    transaction = new Transaction(
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
    )
    transaction.wallet = event.address.toHexString()
    transaction.timestamp = event.block.timestamp
    transaction.transactionHash = event.transaction.hash.toHexString()
    transaction.transferEvent = 'bridge'
  } else {
    transaction.transferEvent = 'bridge'
  }

  //swap
  // let zapIn = transaction.zapIn;

  // Entity fields can be set based on event parameters
  entity.fee = event.params.fee
  entity.timestamp = event.block.timestamp
  entity.wallet = event.address.toHexString()
  entity.erc20 = event.params.erc20
  entity.anyToken = event.params.anyToken
  entity.to = event.params.to
  entity.tokenAmt = event.params.tokenAmt
  entity.toChainID = event.params.toChainID
  entity.transactionHash = event.transaction.hash.toHexString()

  // Entities can be written to the store with `.save()`
  entity.save()
  transaction.bridge = entity.id
  transaction.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // None
}
