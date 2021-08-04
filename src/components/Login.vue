<template>
  <div>
      <section class="main">
        <div class="logo text-center">
            <h1> <a href="index.html">后台商城管理系统</a></h1>
        </div>
        <div class="content-w3ls text-center">
            <img src="/images/admin.png" alt="" class="img-responsive">
            <el-form ref="form" :model="userInfo" label-width="auto"  >
                <el-form-item  class="wthree-field">
                    <el-input placeholder="用户名" v-model="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item  class="wthree-field">
                    <el-input type="password" placeholder="密码" v-model="userInfo.password"></el-input>
                </el-form-item>
                <el-form-item  class="wthree-field">
                    <div >
                        <el-input style="width:60%;height:100%" placeholder="验证码" v-model="userInfo.code"></el-input>
                        <img class="img-responsive" :src="base64Img" @click="getImg" style="width:40%;height:100%"/>
                    </div>
                    
                </el-form-item>
                <el-form-item class="wthree-field">
                    <el-button  class="btn" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name:'Login',
    data() {
        return {
            userInfo:{
                username:'',
                password:'',
                code:'',
                key:''
            },
            base64Img:''
        }
    },
    methods: {
        ...mapMutations(['changeLogin','setLoginUser']),
        login(){
            const _this = this;
            
            let param = new URLSearchParams();
            param.append("username",this.userInfo.username);
            param.append("password",this.userInfo.password);
            param.append("code",this.userInfo.code);
            param.append("key",this.userInfo.key);
            this.$axios.post('http://localhost:8082/login',param)
            .then(function (response) {
                console.log("登录返回",response)
                if(response.data.data.code==400){
                    this.$message.error(response.data.data.msg)
                    _this.$router.push('/login');
                }else{
                    // 将用户token保存到vuex中
                    _this.userToken = 'Bearer ' + response.headers.authorization
                    _this.changeLogin({ Authorization: _this.userToken });
                    console.log("登录成功")
                    _this.setLoginUser({username:response.data.data,token:_this.userToken})
                    _this.$store.commit('setLoginUser',{username:response.data.data,token:_this.userToken})
                    _this.$router.push('/home');
                }
            })
            .catch(function (error) {
                console.log("登录错误返回",error);
                _this.$router.push('/login');
            })
        },
        getImg() {
            const _this = this;
            this.$axios.get('http://127.0.0.1:8082/captcha')
            .then(function (response) {
                console.log(response)
                _this.base64Img = response.data.data.base64Img
                _this.userInfo.key = response.data.data.key
            })
            .catch(function (error) {
            })
        }
    },
    mounted() {
        this.getImg()
    },
}
</script>

<style scope>

/* reset code */
html {
    scroll-behavior: smooth;
}

body,
html {
    margin: 0;
    padding: 0;
    color: #585858;
}

* {
    box-sizing: border-box;
    font-family: 'Noto Sans JP', sans-serif;
}

/*  wrapper */
.wrapper {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}

@media (min-width: 576px) {
    .wrapper {
        max-width: 540px;
    }
}

@media (min-width: 768px) {
    .wrapper {
        max-width: 720px;
    }
}

@media (min-width: 992px) {
    .wrapper {
        max-width: 960px;
    }
}

@media (min-width: 1200px) {
    .wrapper {
        max-width: 1140px;
    }
}

/*  /wrapper */

.d-grid {
    display: grid;
}

button,
input,
select {
    -webkit-appearance: none;
    outline: none;
}

button,
.btn,
select {
    cursor: pointer;
}

a {
    text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol {
    margin: 0;
    padding: 0;
}

body {
    background: #f1f1f1;
    margin: 0;
    padding: 0;
}

form,
fieldset {
    border: 0;
    padding: 0;
    margin: 0;
}

body a:hover {
    text-decoration: none;
}

.clearfix {
    clear: both;
}

/* content */

/*
  Responsive form elements
  Flexbox layout
*/

/*/////////////// GLOBAL STYLES ////////////////////*/

body {
    font-family: 'Noto Sans JP', sans-serif;
}
.main {
    background-image: url(/images/bg.jpg) no-repeat bottom;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    -ms-background-size: cover;
    min-height: 100vh;
    padding: 2em 0;
    position: relative;
    z-index: 1;
    justify-content: center;
    display: grid;
    align-items: center;
}
.main:before {
    position: absolute;
    content:'';
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: -1;
}
.text-center {
    text-align: center;
}

/*/////////////// FONT STYLES ////////////////////*/

.content-w3ls {
    margin: 2em auto;
    padding: 2em 2em;
}

.logo h1 a {
    font-size: 42px;
    color: #fff;
    text-transform: capitalize;
    font-weight: 700;
}
/*/////////////// FORM STYLES ////////////////////*/
.wthree-field {
    margin-bottom:14px;
}
.wthree-field input {
    padding: 14px 30px;
    font-size: 16px;
    color: #999;
    letter-spacing: 0.5px;
    border: 1px solid #e1e1e1;
    background: #fff;
    box-sizing: border-box;
    font-family: 'Noto Sans JP', sans-serif;
    width: 100%;
    border-radius: 35px;
    -webkit-border-radius: 35px;
    -moz-border-radius: 35px;
    -ms-border-radius: 35px;
    -o-border-radius: 35px;
}

::-webkit-input-placeholder { /* Edge */
    color: #999;
  }
  
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color:  #999;
  }
  
  ::placeholder {
    color: #999;
  }

.wthree-field .btn {
    background: #EA4C89;
    border: none;
    color: #fff;
    padding: 14px 14px;
    text-transform: uppercase;
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 16px;
	width:100%;
    letter-spacing:1px;
    outline: none;
    cursor: pointer;
    transition: 0.5s all;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    -o-transition: 0.5s all;
    -ms-transition: 0.5s all;
    border-radius: 35px;
	-webkit-border-radius: 35px;
	-moz-border-radius: 35px;
	-ms-border-radius: 35px;
    -o-border-radius: 35px;

}
.wthree-field button.btn:hover {
    background:#de3d7b;
}

.login-bottom a {
    font-size: 16px;
    color: #fff;
    font-weight: normal;
    letter-spacing: 1px;
    padding: 0 5px;
    text-transform: capitalize;
}


/* -- Responsive code -- */
@media screen and (max-width: 1280px) {
}
@media screen and (max-width: 1080px) {
}
@media screen and (max-width: 900px) {
}
@media screen and (max-width: 800px) {
}
@media screen and (max-width: 768px) {
	.logo h1 a {
		font-size: 30px;
	}
}
@media screen and (max-width: 668px) {

}
@media screen and (max-width: 600px) {
}
@media screen and (max-width: 568px) {
}

@media screen and (max-width: 480px) {
    
}

@media screen and (max-width: 415px) {
	.logo {
		margin-bottom: 10px;
    }
    .content-w3ls {
        padding: 2em 2em;
    }
}

@media screen and (max-width: 384px) {
    .content-w3ls {
        padding: 1em 1em;
        margin: 1em auto;
    }
}

@media screen and (max-width: 375px) {
    
}
@media screen and (max-width: 320px) {
    
}

/* -- //Responsive code -- */
</style>