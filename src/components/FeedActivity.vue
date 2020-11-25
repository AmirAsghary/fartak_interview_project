<template>
  <q-card class="transparent" flat>
    <q-item>
      <q-item-section>
        <q-item-label>Favorites</q-item-label>
      </q-item-section>
    </q-item>

    <div class="row">
      <div v-for="i in ($q.screen.width<=1300?3:4)" v-bind:key="i" class="column">
        <q-card class="user" flat>
          <img src="https://miro.medium.com/fit/c/90/90/1*mDhF9X4VO0rCrJvWFatyxg.png"/>
          <q-badge color="black" floating>
            {{ Math.ceil(Math.random() * 25) }}
          </q-badge>
          <div class="q-pt-xs text-caption">
            @assad
          </div>
        </q-card>
        <q-card class="user" flat>
          <img src="https://miro.medium.com/fit/c/90/90/1*mDhF9X4VO0rCrJvWFatyxg.png"/>
          <q-badge color="black" floating>
            {{ Math.ceil(Math.random() * 25) }}
          </q-badge>
          <div class="q-pt-xs text-caption">
            @assad
          </div>
        </q-card>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'FeedActivity'
}
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}

/* Create four equal columns that sits next to each other */
.column {
  flex: 25%;
  max-width: 25%;
  padding: 0 4px;
}

.user {
  margin-top: 8px;
  margin-bottom: 8px;
  vertical-align: middle;
  width: 80%;
  text-align: center;
  background-color: transparent;
}

/* Responsive layout - makes a two column-layout instead of four columns */
@media screen and (max-width: 1300px) {
  .column {
    flex: 33%;
    max-width: 33%;
  }
}
</style>
