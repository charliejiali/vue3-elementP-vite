<script setup lang="ts">
import type { ElForm } from 'element-plus'
import type { LocationQuery } from 'vue-router'
import defaultSettings from '@/settings'
import { validUsername } from '@/utils/validate'
import { useUserStore } from '@/stores/user'
import type { UserLogin } from '~/user'

const route = useRoute()
const router = useRouter()

function validateUsername(rule: any, value: any, callback: any) {
  if (!value) {
    return callback(new Error('请输入用户名'))
  }
  else {
    if (!validUsername(value)) {
      callback(new Error('请输入正确的用户名'))
    }
    else {
      callback()
    }
  }
}
function validatePassword(rule: any, value: any, callback: any) {
  if (!value) {
    return callback(new Error('请输入密码'))
  }
  else {
    if (value.length < 6) {
      callback(new Error('密码长度不能小于六位'))
    }
    else {
      callback()
    }
  }
}
const loginRules = reactive({
  username: [
    {
      required: true,
      validator: validateUsername,
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      validator: validatePassword,
      trigger: 'blur',
    },
  ],
})
const loginForm: UserLogin = reactive({
  username: 'admin',
  password: '123456',
})
const state: { otherQuery: { [propName: string]: string }, redirect: any } = reactive({
  otherQuery: {},
  redirect: undefined,
})
function getOtherQuery(query: LocationQuery) {
  return Object.keys(query).reduce((acc: any, cur: string) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}

watch(
  () => route.query,
  (query: LocationQuery) => {
    if (query) {
      state.redirect = query.redirect
      state.otherQuery = getOtherQuery(query)
    }
  },
  { immediate: true },
)

const loading = ref(false)
const userStore = useUserStore()

type FormInstance = InstanceType<typeof ElForm>
const refLoginForm = ref<FormInstance>()

async function handleLogin(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  await formEl.validate((valid: boolean): void => {
    loading.value = true
    if (valid) {
      userStore.login(loginForm).then(({ message }) => {
        loading.value = false
        ElMessage({ message, type: 'success' })
        router.push({ path: state.redirect || '/', query: state.otherQuery })
      })
        .catch((err) => {
          console.log('login error', err)
          loading.value = false
        })
    }
    else {
      console.log('error submit!!')
      loading.value = false
    }
  })
}

const passwordType = ref('password')
const refPassword: any = ref(null)
function showPwd() {
  if (passwordType.value === 'password') {
    passwordType.value = ''
  }
  else {
    passwordType.value = 'password'
  }
  nextTick(() => {
    refPassword.value.focus()
  })
}
</script>

<template>
  <div class="login-container">
    <el-form
      ref="refLoginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          {{ defaultSettings.title }}
        </h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="refPassword"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          @keyup.enter="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleLogin(refLoginForm)"
      >
        Login
      </el-button>

      <div style="position: relative">
        <div class="tips">
          <span>Username : admin</span>
          <span>Password : any</span>
        </div>
        <div class="tips">
          <span style="margin-right: 18px">Username : editor</span>
          <span>Password : any</span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (caret-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    .el-input__wrapper {
      width: 100%;
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      box-shadow: 0 0 0 1000px $bg inset !important;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
