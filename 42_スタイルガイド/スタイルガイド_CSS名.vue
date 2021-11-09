<template>
  <button class="button button-close">×</button>
</template>

<!-- `scoped` を使用 -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}

/* 要素だけのセレクタは避ける。低速になる */
button {
  background-color: red;
}

</style>

<!-- Using CSS modules -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}

</style>

<!-- BEM の慣例を使用 -->
<style>
.c-Button {
  border: none;
  border-radius: 2px;
}

.c-Button--close {
  background-color: red;
}
</style>