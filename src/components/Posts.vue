<template>
  <q-item :aria-label="`${postAuthor.name}'s Post`"
          :clickable="postTitle!==undefined"
          :ripple="false"
          class="q-pa-none latin-regular"
  >
    <q-card class="full-width transparent card" flat square>
      <q-item clickable @click="$router.push((($q.platform.is.mobile===true)?'/mobile':'') + `/user/${authorID}`)">
        <q-item-section avatar>
          <q-avatar>
            <img :src="profileImgCalc">
          </q-avatar>
        </q-item-section>

        <q-item-section class="user-info">
          <q-item-label class="latin-bold" style="font-size: small">{{ postAuthor.name }}</q-item-label>
          <q-item-label class="" style="font-size: small; margin-top: 2px">
            @{{ postAuthor.username }}
          </q-item-label>
          <q-item-label style="font-size: smaller; margin-top: 0">
            4 hours ago
          </q-item-label>
        </q-item-section>
      </q-item>

      <div class="post-text"
           @click="$router.push((($q.platform.is.mobile===true)?'/mobile':'') + `/post/${postID}`)">
        <p v-if="postTitle">{{ postTitle }}</p>

        <p v-if="postBody.text" :class="postTitle ? '':'comment'" class="body">{{ postBody.text }}</p>
      </div>

      <div v-if="postBody.media" class="body-img" style="border-radius: 2%"
           @click="$router.push((($q.platform.is.mobile===true)?'/mobile':'') + `/post/${postID}`)">
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
              icon="o_comment"
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
              icon="o_favorite"
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
              icon="o_share"
              round
              @click="sharePost(true)"
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
    },
    sharePost (grid) {
      const shareMSG = {
        withLink: `Hey, check out this post by ${this.postAuthor.name} on Fartak App. %0D%0A${this.postTitle}%0D%0A${window.location}post/${this.postID}`,
        simple: `Hey, check out this post by ${this.postAuthor.name} on Fartak App.%0D%0A${this.postTitle}`
      }
      this.$q.bottomSheet({
        message: 'Share via...',
        grid,
        actions: [
          {
            label: 'Email',
            icon: 'o_mail',
            id: 'email'
          },
          {
            label: 'Telegram',
            icon: 'o_send',
            id: 'telegram'
          },
          {
            label: 'Twitter',
            icon: 'o_sms',
            id: 'twitter'
          },
          {
            label: 'Copy to Clipboard',
            icon: 'o_content_copy',
            id: 'copy'
          }
        ]
      }).onOk(action => {
        switch (action.id) {
          case 'twitter':
            window.open(`https://twitter.com/intent/tweet?text=${shareMSG.withLink.split(' ').join('%20')}`)
            break
          case 'email':
            window.open(`mailto:user@mail.com?body=${shareMSG.withLink.split(' ').join('%20')}`)
            break
          case 'telegram':
            window.open(`https://t.me/share/url?url=${window.location}post/${this.postID}&text=${shareMSG.simple}`)
            break
          case 'copy':
            navigator.clipboard.writeText(`Hey, check out this post by ${this.postAuthor.name} on Fartak App.\n${this.postTitle}\n${window.location}post/${this.postID}`)
              .then(function () {
              }, function () {
                console.error('copying post data failed.')
              })
            break
        }
      }).onCancel(() => {
        // console.log('Dismissed')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
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
  max-width: 75%;
  font-size: 1em;
  line-height: 1.15em;
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
