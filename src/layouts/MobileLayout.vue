<template>
    <q-layout view="lHh Lpr lFf">
        <q-header reveal elevated>
            <q-toolbar>
                <q-btn
                        flat
                        dense
                        round
                        icon="menu"
                        aria-label="Menu"
                        @click="drawer.open = !drawer.open"
                />

                <q-toolbar-title>
                    Quasar App
                </q-toolbar-title>

            </q-toolbar>
        </q-header>

        <q-drawer
                v-model="drawer.open"
                show-if-above
                bordered
                content-class="bg-grey-1"
        >
            <q-list>
                <q-item-label
                        header
                        class="text-grey-8"
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

        <q-footer elevated>
            <q-toolbar class="justify-around">
                <q-btn
                        flat
                        dense
                        round
                        icon="home"
                        aria-label="Menu"
                        @click="drawer.open = !drawer.open"
                />

                <q-btn
                        flat
                        dense
                        round
                        icon="search"
                        aria-label="search"
                        @click="drawer.open = !drawer.open"
                />
                <q-btn
                        flat
                        dense
                        round
                        icon="person"
                        aria-label="profile"
                        @click="drawer.open = !drawer.open"
                />

            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

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
  watch: {
    '$q.screen.width' () {
      if (this.$q.screen.width < 600) {
        this.viewMode = 'mobile'
      } else {
        this.viewMode = 'desktop'
      }
    }
  },
  mounted () {

  }
}
</script>

<style>
    .mainContent {
        height: 80vh;
        width: 100vw;
    }
</style>
