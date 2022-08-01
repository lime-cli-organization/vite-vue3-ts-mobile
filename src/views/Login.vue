
<template>
  <div class="wrapper">
    <van-cell-group>
      <van-field v-model="loginForm.username" label="文本" placeholder="请输入用户名" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="loginForm.password" label="文本" placeholder="请输入用户名" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="loginForm.code" center clearable label="验证码" placeholder="请输入验证码">
        <template #button>
          <img :src="`data:image/png;base64,${imageState.image.fileContents}`" alt="">
        </template>
      </van-field>
    </van-cell-group>
    <van-button size="small" type="primary" @click="login()">发送验证码</van-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { GetImageCode, Login } from "@/apis/Authorize";
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/User'

const router = useRouter();
const userStore = useUserStore();

const loginForm = reactive({
  username: '',
  password: '',
  code: '',
  key: ''
})
const imageState = reactive({
  image: {
    fileContents: '',
    contentType: ''
  }
})

onMounted(async () => {
  // userStore.logOut();
  await getImageCode();
})

const getImageCode = async () => {
  const { data: { image, key } } = await GetImageCode();
  loginForm.key = key;
  imageState.image = image
}

const login = async () => {
  const { data: token } = await Login(loginForm)
  userStore.setToken(token[0]);
  userStore.setBindInfo();
  router.push({
    path: '/index'
  })
}


</script>

<style lang="less" scoped>
.wrapper {
  background-color: aliceblue;
  width: 100vw;
  height: 100vh;
  padding-top: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    width: 180px;
  }

  :deep(.van-cell-group) {
    width: 300px;
    margin-bottom: 12px;

    &:first-of-type {
      margin-top: 15vh;
    }
  }
}
</style>
