// vuex.d.ts
import { Store } from 'vuex'

// declare your own store states
interface State {
    count: number
}

declare module '@vue/runtime-core' {

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}