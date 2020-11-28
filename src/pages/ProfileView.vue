<template>
  <q-page class="latin-regular">
    <q-card class="profile-card" flat square>
      <q-img basic
             class="profile-back"
             src="https://cdn.quasar.dev/img/parallax2.jpg"
             style="max-height: 92vh;"
      >
        <div :style="'bottom: -'+ ($q.screen.width/3)+'px'"
             class="bg-transparent absolute-center latin-bold text-center">
          <q-item-section avatar>
            <q-avatar :size="($q.screen.width/3.5)+'px'">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-item-section>
          <q-item-section class="q-pt-sm">
            {{ userInfo.name }}
          </q-item-section>
          <q-item-section>
            @{{ userInfo.username }}
          </q-item-section>
        </div>
        <div :class="$q.dark.isActive ? 'bg-dark':''" class="absolute-bottom text-center">
          <div class="row">
            <div class="col">
              <q-item-label class="text-bold">
                53
              </q-item-label>
              Followers
            </div>
            <div class="col">
              <q-item-label class="text-bold">
                53
              </q-item-label>
              Followings
            </div>
            <div class="col">
              <q-item-label class="text-bold">
                {{ posts.length }}
              </q-item-label>
              Posts
            </div>
            <div class="col">
              <q-item-label class="text-bold">
                53K
              </q-item-label>
              Likes
            </div>
          </div>
        </div>
      </q-img>
    </q-card>
    <q-card flat square class="q-pt-md bg-transparent" style="padding-left: 8vw; padding-right: 8vw;">
      <div v-if="!profile.showMore">
        <q-item-label :lines="1" class="q-pb-sm latin-bold">
          Summary :
        </q-item-label>
        <q-item-section>
          {{biographyGen(userInfo, 'summary')}}
        </q-item-section>
      </div>
      <div v-else>
        <div class="q-py-sm" v-for="(item, index) in biographyGen(userInfo, 'full')" v-bind:key="index">
          <div v-if="item.type === 'text'">
            {{item.label}}: {{ item.value }}
          </div>
          <div v-if="item.type === 'link'">
            {{item.label}}: <a :href="item.value" target="_blank">{{item.value}}</a>
          </div>
          <div v-if="item.type === 'phone'">
            {{item.label}}: <a :href="`tel:${item.value}`">{{item.value}}</a>
          </div>
          <div v-if="item.type === 'email'">
            {{item.label}}: <a :href="`mailto:${item.value}`">{{item.value}}</a>
          </div>
          <div v-if="item.type === 'search'">
            {{item.label}}: <a :href="`https://www.google.com/search?q=${item.value.split().join('+')}+${item.label.slice(0,item.label.length-2)}`" target="_blank">{{item.value}}</a>
          </div>
        </div>
      </div>
      <q-card-section horizontal @click="bioShowMoreToggle()" class="show-more q-pt-xs">
        Show {{ profile.showMore ? 'Less':'More' }}
      </q-card-section>
    </q-card>
    <q-card flat square class="post-header q-py-md bg-transparent" style="padding-left: 8vw; padding-right: 8vw;">
      <q-card-section horizontal class="text-bold text-subtitle1">
        {{userInfo.name.split(' ')[0]}}'s Posts
      </q-card-section>
    </q-card>
    <q-list v-for="(post, index) in posts" :key="index">
      <Posts
          :authorID="post.userId"
          :postAuthor="userInfo"
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
import { getTotalDeletedPosts, getTotalUpdatedPosts, getUpdatedPost } from 'src/controller/db-handler'
import Posts from 'components/Posts'

export default {
  name: 'ProfileView',
  components: { Posts },
  data () {
    return {
      pagination: {
        page: 1,
        contentLimit: 25,
        totalContentSize: null,
        lastLoadedItem: null
      },
      posts: [],
      userInfo: null,
      profile: {
        showMore: false
      }
    }
  },
  methods: {
    fetchPosts (page) {
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${this.$route.params.userID}`).then((res) => {
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

        axios.get(`https://jsonplaceholder.typicode.com/users/${this.$route.params.userID}`).then((res) => {
          this.userInfo = res.data
        })
      })
      window.scrollTo(0, 0)
    },
    biographyGen (userInfo, type) {
      if (type === 'summary') {
        return `
      ${(Math.random() * 2 < 1) ? "I'm" : 'My name is'} ${userInfo.name} and
       I'm the ${(Math.random() * 2 < 1) ? 'director' : 'VP of engineering'} of ${userInfo.company.name}.\n
       You can ${(Math.random() * 2 < 1) ? `Email me at ${userInfo.email}` : `call me at ${userInfo.phone}`} for any inquiries.
      `
      }

      return [
        {
          label: 'Name',
          value: userInfo.name,
          type: 'text'
        },
        {
          label: 'Website',
          value: `https://www.${userInfo.website}`,
          type: 'link'
        },
        {
          label: 'Phone',
          value: userInfo.phone,
          type: 'phone'
        },
        {
          label: 'Email',
          value: userInfo.email,
          type: 'email'
        },
        {
          label: 'Company',
          value: userInfo.company.name,
          type: 'text'
        }
      ]
    },
    bioShowMoreToggle () {
      this.profile.showMore = !this.profile.showMore
    }
  },
  beforeMount () {
    this.fetchPosts(1)
  }
}
</script>

<style scoped lang="scss">
  a {
  color: #9f9f9f;
}
  .body--dark .profile-card {
    width: 100%;
    border-bottom: 1px solid $dark-border
  }
  .body--light .profile-card {
    width: 100%;
    border-bottom: 1px solid $light-border
  }

  .body--dark .post-header {
    width: 100%;
    border-bottom: 1px solid $dark-border;
    border-top: 1px solid $dark-border;
  }
  .body--light .post-header {
    width: 100%;
    border-bottom: 1px solid $light-border;
    border-top: 1px solid $light-border;
  }

  .body--dark .show-more {
    margin-top: 15px;
    margin-bottom: 5px;
    padding-top: 14px;
    padding-bottom: 17px;
    border-top: 1px solid $dark-border;
    font-size: 90%
  }
  .body--light .show-more {
    margin-top: 15px;
    margin-bottom: 5px;
    padding-top: 14px;
    padding-bottom: 17px;
    border-top: 1px solid $light-border;
    font-size: 90%
  }
</style>
