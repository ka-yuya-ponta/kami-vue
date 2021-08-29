<template>
  <div>
    <div v-for="(post, index) in posts" :key="post.id">
      <div class="message">
        <div class="flex">
          <p class="name">{{ post.user_name }}</p>
          <span
           class="material-icons"
            @click="like(post, index)"
          >favorite</span>
          <p class="number">
            {{ post.like_count }}
          </p>
          <span
            class="material-icons"
           
            @click="deletePost(post.id, index)"
          >highlight_off</span>
          <span
            class="material-icons"
            
            @click="
              $router.push({
                path: '/comment/' + post.id,
                params: { id: post.id },
              })
            "
            v-if="$route.name === 'index'"
          >reply</span>
        </div>
        <p class="text">{{ post.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posts: Array,
    uid: String,
  },
    head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons",
      },
    ],
  },
  methods: {
    async like(post, index) {
      const sendData = {
        post_id: post.id,
        user_id: this.uid,
      };
      if (!post.has_like) {
        const { data } = await this.$axios.post(
          "http://localhost:8000/api/v1/like",
          sendData
        );
        this.posts[index].like_count = data.count;
        this.posts[index].has_like = data.result;
      } else {
        const { data } = await this.$axios.delete(
          "http://localhost:8000/api/v1/like",
          {
            data: sendData,
          }
        );
        this.posts[index].like_count = data.count;
        this.posts[index].has_like = data.result;
      }
    },
    async deletePost(id, index) {
      await this.$axios.delete("http://localhost:8000/api/v1/post/" + id);
      this.posts.splice(index, 1);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>

.flex {
  display: flex;
  align-items: center;
}
.icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.detail {
  margin-left: 50px;
}
.message {
  padding: 20px;
  border-bottom: solid 1px white;
  border-left: solid 1px white;
}
.name {
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}
.text {
  margin-top: 10px;
}
.number {
  margin-left: 10px;
  margin-right: 10px;
}
</style>