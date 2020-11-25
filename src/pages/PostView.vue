<template>
  <q-page>
    <q-item :aria-label="`${post.senderInfo.name}'s Post`"
            :ripple="false"
            class="q-pa-none"
    >
      <q-card class="full-width transparent cards" flat square>
        <q-item>
          <q-item-section avatar>
            <img :src="`https://picsum.photos/id/${post.senderInfo.id + 69}/200/200`" height="50px"
                 style="border-radius: 50%">
          </q-item-section>

          <q-item-section class="user-info">
            <q-item-label>{{ post.senderInfo.name }}</q-item-label>
            <q-item-label caption>
              @{{ post.senderInfo.username }}
            </q-item-label>
          </q-item-section>

          <q-btn
              aria-label="comment"
              class=""
              dense
              flat
              icon="more_horiz"
              round
          >
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item v-close-popup clickable>
                  <q-item-section>Share</q-item-section>
                </q-item>
                <q-separator/>
                <q-item v-close-popup clickable @click="editPost">
                  <q-item-section>Edit Post</q-item-section>
                </q-item>
                <q-item v-close-popup clickable @click="deletePost">
                  <q-item-section>Delete</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-item>

        <q-card v-if="editing.enabled" bordered class="my-card bg-grey-1" flat v-on:keydown.enter="saveEdit"
                v-on:keydown.esc="cancelEdit">
          <q-card-section>
            <q-editor
                v-model="editing.title"
                max-height="7rem"
                toolbar=""
            />
            <q-editor
                v-if="editing.enabled"
                v-model="editing.body"
                dense
                flat square toolbar=""
            />
            <div v-if="editing.limits.titleLength.violated"
                 :class="editing.limits.titleLength.violated ? 'text-negative':''"
                 class="q-pt-sm q-px-xs">
              {{ editing.title.length }}
            </div>
          </q-card-section>

          <q-card-actions class="float-right">
            <q-btn flat @click="cancelEdit">Cancel</q-btn>
            <q-btn class="q-px-md" outline @click="saveEdit">Save</q-btn>
          </q-card-actions>
        </q-card>

        <div v-else>
          <div class="post-text">
            <p>{{ post.data.title }}</p>

            <p class="body">{{ post.data.body }}</p>
          </div>
          <div class="body-img" style="border-radius: 2%">
            <img :class="($q.platform.is.mobile===true) ? 'compact':'desktop'"
                 :src="`https://picsum.photos/id/${post.data.id}/600/900`"
                 style="border-radius: 2%">
          </div>
          <div class="post-text timestamp text-grey-10">
            2:17 PM · Nov 22, 2020
          </div>
          <div class="post-text interactions">
            <b>23</b> likes
            <b class="q-pl-lg">24</b> shares
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
              >
              </q-btn>
            </div>

            <div class="q-mx-lg">
              <q-btn
                  aria-label="favorite"
                  class=""
                  dense
                  flat
                  icon="favorite"
                  round
              />
            </div>

            <div class="q-mx-md">
              <q-btn
                  aria-label="favorite"
                  class=""
                  dense
                  flat
                  icon="share"
                  round
              />
            </div>
          </q-item>

        </div>

      </q-card>
    </q-item>
    <div v-if="editing.enabled === false">
      <q-list v-for="(commenter,index) in comments.sender" :key="index" class="comments">
        <Posts
            :postAuthor="commenter"
            :postBody="{text: comments.text[index]}"
            :profileImgSrc="`https://picsum.photos/id/${commenter.id + 69}/200/200`"
        />
      </q-list>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import Posts from 'components/Posts.vue'
import { saveAs } from 'file-saver'
import { getUpdatedPost } from 'src/controller/db-handler'

export default {
  name: 'PostView',
  components: { Posts },
  data () {
    return {
      editing: {
        enabled: false,
        title: '',
        body: '',
        limits: {
          titleLength: { value: 150, violated: false }
        }
      },
      post: {
        data: null,
        senderInfo: null
      },
      comments: {
        text: [],
        sender: []
      }
    }
  },
  watch: {
    'editing.title' (message) {
      this.editing.limits.titleLength.violated = message.length > this.editing.limits.titleLength.value
    }
  },
  created () {
    this.fetchPost()
    this.fetchComments()
  },
  methods: {
    cancelEdit () {
      this.editing.enabled = false
      document.title = document.title.slice(0, -2)
      this.editing.title = ''
      this.editing.body = ''
    },
    deletePost () {
      console.info(`Deleting Post ${this.post.data.id}\nfrom User ${this.post.senderInfo.id} with ID: ${this.post.senderInfo.username}`)
      localStorage.setItem(`POST_${this.$route.params.postID}`, 'DELETED')
      const blob = new Blob([JSON.stringify(this.post.data)], { type: 'application/json;charset=utf-8' })
      saveAs(blob, `User ${this.post.senderInfo.username} - Post ${this.post.data.id}.json`)
      this.$router.push('/')
    },
    editPost () {
      this.editing.title = this.post.data.title
      this.editing.body = this.post.data.body
      this.editing.enabled = true
      document.title = document.title + ' *'
    },
    fetchComments () {
      const amount = Math.floor(Math.random() * 6)
      console.log(`showing ${amount} comments`)
      const cmPromises = []
      for (let i = 0; i < amount; i++) {
        cmPromises.push(axios.get('https://api.kanye.rest/'))
      }

      axios.all(cmPromises).then(axios.spread((...responses) => {
        responses.forEach(resp => {
          this.comments.text.push(resp.data.quote)
          this.comments.sender.push(this.$store.getters['userList/getUsers'][Math.floor(Math.random() * 5)])
        })
        console.log(this.comments)
      })).catch(errors => {
        // react on errors.
      })
    },
    fetchPost () {
      const updatedPost = getUpdatedPost(this.$route.params.postID)
      if (updatedPost !== null) {
        this.post.data = updatedPost
        console.log(this.post.data)
        axios.get(`https://jsonplaceholder.typicode.com/users/${this.post.data.userId}`).then((res) => {
          this.post.senderInfo = res.data
        })
      } else {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.postID}`).then((res) => {
          this.post.data = res.data

          axios.get(`https://jsonplaceholder.typicode.com/users/${res.data.userId}`).then((res) => {
            this.post.senderInfo = res.data
          })
        })
      }
    },
    saveEdit () {
      this.editing.enabled = false
      document.title = document.title.slice(0, -2)
      this.post.data.title = this.editing.title
      this.post.data.body = this.editing.body
      localStorage.setItem(`POST_${this.$route.params.postID}`, `UPDATED_${JSON.stringify(this.post.data)}`)
      this.editing.title = ''
      this.editing.body = ''
    }
  }
}
</script>

<style scoped>
.cards {
  border: 1px solid rgba(158, 158, 158, 0.25);
}

.cards .user-info {
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
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
  position: relative;
  left: 4.5rem;
  max-height: 20rem;
  max-width: 80%;
  font-family: title, Tahoma, sans-serif;
  font-size: 1em;
  line-height: 1.1em;
  font-weight: 300;
  text-transform: capitalize;
}

.post-text .body {
  font-size: 0.9em;
}

.interactions {
  font-size: 0.7em;
  margin-top: 0.7rem;
  margin-left: 0.3rem;
  padding: 1rem;
  margin-right: 0.3rem;
  border-top: 1px solid rgba(158, 158, 158, 0.25);
  border-bottom: 1px solid rgba(158, 158, 158, 0.25);
}

.timestamp {
  font-size: 0.7em;
  margin-top: 0.7rem;
  margin-left: 0.3rem;
  padding: 1rem;
  margin-right: 0.3rem;
}
</style>
