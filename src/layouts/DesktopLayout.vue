<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="transparent">
      <q-toolbar class="wrapper">
        <div class="box header-left-panel">
          <q-btn
                  v-if="viewMode==='compact'"
                  flat
                  dense
                  round
                  icon="menu"
                  aria-label="Menu"
                  @click="drawer.open = !drawer.open"
          />
<!--                    <div id="nest2"></div>-->
        </div>
        <div class="box header-main-panel">

        </div>
        <div v-if="$q.screen.width>=1100" class="box header-right-panel">
          <q-input dense rounded outlined v-model="search" placeholder="Search">
            <template v-slot:append>
              <q-icon v-if="search !== ''" name="close" @click="search = ''" class="cursor-pointer" />
              <q-icon name="search" />
            </template>
          </q-input>

        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
            v-model="drawer.open"
            v-if="viewMode==='compact'"
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
        <DesktopMenuItems
                v-for="link in drawer.items"
                :key="link.title"
                v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="wrapper">
      <div class="box body-left-panel">
        <q-list padding>
          <q-item
                  v-for="item in drawer.items"
                  v-bind:key="item"
                  clickable
                  v-ripple
                  :active="item.title === activeItem"
                  @click="leftDrawerClicked(item)"
                  class="q-my-md menu-item"
                  active-class="text-primary"
          >
            <q-item-section avatar>
              <q-icon size="md" :name="item.icon" />
            </q-item-section>

            <q-item-section v-if="$q.screen.width>700" class="text-menu">{{item.title}}</q-item-section>
          </q-item>
          <q-btn class="q-mt-lg full-width" padding="md" unelevated rounded color="primary" label="Create" />
        </q-list>
      </div>
      <div class="box body-main-panel">
        <router-view/>
      </div>
      <div v-if="$q.screen.width>=1100" class="box body-right-panel">
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
      viewMode: (this.$q.screen.width < 600) ? 'compact' : 'full',
      drawer: {
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
      if (this.$q.screen.width < 600) {
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
    grid-column: 3 ;
    grid-row: 1 / 3;
    position:sticky;
    top:3.5rem;
    height:100vh;
  }
  .body-left-panel {
    margin-right: 10px;
    grid-column: 1;
    grid-row: 1 / 3;
    position:sticky;
    top:3.15rem;
    height:100vh;
  }

  .header-main-panel {
    grid-column: 2;
    grid-row: 1 / 3;
  }
  .header-right-panel {
    grid-column: 3 ;
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
      grid-template-columns: 25vw 60vw;
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
