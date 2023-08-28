<template>
    <div class="register-box">
        <div class="register-header">
            <div class="logo">
                <img src="../../../assets/images/logo.png" alt="Logo">
            </div>
            <h1>用户注册</h1>
        </div>
        <div class="register-content">
            <div class="content-row">
                <input type="text" placeholder="请输入手机号">
            </div>
            <div class="content-row">
                <input type="text" placeholder="请输入密码">
            </div>
            <div class="content-row" >
                <input type="text" placeholder="请确认密码">
            </div>
            <div class="content-row code-row">
                <input type="text" placeholder="请输入验证码">
                <button
                @click="handleSendCode"
                :class="{'btn-disabled': isSendCode}"
                >
                    {{ isSendCode ? '重发' + codeTime : codeBtnContent }}
                </button>
            </div>
            <div class="content-row register-row">
                <button>注册</button>
            </div>
            <div class="content-row login-row">
                <span @click="emit('changeBox', 'Login')">已有账号？</span>
                <span>第三方登录</span>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

import { ref } from 'vue';


const isSendCode = ref(false)
const codeBtnContent = ref("发送验证码")
const codeTime = ref(59) // 验证码倒计时
const emit = defineEmits<{
    (e: 'changeBox', key: string): void
}>()

const handleSendCode = async (): Promise<void> => {
    // 已发送不处理
    if(isSendCode.value) {
        return
    }
    isSendCode.value = true

    const timeDecrease = (): Promise<void> => {
        return new Promise((reslove: Function) => {
            setTimeout(() => {
                reslove()
            }, 1000)
        })
    }

    while(codeTime.value > 0) {
        await timeDecrease()
        codeTime.value--
    }

    // 重新赋值
    isSendCode.value = false
    codeTime.value = 59

}

</script>


<style scoped lang="less">
.register-box {
    width: 500px;
    height: 550px;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 0 57px 0px rgb(52 120 246 / 33%);

    .register-header {
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
    .register-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        .content-row {
            width: 70%;
            margin: 0 auto;
            input {
                width: 100%;
                border: none;
                outline: none;
                border: 1px solid grey;
                padding: 10px 20px;
                border-radius: 5px;
            }
            input:focus {
                border-color: var(--theme-c-blue);
            }
        }
        .code-row {
            display: flex;
            gap: 20px;
            input {
                flex: 7;
            }
            button {
                flex: 3;
                border: 1px solid var(--title-c-normal-blue);
                font-size: 1rem;
                border-radius: 5px;
                color: var(--theme-c-blue);
            }
            button:hover {
                background-color: rgba(239, 253, 255, 0.834);
            }
            .btn-disabled {
                color: grey;
                border: none;
                background-color: rgba(207, 207, 207, 0.403) !important;
                cursor: auto;
            }

        }
        .register-row {
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
        .login-row {
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            color: grey;
        }
    }
}
</style>