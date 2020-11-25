<template>
  <q-page>
    <q-list v-for="(post, index) in posts" :key="index">
      <Posts
          :authorID="post.userId"
          :postAuthor="$store.getters['userList/getUsers'].find(user => user.id === post.userId)"
          :postBody="{media: `https://picsum.photos/id/${post.id}/600/900`}"
          :postID="post.id"
          :postTitle="post.title"
          :profileImgSrc="`https://picsum.photos/id/${post.userId + 69}/200/200`"
      />
    </q-list>
    <q-pagination
        v-model="pagination.page"
        :boundary-links="true"
        :max="Math.ceil(pagination.totalContentSize / pagination.contentLimit)"
        aria-label="pagination controls"
        class="justify-center q-py-md"
        color=""
        @input="fetchPosts(pagination.page)"
    />
  </q-page>
</template>

<script>
import axios from 'axios'
import Posts from 'components/Posts.vue'
import { getTotalDeletedPosts, getTotalUpdatedPosts, getUpdatedPost, instantiateDB } from '../controller/db-handler'

export default {
  name: 'PageIndex',
  components: { Posts },
  data () {
    return {
      pagination: {
        page: 1,
        contentLimit: 25,
        totalContentSize: null,
        lastLoadedItem: null
      },
      posts: []
    }
  },
  methods: {
    fetchPosts (page) {
      axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
        const tdp = getTotalDeletedPosts()
        const eligible = res.data.filter((post) => {
          return !tdp.includes(post.id)
        })
        this.posts = eligible.slice((page - 1) * this.pagination.contentLimit, page * this.pagination.contentLimit)

        const tupc = getTotalUpdatedPosts().filter((pid) => {
          return pid > (page - 1) * this.pagination.contentLimit && pid <= page * this.pagination.contentLimit
        })

        if (tupc.length > 0) {
          const tup = getUpdatedPost(null, tupc)
          tupc.forEach((pid) => {
            this.posts[this.posts.findIndex((post) => {
              return post.id === pid
            })] = tup[pid]
          })
        }

        this.pagination.totalContentSize = eligible.length

        const uidSet = new Set()
        this.posts.forEach((item, index) => {
          uidSet.add(item.userId)
        })

        const userPromises = []
        uidSet.forEach((uid) => {
          userPromises.push(axios.get(`https://jsonplaceholder.typicode.com/users/${uid}`))
        })

        axios.all(userPromises).then(axios.spread((...responses) => {
          responses.forEach(resp => {
            this.$store.dispatch('userList/addUser', resp.data)
          })
        })).catch(errors => {
          console.log(errors)
        })
      })
      window.scrollTo(0, 0)
    },
    scrolled ({ verticalPercentage }) {
      // console.log(`at ${verticalPercentage}`)
    },
    whatever () {
    }
  },
  beforeMount () {
    instantiateDB({ contentLimit: this.pagination.contentLimit, lastLoadedItem: this.pagination.lastLoadedItem })

    this.fetchPosts(this.pagination.page)
  },
  beforeCreate () {
    // small hack to simulate server-side platform detection
    if (this.$q.platform.is.mobile) {
      this.$router.replace('/mobile').then(res => {
        console.log('replacing', res)
      })
    }
  }
}
</script>
