<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="auth" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: (tab === 'your_feed') }"
                  :to="{ name: 'home', query: { tab: 'your_feed' } }"
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: (tab === 'global_feed') }"
                  :to="{ name: 'home', query: { tab: 'global_feed' } }"
                >
                  Global Feed
                </nuxt-link>
              </li>
              <li v-if="tab === 'tag'" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: (tab === 'tag') }"
                  :to="{ name: 'home', query: { tab: 'tab' } }"
                >
                  #{{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div v-for="article in articles" :key="article.slug" class="article-preview">
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: { username: article.author.username },
                }"
              >
                <img :src="article.author.image">
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: { username: article.author.username },
                  }"
                  class="author"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{active: article.favorited}">
                <i class="ion-heart" /> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{ name: 'article', params: {slug: article.slug} }" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <nav>
            <ul class="pagination">
              <li v-for="item of totalPage" :key="item" class="page-item" :class="{active: item === page}">
                <nuxt-link class="page-link" :to="`?page=${item}`">{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>

        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                v-for="tag of tags"
                :key="tag"
                :to="{ name: 'home', query: { tab: 'tag', tag } }"
                class="tag-pill tag-default"
              >
                {{ tag }}
              </nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  async asyncData({ query }) {
    const { tag, tab = 'global_feed' } = query
    const page = Number.parseInt(query.page) || 1
    const limit = 20
    const offset = (page - 1) * 20
    const [articleRes, tagRes] = await Promise.all([
      getArticles({ offset, limit }),
      getTags()
    ])

    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data

    return {
      page,
      limit,
      offset,
      articles,
      articlesCount,
      tags,
      tag,
      tab
    }
  },
  data() {
    return {
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    },
    ...mapState(['auth'])
  },
  watchQuery: ['page', 'tab', 'tag'],
  methods: {}
}
</script>

<style scoped lang="scss">

</style>
