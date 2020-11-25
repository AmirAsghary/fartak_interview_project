<template>
  <q-item :aria-label="`${postAuthor.name}'s Post`"
          :clickable="postTitle!==undefined"
          :ripple="false"
          class="q-pa-none"
          @click="$router.push((($q.platform.is.mobile===true)?'/mobile':'') + `/post/${postID}`)"
  >
    <q-card class="full-width transparent card" flat square>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img :src="profileImgCalc">
          </q-avatar>
        </q-item-section>

        <q-item-section class="user-info">
          <q-item-label>{{ postAuthor.name }}</q-item-label>
          <q-item-label>
            @{{ postAuthor.username }}
          </q-item-label>
          <q-item-label>
            4 hours ago
          </q-item-label>
        </q-item-section>
      </q-item>

      <div class="post-text">
        <p v-if="postTitle">{{ postTitle }}</p>

        <p v-if="postBody.text" :class="postTitle ? '':'comment'" class="body">{{ postBody.text }}</p>
      </div>

      <div v-if="postBody.media" class="body-img" style="border-radius: 2%">
        <img :class="($q.platform.is.mobile===true) ? 'compact':'desktop'" :src="postBody.media"
             style="border-radius: 2%">
      </div>

      <q-item :class="($q.platform.is.mobile===true)?'justify-center':'justify-evenly'">
        <div class="q-mx-md">
          <q-btn
              aria-label="comment"
              class=""
              dense
              flat
              icon="comment"
              round
              @click="drawer.open = !drawer.open"
          >
          </q-btn>
          <span class="text-caption">22</span>
        </div>

        <div class="q-mx-lg">
          <q-btn
              aria-label="favorite"
              class=""
              dense
              flat
              icon="favorite"
              round
              @click="drawer.open = !drawer.open"
          />
          <span class="text-caption">22</span>
        </div>

        <div class="q-mx-md">
          <q-btn
              aria-label="favorite"
              class=""
              dense
              flat
              icon="share"
              round
              @click="drawer.open = !drawer.open"
          />
          <span class="text-caption">22</span>
        </div>
      </q-item>
    </q-card>
  </q-item>
</template>

<script>
export default {
  name: 'Posts',
  methods: {
    bodyImgCalc () {
      return (this.postBody.media || 'https://imgs3.fontbrain.com/imgs/58/0d/0778ad254335be45bf58bb449f43/pt-720x360-5f5562.png')
    }
  },
  props: {
    profileImgSrc: {
      // type: String,
      // default: '',
      required: true
    },
    postAuthor: {
      // type: Object,
      required: true
    },
    postTitle: {
      // type: String,
      required: false
    },

    postID: {
      // type: Number,
      required: false
    },

    authorID: {
      // type: Number,
      required: false
    },

    postBody: {
      // type: Object,
      required: false
    }
  },
  computed: {
    profileImgCalc () {
      return (this.profileImgSrc || `https://picsum.photos/id/${this.authorID + 69}/200/200`)
    }
  }
}
</script>

<style scoped>
.card {
  border: 1px solid rgba(158, 158, 158, 0.25);
}

.card .user-info {
  font-size: 0.7em;
}

.body-img {
  position: relative;
  left: 4.5rem;
  overflow: hidden;
  max-height: 20rem;
  object-fit: cover;
  width: 70%;
}

.body-img > .desktop {
  max-height: 40rem;
  max-width: 55rem;
}

.body-img > .compact {
  max-height: 40rem;
  transform: scale(2, 2);
}

.post-text {
  position: relative;
  left: 4.5rem;
  max-height: 20rem;
  max-width: 80%;
  font-family: title, Tahoma, sans-serif;
  font-size: 1em;
  line-height: 1.1em;
  font-weight: 400;
  text-transform: capitalize;
}

.post-text .body {
  padding-top: 0.5rem;
  font-size: 0.9em;
}

.post-text .comment {
  font-size: 0.75em;
  margin-bottom: 0.2rem;
}
</style>
