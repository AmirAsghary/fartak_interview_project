<template>
  <q-layout class="desktop" view="hHh Lpr lff">
    <q-header class="transparent">
      <q-toolbar class="wrapper">
        <div class="box header-left-panel">
          <q-btn
              v-if="viewMode==='compact'"
              aria-label="Menu"
              dense
              flat
              icon="menu"
              round
              style="position: absolute; left: 13px; top: 10px"
              @click="drawer.open = !drawer.open"
          />
          <!--                    <div id="nest2"></div>-->
        </div>
        <div class="box header-main-panel">

        </div>
        <div class="box header-right-panel">
          <q-input v-if="$q.screen.width>=1100" v-model="search" dense outlined placeholder="Search" rounded>
            <template v-slot:append>
              <q-icon v-if="search !== ''" class="cursor-pointer" name="close" @click="search = ''"/>
              <q-icon name="search"/>
            </template>
          </q-input>
          <q-btn
              v-if="viewMode==='compact'"
              aria-label="Dark mode"
              dense
              flat
              icon="nights_stay"
              round
              style="position: absolute; left: 13px; top:92vh"
              @click="$q.dark.toggle()"
          >
            <q-tooltip :offset="[-2,5]" anchor="top right" self="center left">
              Enable Dark Mode
            </q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
        v-if="$q.screen.width<=panelsBreakPoint.left"
        v-model="drawer.open"
        :breakpoint="200"
        :mini="true"
        :width="200"

        class="desktop-drawer"
        show-if-above
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item v-ripple clickable>
            <q-item-section avatar>
              <q-icon name="inbox"/>
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>

          <q-item v-ripple active clickable>
            <q-item-section avatar>
              <q-icon name="star"/>
            </q-item-section>

            <q-item-section>
              Star
            </q-item-section>
          </q-item>

          <q-item v-ripple clickable>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>

            <q-item-section>
              Send
            </q-item-section>
          </q-item>

          <q-separator/>

          <q-item v-ripple clickable>
            <q-item-section avatar>
              <q-icon name="drafts"/>
            </q-item-section>

            <q-item-section>
              Drafts
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="wrapper">
      <div v-if="$q.screen.width>=panelsBreakPoint.left" class="box body-left-panel">
        <q-list padding>
          <q-item
              v-for="item in drawer.items"
              v-bind:key="item"
              v-ripple
              :active="item.title === activeItem"
              active-class="text-primary"
              class="q-my-md menu-item"
              clickable
              @click="leftDrawerClicked(item)"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" size="md"/>
            </q-item-section>

            <q-item-section class="text-menu">{{ item.title }}</q-item-section>
          </q-item>
          <q-btn class="q-mt-lg full-width" color="primary" label="Create" padding="md" rounded unelevated/>
        </q-list>
      </div>
      <div class="box body-main-panel">
        <router-view/>
      </div>
      <div v-if="$q.screen.width>=panelsBreakPoint.right" class="box body-right-panel">
        <FeedActivity/>
      </div>
    </q-page-container>

  </q-layout>
</template>

<script>
import FeedActivity from 'components/FeedActivity'

const linksData = [
  {
    title: 'Home',
    icon: 'home',
    path: '/'
  },
  {
    title: 'Notifications',
    icon: 'notifications'
  },
  {
    title: 'Explore',
    icon: 'explore'
  },
  {
    title: 'Messages',
    icon: 'inbox'
  },
  {
    title: 'Profile',
    icon: 'person'
  }
]

export default {
  name: 'MainLayout',
  components: { FeedActivity },
  data () {
    return {
      activeItem: 'Home',
      viewMode: (this.$q.screen.width < 790) ? 'compact' : 'full',
      panelsBreakPoint: {
        right: 1100,
        left: 790
      },
      drawer: {
        miniState: false,
        open: false,
        items: linksData
      },
      search: ''
    }
  },
  methods: {
    leftDrawerClicked (item) {
      this.activeItem = item.title
      if (item.title.toLowerCase() === 'home') {
        this.$router.push('/')
      }
    }
  },
  watch: {
    '$q.screen.width' () {
      if (this.$q.screen.width <= this.panelsBreakPoint.left) {
        this.viewMode = 'compact'
      } else {
        this.viewMode = 'full'
      }
    }
  },
  mounted () {
    console.log('store \n', this.$store.state.userList.users)
  }
}
</script>

<style>
.wrapper {
  display: grid;
  grid-gap: 10px;
  justify-content: center;
  grid-template-columns: 22vw 44vw 22vw;
}

.box {
  font-size: 150%;
}

.body-main-panel {
  grid-column: 2;
  grid-row: 1 / 3;
}

.body-right-panel {
  /*margin-right: 20px;*/
  grid-column: 3;
  grid-row: 1 / 3;
  position: sticky;
  top: 3.5rem;
  height: 80vh;
}

.body-left-panel {
  margin-right: 10px;
  grid-column: 1;
  grid-row: 1 / 3;
  position: sticky;
  top: 3.15rem;
  height: 80vh;
}

.header-main-panel {
  grid-column: 2;
  grid-row: 1 / 3;
}

.header-right-panel {
  grid-column: 3;
  grid-row: 1 / 3;
}

.header-left-panel {
  grid-column: 1;
  grid-row: 1 / 3;
}

.text-menu {
  font-family: title, Tahoma, sans-serif;
  font-size: 1em;
  font-weight: 200;
  text-transform: capitalize;
}

@media screen and (max-width: 1100px) {
  .wrapper {
    display: grid;
    grid-gap: 10px;
    justify-content: center;
    grid-template-columns: 25vw 60vw 0;
  }
}

@media screen and (max-width: 790px) {
  .wrapper {
    grid-template-columns: 0 85vw 0;
  }
}

#nest2 {
  display: block;
  height: 40px;
  width: 40px;
  border: 5px solid transparent;
  border-top-color: #5ecbf4;
  border-radius: 50%;
  -webkit-animation: spin8 2s linear infinite;
  animation: spin8 2s linear infinite;
}

#nest2:before {
  content: "";
  position: absolute;
  top: 1px;
  right: 1px;
  bottom: 1px;
  left: 1px;
  border: 3px solid transparent;
  border-radius: 50%;
  border-top-color: #5ecbf4;
  -webkit-animation: spin8 1.2s linear infinite;
  animation: spin8 1.2s linear infinite;
}

#nest2:after {
  content: "";
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 5px;
  border: 4px solid transparent;
  border-radius: 50%;
  border-top-color: #5ecbf4;
  -webkit-animation: spin8 2.5s linear infinite;
  animation: spin8 2.5s linear infinite;
}

@-webkit-keyframes spin8 {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}

@keyframes spin8 {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}

</style>
