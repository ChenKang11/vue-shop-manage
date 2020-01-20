<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png">
      </div>
      <!--登录表单区域-->
      <el-form ref="loginFormRef" :rules="loginFormRules" :model="loginForm" class="login_form" label-width="0px">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-s-custom"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-s-goods"></el-input>
        </el-form-item>
        <!--按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名长度在3到10个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在6到15个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginFrom () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$https.post('user/login', qs.stringify(this.loginForm))
          console.log(qs.stringify(this.loginForm))
          console.log(res)
          if (res.code === 200) {
            this.$message.success('登录成功')
            // 将token保存到sessionStorage
            window.sessionStorage.setItem('token', res.result)
            this.$router.push('/home')
          } else {
            this.$message.error('登录失败')
          }
          // 第二种
          // let params = new URLSearchParams()
          // params.append('username', this.loginForm.username)
          // params.append('password', this.loginForm.password)
          // console.log(params)
          // const result = this.$https.post('user/login', params)
          // 第三种
          // this.$https.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
          // const result = this.$https.post('user/login', qs.stringify(this.loginForm))
          // console.log(result)
          // 第四种
          // let data = this.loginForm
          // const result = this.$https.post('user/login', qs.stringify(data), {
          //   headers: {
          //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          //   }
          // })
          // console.log(qs.stringify(data))
          // console.log(result)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login_container{
    background-color: #2b4b6b;
    height: 100%;
  }
  .login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .btns{
    display: flex;
    justify-content: flex-end;
  }
  .login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
</style>
