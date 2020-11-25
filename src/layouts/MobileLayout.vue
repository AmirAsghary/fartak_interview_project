<template>
  <q-layout class="mobile" view="lHh Lpr lFf">
    <q-header :reveal-offset="650" reveal>
      <q-toolbar>
        <q-btn
            aria-label="Menu"
            dense
            flat
            icon="menu"
            round
            @click="drawer.open = !drawer.open"
        />
        <div class="absolute-center q-pt-sm">
          <img :src="$q.dark.isActive ? 'dark-logo.svg':'light-logo.svg'" height="30px"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="drawer.open"
        behavior="mobile"
        show-if-above
    >
      <q-btn
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          :label="$q.fullscreen.isActive ? 'Exit Fullscreen' : 'Go Fullscreen'"
          color="secondary"
          @click="$q.fullscreen.toggle()"
      />
      <q-list>
        <q-item-label
            class="text-grey-8"
            header
        >
          Essential Links
        </q-item-label>
        <EssentialLink
            v-for="link in drawer.items"
            :key="link.title"
            v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view class="mainContent"/>
    </q-page-container>

    <q-footer>
      <q-toolbar class="justify-around">
        <q-btn
            aria-label="Menu"
            dense
            flat
            icon="home"
            round
            @click="drawer.open = !drawer.open"
        />
        <q-btn
            aria-label="search"
            dense
            flat
            icon="search"
            round
            @click="drawer.open = !drawer.open"
        />
        <q-btn
            aria-label="profile"
            dense
            flat
            icon="person"
            round
            @click="drawer.open = !drawer.open"
        />

      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { colors } from 'quasar'

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default {
  name: 'MobileLayout',
  components: { EssentialLink },
  data () {
    return {
      viewMode: (this.$q.platform.is.mobile) ? 'mobile' : 'desktop',
      drawer: {
        open: false,
        items: linksData
      }
    }
  },
  methods: {},
  watch: {
    '$q.screen.width' () {
      if (this.$q.screen.width < 600) {
        this.viewMode = 'mobile'
      } else {
        this.viewMode = 'desktop'
      }
    }
  },
  beforeCreate () {
    this.$q.dark.set(true)

    this.$q.addressbarColor.set(colors.getBrand('dark'))
  }
}
</script>

<style lang="scss">
.mainContent {
  width: 100vw;
}
</style>
