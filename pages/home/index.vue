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
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
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
              <li v-for="item of pageCount" :key="item" class="page-item" :class="{active: item === page}">
                <nuxt-link class="page-link" :to="`?page=${item}`">{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>

        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getArticles } from '@/api/article'

export default {
  name: 'Home',
  async asyncData({ query }) {
    const page = Number.parseInt(query.page) || 1
    const limit = 20
    const offset = (page - 1) * 20
    const { data } = await getArticles({ offset, limit })
    return {
      page,
      limit,
      offset,
      pageCount: Math.ceil(data.articlesCount / limit),
      articles: data.articles,
      articlesCount: data.articlesCount
    }
  },
  data() {
    return {
    }
  },
  watchQuery: ['page'],
  methods: {}
}
</script>

<style scoped lang="scss">

</style>
