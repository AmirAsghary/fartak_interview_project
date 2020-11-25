// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
import { AddressbarColor } from 'quasar'

export default async (/* { app, router, Vue ... } */) => {
  AddressbarColor.set('#1b1b1b')
}
