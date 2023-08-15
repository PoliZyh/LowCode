<template>
    <div class="login-box">
        <div class="login-header">
            <div class="logo">
                <img src="../../../assets/images/logo.png" alt="Logo">
            </div>
            <h1>用户登录</h1>
        </div>
        <div class="login-content">
            <div class="content-row">

                <input type="text"
                v-model="loginForm.account"
                @focus="isFocusInput.account = true"
                @blur="isFocusInput.account = false"
                :class="isFocusInput.account || loginForm.account ? 'input-focus' : ''"
                >
                <div class="content-row-item">
                    <svg t="1691989442079" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4012" width="200" height="200"><path d="M642.8 531.8c64.3-42.6 106.9-115.4 106.9-198.1C749.7 202.6 643.1 96 512 96S274.3 202.6 274.3 333.7c0 82.7 42.6 155.6 106.9 198.1C215.8 582.9 96 727.7 96 898.3c0 16.4 13.3 29.7 29.7 29.7s29.7-13.3 29.7-29.7c0-180.2 159.9-326.9 356.6-326.9 196.6 0 356.6 146.6 356.6 326.9 0 16.4 13.3 29.7 29.7 29.7s29.7-13.3 29.7-29.7c0-170.6-119.8-315.4-285.2-366.5zM333.7 333.7c0-98.3 80-178.3 178.3-178.3s178.3 80 178.3 178.3S610.3 512 512 512s-178.3-80-178.3-178.3z" fill="#bfbfbf" p-id="4013"></path></svg>
                    <p
                    :class="isFocusInput.account || loginForm.account ? 'p-focus' : ''"
                    >账号</p>
                </div>
            </div>
            <div class="content-row">

                <input type="password"
                v-model="loginForm.password"
                @focus="isFocusInput.password = true"
                @blur="isFocusInput.password = false"
                :class="isFocusInput.password || loginForm.password ? 'input-focus' : ''"
                >
                <div class="content-row-item">
                    <svg t="1691990090349" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5234" width="200" height="200"><path d="M806.7 375.4h-78.8v-48c0-114.9-92.6-208-206.8-208-114.2 0-206.7 93.1-206.7 208v48h-78.8c-21.7 0-39.4 17.6-39.4 39.4v413.5c0 21.8 17.6 39.4 39.4 39.4h571.1c21.8 0 39.4-17.6 39.4-39.4V414.7c0-21.7-17.6-39.3-39.4-39.3z m-433.2-48c0-82.1 66.2-148.9 147.7-148.9 81.5 0 147.7 66.8 147.7 148.9v48H373.5v-48zM787 808.6H255.3V434.4H787v374.2z" fill="#bfbfbf" p-id="5235"></path><path d="M491.6 645.6v103.9c0 10.9 8.8 19.7 19.7 19.7H531c10.9 0 19.7-8.8 19.7-19.7V645.6c34.3-12.2 59.1-44.7 59.1-83.2 0-48.9-39.7-88.6-88.7-88.6-48.9 0-88.6 39.7-88.6 88.6 0.1 38.6 24.8 71 59.1 83.2z m29.6-112.7c16.3 0 29.6 13.2 29.6 29.5S537.5 592 521.2 592s-29.5-13.2-29.5-29.6c-0.1-16.3 13.2-29.5 29.5-29.5z" fill="#bfbfbf" p-id="5236"></path></svg>
                    <p
                    :class="isFocusInput.password || loginForm.password ? 'p-focus' : ''"
                    >密码</p>
                </div>
            </div>
            <div class="content-row code-row">
                <input type="text"
                class="code-input"
                v-model="loginForm.code"
                @focus="isFocusInput.code = true"
                @blur="isFocusInput.code = false"
                :class="isFocusInput.code || loginForm.code ? 'input-focus' : ''"
                >
                <div class="content-row-item">
                    <svg t="1691993954523" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6313" width="200" height="200"><path d="M511.92574 1023.975247C357.959389 1023.975247 71.50029 794.49855 71.50029 577.448076V163.162251c0-10.049894 8.416167-18.16902 18.837362-18.379424l24.95146-0.420808c0.953007 0 98.766196-1.967898 199.599304-41.895185 103.481725-40.843164 170.179849-87.936569 170.885322-88.419261l14.691162-10.421195a19.86463 19.86463 0 0 1 11.398956-3.601625 19.480951 19.480951 0 0 1 11.324696 3.539741l14.975826 10.507832c0.680719 0.482692 67.440727 47.526591 170.798685 88.419262 100.932121 39.927287 198.74531 41.895185 199.747825 41.895184l24.753432 0.420809c10.433572 0.210404 18.824985 8.32953 18.824986 18.379423l0.210404 414.285825c0 217.02572-286.508606 446.527171-440.6111 446.527171z m372.625797-812.568556c-37.860375-2.846645-117.516921-12.624251-200.267646-45.385419-84.557726-33.417134-146.725972-71.005221-172.358151-87.602398-25.557919 16.535293-87.763295 54.135757-172.296268 87.602398-82.602205 32.686908-162.03597 42.464514-200.416167 45.385419v366.041385c0 170.216979 249.576484 378.281957 372.712435 378.281957 47.724618 0 140.723264-38.726745 232.137691-123.767163 88.12222-81.909108 140.723264-177.07368 140.723264-254.490041z m-407.948946 435.660414a33.305744 33.305744 0 0 1-23.899439 10.049894 33.738929 33.738929 0 0 1-23.998453-10.037517l-101.674724-102.330691a34.345388 34.345388 0 0 1 0-48.269193 33.664668 33.664668 0 0 1 47.935022 0l77.738155 78.183717 196.269967-197.69329a33.590408 33.590408 0 0 1 47.910269 0 34.18449 34.18449 0 0 1 0 48.269194z m0 0" fill="#bfbfbf" p-id="6314"></path></svg>
                    <p
                    :class="isFocusInput.code || loginForm.code ? 'p-focus' : ''"
                    >验证码</p>
                </div>
                <canvas class="code-canvas" ref="codeCanvas" @click="drawCode"></canvas>
            </div>
            <div class="content-row btn-row">
                <button @click="handleLogin">登录</button>
            </div>
            <div class="content-row register-row">
                <span>
                    还没有账号？注册账号
                </span>
                <span>
                    忘记密码？
                </span>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue'

const isFocusInput = reactive({
    account: false,
    password: false,
    code: false
})
const loginForm = reactive({
    account: '',
    password: '',
    code: ''
})
const codeCanvas = ref<HTMLCanvasElement>()
const correctCode = ref<string[]>([]) // 正确的验证码


onMounted(() => {
    drawCode()
})

// 渲染验证码
const drawCode = (): void => {
    const canvasWidth = codeCanvas.value?.clientWidth || 0
    const canvasHeight = codeCanvas.value?.clientHeight || 0
    const context = codeCanvas.value?.getContext('2d')
    const sCode = "a,b,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
    const aCode = sCode.split(",");
    const alength = aCode.length;

    // 清空画布
    context?.clearRect(0, 0, canvasWidth * 3, canvasHeight * 3);

    // 清空正确的验证码
    correctCode.value.length = 0

    // 生成随机颜色
    const randomColor = (): string => {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        return `rgb(${r},${g},${b})`
    }

    // 生成四个随机字符
    for(let i = 0; i < 4; i++) {
        const indexCode = Math.floor(Math.random() * alength) // 获取随机数的索引值
        const deg = (Math.random() * 30 * Math.PI) / 180 // 获取小于30度随机的弧度值
        const txt = aCode[indexCode] // 获取该字符
        correctCode.value.push(txt) // 保存正确的验证码

        const x = 10 + i * 60 // 字符的x坐标
        const y = 90 + Math.random() * 10 // 字符的y坐标

        if (context) {
            context.font = "bold 6rem 微软雅黑" // 设置字体
            context.translate(x, y);
            context.rotate(deg);
            context.fillStyle = randomColor();
            context.fillText(txt, 0, 0);
            context.rotate(-deg);
            context.translate(-x, -y);
        } else {
            ElMessage({
                message: '验证码画布创建失败',
                type: 'error',
            })
        }
    }

    //验证码上显示6条线条
    for (var i = 0; i <= 5; i++) {
        if (context) {
            context.strokeStyle = randomColor();
            context.beginPath();
            context.moveTo(
            Math.random() * canvasWidth * 2 + 30,
            Math.random() * canvasHeight * 2 + 30
            );
            context.lineTo(
            Math.random() * canvasWidth * 2 + 30,
            Math.random() * canvasHeight * 2 + 30
            );
            context.stroke();
        } else {
            ElMessage({
                message: '验证码画布创建失败',
                type: 'error',
            })
        }

      }
      //验证码上显示31个小点
      for (var i = 0; i <= 30; i++) {
        if (context) {
            context.strokeStyle = randomColor();
            context.beginPath();
            var x = Math.random() * canvasWidth * 2 + 30;
            var y = Math.random() * canvasHeight * 2 + 30;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        } else {
            ElMessage({
                message: '验证码画布创建失败',
                type: 'error',
            })
        }
      }

}

const isValid = (): boolean => {
    if (loginForm.code !== correctCode.value.join("")) {
        ElMessage({
            message: '验证码错误',
            type: 'error',
        })
        console.log(false);

        return false
    }
    console.log(true);

    return true
}


const handleLogin = (): void => {
    if (!isValid()) {
        return;
    }
    // axios
}

</script>


<style scoped lang="less">
.login-box {
    width: 500px;
    height: 550px;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 0 57px 0px rgb(52 120 246 / 33%);
    .login-header {
        width: 100%;
        .logo {
            display: flex;
            justify-content: center;
            flex-wrap: nowrap;
            transform: translateY(-30%);
            img {
                height: 150px;
            }
        }
        h1 {
            text-align: center;
            transform: translateY(-100%);
            font-size: 1.6rem;
            position: relative;
        }
        h1::before {
            content: '';
            position: absolute;
            width: 20%;
            height: 2px;
            background-color: rgba(186, 186, 186, 0.543);
            left: 15%;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 10px;
        }
        h1::after {
            content: '';
            position: absolute;
            width: 20%;
            height: 2px;
            background-color: rgba(186, 186, 186, 0.543);
            right: 15%;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 10px;
        }
    }
    .login-content {
        display: flex;
        flex-direction: column;
        gap: 30px;
        .content-row {
            width: 80%;
            margin: 0 auto;
            position: relative;
            .content-row-item {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 10px;
                position: absolute;
                top: 50%;
                left: 10px;
                transform: translateY(-50%);
                .icon {
                    height: 25px;
                    width: 25px;
                }
                p {
                    position: relative;
                    transition: all 0.3s ease-in-out;
                    top: 0;
                    left: 0;
                    z-index: -1;
                    background-color: transparent;
                    padding: 0 10px;
                }
                .p-focus {
                    position: relative;
                    top: -25px;
                    left: 40px;
                    z-index: 10;
                    background-color: #fff;
                    color: rgb(86, 165, 255);
                }
            }
            input {
                padding: 15px 40px;
                background-color: transparent;
                width: 100%;
                font-size: 1.2rem;
                position: relative;
                z-index: 1;
                border: 1px solid transparent;
                outline: none;
                border-bottom: 1px solid rgb(195, 195, 195);
                transition: all 0.3s ease-in-out;
            }

            .input-focus {
                border-radius: 5px;
                position: unset;
                border-color: rgb(86, 165, 255);
            }

        }
        .code-row {
            .code-canvas {
                position: absolute;
                width: 130px;
                height: 51px;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                z-index: 10;
                cursor: pointer;
            }
            .code-input {
                width: 60%;
            }
        }
        .btn-row {
            button {
                background-color: rgb(46, 171, 255);
                color: white;
                width: 100%;
                padding: 14px;
                border-radius: 5px;
            }
            button:hover {
                opacity: 0.8;
            }
        }
        .register-row {
            display: flex;
            justify-content: space-between;
            color: grey;
            margin-top: -10px;
            span {
                cursor: pointer;
            }
        }
    }
}
</style>