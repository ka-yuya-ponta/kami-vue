<template>
  <div>
    <div class="left-padding">
      <span class="logo"  >share</span>
      <div class="flex icon-field" @click="$router.push('/')">
        <span class="material-icons" >home</span>
        <p>ホーム</p>
      </div>
      <div class="flex icon-field" @click="logout">
        <span class="material-icons">logout</span>
        <p>ログアウト</p>
      </div>
    </div>
    <div class="share">
      <p>シェア</p>
      <textarea v-model="content"></textarea>
      <button @click="send">シェアする</button>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  data() {
    return {
      content: "",
    };
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
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("ログアウトが完了しました");
          this.$router.replace("/login");
        });
    },
    send() {
      if (!this.content) {
        alert("シェアする内容を入力してください");
      } else {
        firebase.auth().onAuthStateChanged((user) => {
          this.$axios
            .post("http://localhost:8000/api/v1/post", {
              user_id: user.uid,
              content: this.content,
            })
            .then(() => {
              alert("シェアしました");
              this.content = "";
              this.$emit("getPost");
            });
        });
      }
    },
  },
};
</script>


<style scoped>
div {
  color: white;
}
.left-padding {
  margin: 20px;
}
.flex {
  display: flex;
  align-items: center;
}
.logo {
  width: 100px;
}
.icon-field {
  margin-top: 15px;
  cursor: pointer;
}
.icon {
  width: 25px;
}
.icon-field p {
  font-size: 16px;
  padding-left: 15px;
}
.share {
  margin: 15px;
}
.share textarea {
  width: 95%;
  height: 120px;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid white;
  background-color: #15202b;
  color: white;
  resize: none;
}
button {
  width: 100px;
  text-align: center;
  padding: 8px 0 10px;
  color: #fff;
  background-color: #5419da;
  border-radius: 25px;
  display: block;
  margin: 0 0 0 auto;
  cursor: pointer;
}
</style>
