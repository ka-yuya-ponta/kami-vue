<template>
  <div class="header flex">
    <div class="left">
     <h1>share</h1>
    </div>
    <div class="right flex">
      <p @click="$router.push('/register')">新規登録</p>
      <p @click="$router.push('/login')">ログイン</p>
    </div>
  </div>
</template>

<style scoped>
div {
  color: white;
}
.right {
  align-items: center;
}
.right p {
  margin-right: 20px;
  cursor: pointer;
}
.header {
  margin: 20px;
}
h1 {
  width: 150px;
  cursor: pointer;
}
.flex {
  display: flex;
  justify-content: space-between;
}
</style>