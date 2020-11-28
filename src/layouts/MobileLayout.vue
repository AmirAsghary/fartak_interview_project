<template>
  <q-layout class="mobile" view="lHh Lpr lFf">
    <q-header :reveal-offset="650" reveal :class="$route.path.includes('user')?'bg-transparent':''">
      <q-toolbar style="border-top: 0;" :class="$route.path.includes('user')?'bg-transparent':''">
        <div class="absolute-center q-pt-sm">
          <img :src="$q.dark.isActive ? 'dark-logo.svg':'light-logo.svg'" height="30px"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view class="mainContent"/>
    </q-page-container>

    <q-footer v-if="footer">
      <q-toolbar v-touch-swipe.mouse.up="handleSwipe" class="justify-around">
        <q-btn
            aria-label="Menu"
            dense
            flat
            icon="o_home"
            round
            @click="navBarHandle({title:'home',path:'/'})"
        />
        <q-btn
            aria-label="search"
            dense
            flat
            icon="o_menu"
            round
            @click="show()"
        />
        <q-btn
            aria-label="profile"
            dense
            flat
            icon="o_person"
            round
            @click="drawer.open = !drawer.open"
        />
      </q-toolbar>
    </q-footer>
    <q-dialog v-model="drawer.bottom" position="bottom" @before-hide="hide()">
        <q-toolbar class="bottom-nav justify-around full-width" v-touch-swipe.mouse.down="handleSwipe">
          <q-btn
              aria-label="Menu"
              dense
              flat
              icon="o_home"
              round
              @click="navBarHandle({title:'home',path:'/'})"
          />
          <q-btn
              aria-label="menu"
              dense
              flat
              icon="o_menu"
              round
              @click="hide()"
          />
          <q-btn
              aria-label="search"
              dense
              flat
              icon="o_search"
              round
              @click="drawer.open = !drawer.open"
          />
        </q-toolbar>
        <q-card class="bottom-drawer full-width" flat square tag="div">
          <q-list v-for="(item, index) in drawer.items" v-bind:key="index" padding>
            <q-item v-ripple class="drawer-items" clickable @click="navBarHandle(item)">
              <q-item-section avatar class="q-pl-xl">
                <q-icon :name="item.icon"/>
              </q-item-section>

              <q-item-section class="">
                {{ $t(item.title) }}
              </q-item-section>
            </q-item>
          </q-list>
          <q-item v-ripple tag="label">
            <q-item-section avatar class="q-pl-xl">
              <q-icon :color="$q.dark.isActive ? 'yellow-3':'grey-9'"
                      :name="$q.dark.isActive ? 'wb_sunny':'brightness_3'"/>
            </q-item-section>

            <q-item-section class="">
              {{ $q.dark.isActive ? $t('disable') : $t('enable') }} {{ $t('menu.darkmode') }}
            </q-item-section>
            <q-item-section avatar>
              <q-toggle v-model="darkState" class="q-pr-lg" color="primary" @input="setDarkMode"/>
            </q-item-section>
          </q-item>
        </q-card>
      </q-dialog>
  </q-layout>
</template>

<script>
import { getThemeConfig, setThemeConfig } from 'src/controller/db-handler'

const drawerItems = [
  {
    title: 'menu.notifs',
    icon: 'o_notifications'
  },
  {
    title: 'menu.explore',
    icon: 'o_explore'
  },
  {
    title: 'menu.messages',
    icon: 'o_inbox'
  },
  {
    title: 'menu.profile',
    icon: 'o_person'
  }
]

export default {
  name: 'MobileLayout',
  data () {
    return {
      viewMode: (this.$q.platform.is.mobile) ? 'mobile' : 'desktop',
      drawer: {
        open: false,
        items: drawerItems,
        bottom: false
      },
      footer: true,
      darkState: this.$q.dark.isActive
    }
  },
  methods: {
    handleSwipe () {
      this.footer = !this.footer
      this.drawer.bottom = !this.drawer.bottom
    },
    navBarHandle (item) {
      this.activeItem = item.title
      if (item.path === '/') {
        this.$router.push('/')
      }
    },
    show () {
      this.footer = false
      this.drawer.bottom = true
    },
    hide () {
      this.footer = true
      this.drawer.bottom = false
    },
    setDarkMode () {
      this.$q.dark.set(this.darkState)
      this.$q.addressbarColor.set(this.darkState ? '#1b1b1b' : '#f9f9f9')
      setThemeConfig(this.darkState)
      console.log(`Set DarkMode State to ${this.darkState}`)
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
  beforeCreate () {
    this.$q.dark.set(getThemeConfig('dark'))
  }
}
</script>

<style lang="scss">
.mainContent {
  width: 100vw;
}
</style>
