<template>
  <div class="flex">
    <div class="left">
      <SideNavi @getPost="getData" />
    </div>
    <div class="right">
      <div class="title">
        <p>ホーム</p>
      </div>
      <Message :posts="posts" :uid="uid" />
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {

  data() {
    return {
      posts: [],
      uid: null,
    };
  },
  methods: {
    async getPostData() {
      const { data } = await this.$axios.get(
        "http://localhost:8000/api/v1/post"
      );
      const posts = data.data;
      return posts;
    },
    async getLikeCount(posts) {
      for (let i = 0; i < posts.length; i++) {
        const { data } = await this.$axios.get(
          "http://localhost:8000/api/v1/like/count",
          {
            params: {
              post_id: posts[i].id,
            },
          }
        );
        posts[i].like_count = data.count;
      }
      return posts;
    },
    async getHasLike(posts) {
      for (let i = 0; i < posts.length; i++) {
        const { data } = await this.$axios.get(
          "http://localhost:8000/api/v1/like",
          {
            params: {
              post_id: posts[i].id,
              user_id: this.uid,
            },
          }
        );
        posts[i].has_like = data.result;
      }
      this.posts = posts;
    },
    getData() {
      firebase.auth().onAuthStateChanged(async (user) => {
        this.uid = user.uid;
        let posts = await this.getPostData();
        posts = await this.getLikeCount(posts);
        await this.getHasLike(posts);
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
.left {
  width: 22%;
  height: 100vh;
}
.right {
  width: 78%;
  height: 100vh;
}
.flex {
  display: flex;
    background-color: black;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  color: white;
}
.title {
  border-bottom: 1px solid white;
  border-left: 1px solid white;
  padding: 15px;
}
.title p {
  font-size: 20px;
  font-weight: bold;
}
</style>

