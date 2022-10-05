<template>
  <div class="container mt-3">
    <h1 class="w-100 text-center bg-info">菜單</h1>
    <div class="row row-cols-2 mb-5">
      <div class="card" v-for="foodName in foodName" :key="foodName">
        <div class="card-body text-center">
          <button class="btn stretched-link" type="button" @click="order(foodName)">{{ foodName }} ${{ menu[foodName] }}</button>
        </div>
      </div>
    </div>

    <!-- 購物車 -->
    <div class="d-flex justify-content-center align-items-center flex-column" v-if="hasProducts">
      <h1 class="w-100 text-center bg-info">購物車</h1>

      <h2>消費總金額：{{ computedTurnover() }}</h2>

      <div class="d-flex flex-wrap justify-content-center">
        <div class="card border-l mb-2 mx-1" v-for="(val,food,index) in cartData" :key="`${food}${index}`" v-show="food!=='日期' && val.qty>0">
          <div class="card-body p-0">
            <button type="button" class="btn w-100 p-3 fs-5 text-center" @click="order(food)">{{ food }}
              {{ val.qty }}個
              <span class="text-success" v-if="val.update>0">[加大 * {{ val.update }} / ${{ val.update*menu['加大'] }}]</span>
              <br>
              小計：${{ menu[food] }} * {{ val.qty }} <span v-if="val.update>0">+ ${{ menu['加大'] }} * {{ val.update }}</span> = ${{ menu[food] * val.qty + val.update*menu['加大']}} 元
            </button>
          </div>
          <div>
            <button type="button" class="btn btn-secondary border-top-m border-end-m w-50 p-3 fs-5" @click="cancelUpdateFood(food)" :disabled="val.update===0">取消加大</button>
            <button type="button" class="btn btn-success border-top-m w-50 p-3 fs-5" @click="updateFood(food)">加大 ${{ menu['加大'] }}</button>
            <button type="button" class="btn btn-danger border-top-m w-100 p-3 fs-5" @click="deleteFood(food)">刪除</button>
          </div>
        </div>
      </div>

    <!-- 結帳 -->
    <button type="button" @click="checkout" class="btn btn-primary d-block mx-auto">結帳</button>
    </div>

    <!-- 結帳回饋 -->
    <div>
      <h3 class="text-center sendCard-success py-3" v-if="!hasProducts && isSendCart">訂單已成功送出！！</h3>
    </div>

  </div>
</template>

<script>
export default {

  computed: {
    hasProducts () {
      let result = null
      Object.keys(this.cartData).forEach(item => {
        if (this.cartData[item].qty > 0) {
          result = true
        }
      })
      return result
    }
  },

  data () {
    return {
      foodName: ['泡菜', '咖哩', '粥', '酸白菜'],
      cartData: {
        泡菜: {
          qty: 0,
          update: 0
        },
        咖哩: {
          qty: 0,
          update: 0
        },
        粥: {
          qty: 0,
          update: 0
        },
        酸白菜: {
          qty: 0,
          update: 0
        }
      },
      menu: {},
      cartTotal: 0,
      isSendCart: false,
      //* env
      id: process.env.VUE_APP_ID,
      apiKey: process.env.VUE_APP_API_KEY,
      sheetBaseUrl: process.env.VUE_APP_SHEET_BASE_URL,
      sendSheetUrl: process.env.VUE_APP_SEND_SHEET_URL
    }
  },

  methods: {
    //* 點餐
    order (foodName) {
      this.cartData[foodName].qty++
    },
    //* 結帳
    async checkout () {
      //* 取得當前日期 並減去 toISOString 的八小時時差
      const date = new Date(new Date().getTime() + 8 * 3600 * 1000).toISOString().split('T')[0].split('-')
      //* 日期
      const today = `${date[0]}年${date[1]}月${date[2]}日`
      //* 加大次數
      let updateCount = 0
      //* 處理表單 query 的陣列
      const arr = []

      Object.keys(this.cartData).forEach(queryItem => {
        arr.push(`${queryItem}=${this.cartData[queryItem].qty}`)

        //* 計算餐點加大的次數
        if (this.cartData[queryItem].update) {
          updateCount += this.cartData[queryItem].update
        }
      })

      //* 計算營業額
      const total = this.computedTurnover()
      this.cartTotal = total

      //* 組字串
      const queryStr = `?日期=${today}&${arr.join('&')}&加大次數=${updateCount}&每日營業額=${total}`

      //* 傳送資料到 google sheet
      this.$http.post(`${this.sendSheetUrl}${queryStr}`)
        .then(res => {
          this.isSendCart = true
          this.cartData = {
            泡菜: {
              qty: 0,
              update: 0
            },
            咖哩: {
              qty: 0,
              update: 0
            },
            粥: {
              qty: 0,
              update: 0
            },
            酸白菜: {
              qty: 0,
              update: 0
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //* 刪除產品
    deleteFood (food) {
      //* 數量不可以是負數的，所以判斷大於等於0
      if (this.cartData[food].qty >= 0) {
        this.cartData[food].qty--
        //* 加大的部分也清除
        this.cartData[food].update = 0
        //* 初始化
        this.isSendCart = false
      }
    },
    //* 食物加大
    updateFood (food) {
      this.cartData[food].update++
    },
    //* 取消加大
    cancelUpdateFood (food) {
      if (this.cartData[food].update === 0) return
      this.cartData[food].update--
    },
    //* 計算營業額
    computedTurnover () {
      //* 本次消費金額
      let currentTurnover = 0
      //* 加大次數
      let updateCount = 0

      Object.keys(this.cartData).forEach(keys => {
        if (this.cartData[keys].qty) {
          const price = this.cartData[keys].qty * parseInt(this.menu[keys])
          currentTurnover += price
        }
      })
      //* 計算餐點加大的次數
      Object.keys(this.cartData).forEach(queryItem => {
        if (this.cartData[queryItem].update) {
          updateCount += this.cartData[queryItem].update
        }
      })
      //* 算上加大的金額
      if (updateCount) {
        currentTurnover += updateCount * this.menu['加大']
      }

      //* 本次消費金額 加上 先前消費金額 = 每日營業額
      return parseInt(currentTurnover)
    },
    //* 取得菜單食物金額
    getMenuPrice () {
      return new Promise((resolve, reject) => {
        const sheetName = '菜單'

        this.$http.get(`${this.sheetBaseUrl}${this.id}/values/${sheetName}?alt=json&key=${this.apiKey}`)
          .then(res => {
            const foodName = res.data.values[0]
            const foodPrice = res.data.values[1]

            //* 處理表格食物品項、金額
            for (let i = 1; i <= foodName.length; i++) {
              if (!foodName[i]) break

              this.menu[foodName[i]] = foodPrice[i]
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    }

  },

  async mounted () {
    this.menu = await this.getMenuPrice()
  }

}
</script>

<style lang='scss' scope>
@import "@/assets/stylesheets/all.scss";
.border-l {
  border: 1px solid #000 !important;
}
.border-top-m {
  border-top: 1px solid #000 !important;
}
.border-end-m {
  border-right: 1px solid #000 !important;
}
.sendCard-success {
  background: green;
  color: #fff;
}
</style>
