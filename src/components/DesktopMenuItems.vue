<template>
    <q-list padding>
        <q-item
                v-for="item in list"
                v-bind:key="item"
                clickable
                v-ripple
                :active="item.title === activeItem"
                @click="activeItem = item.title"
                class="q-my-md menu-item"
                active-class="text-primary"
        >
            <q-item-section avatar>
                <q-icon size="md" :name="item.icon" />
            </q-item-section>

            <q-item-section class="text-menu">{{item.title}}</q-item-section>
        </q-item>
        <q-btn class="q-mt-lg full-width" padding="md" unelevated rounded color="primary" label="Create" />
    </q-list>
</template>

<script>
export default {
  name: 'DesktopMenuItems',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      activeItem: 'Home'

    }
  }
}
</script>

<style>
    .text-menu {
        font-family: title, Tahoma, sans-serif;
        font-size: 1.3em;
        line-height: 1.1em;
        font-weight: 700;
        text-transform: capitalize;
    }

    .menu-item {
        border-radius: 10%;
    }
</style>
