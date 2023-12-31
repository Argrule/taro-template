import { View, Text } from '@tarojs/components'
import Taro,{useLoad} from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import o from '$/utils/request'
import "taro-ui/dist/style/components/button.scss" // 按需引入
import './login.scss'

export default function Login() {
    useLoad(() => {
      console.log('login page loaded')
    })

    return (
      <View className='login'>
        <Text>sign in！</Text>
        <AtButton type='primary' onClick={sayhi}>源神！ 启动！！</AtButton>
      </View>
    )
}

function sayhi() {
  Taro.login({
    success: async function (res) {
      if (res.code) {
        console.log("get jscode =======:",res.code)
        //发起网络请求
        const res_data = await o.post('/dev/sign/in',{code: res.code})
        Taro.setStorageSync("Authorization", res_data?.[1])
      } else {
        console.log('登录失败！' + res)
      }
    }
  })
}