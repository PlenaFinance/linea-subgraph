import { Created as CreatedEvent } from '../generated/Contract/Contract'
import { Created } from '../generated/schema'
import { Wallet } from '../generated/templates'

export function handleCreated(event: CreatedEvent): void {
  let entity = Created.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Created(event.transaction.from.toHex())
    // Entity fields can be set using simple assignments
    entity.wallet = event.params.wallet

    entity.wallet = event.params.wallet
  }

  // Entity fields can be set based on event parameters
  Wallet.create(event.params.wallet)

  entity.save()
}
