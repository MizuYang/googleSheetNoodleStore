(function(){"use strict";var t={6259:function(t,e,n){var a=n(9242),o=(n(8937),n(6265)),r=n.n(o),s=n(6423),c=n(3396),i=n(7139);const u={class:"container mt-3"},d=(0,c._)("h1",{class:"w-100 text-center bg-info"},"菜單",-1),l={class:"row row-cols-2 mb-5"},p={class:"card-body text-center"},h=["onClick"],f={key:0,class:"d-flex justify-content-center align-items-center flex-column"},y=(0,c._)("h1",{class:"w-100 text-center bg-info"},"購物車",-1),b={class:"d-flex flex-wrap justify-content-center"},m={class:"card-body p-0"},w=["onClick"],v={key:0,class:"text-success"},k=(0,c._)("br",null,null,-1),g={key:1},D=["onClick","disabled"],q=["onClick"],$=["onClick"],O={key:0,class:"text-center sendCard-success py-3"};function _(t,e,n,o,r,s){return(0,c.wg)(),(0,c.iD)("div",u,[d,(0,c._)("div",l,[((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)(r.foodName,(t=>((0,c.wg)(),(0,c.iD)("div",{class:"card",key:t},[(0,c._)("div",p,[(0,c._)("button",{class:"btn stretched-link",type:"button",onClick:e=>s.order(t)},(0,i.zw)(t)+" $"+(0,i.zw)(r.menu[t]),9,h)])])))),128))]),s.hasProducts?((0,c.wg)(),(0,c.iD)("div",f,[y,(0,c._)("h2",null,"消費總金額："+(0,i.zw)(s.computedTurnover()),1),(0,c._)("div",b,[((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)(r.cartData,((t,e,n)=>(0,c.wy)(((0,c.wg)(),(0,c.iD)("div",{class:"card border-l mb-2 mx-1",key:`${e}${n}`},[(0,c._)("div",m,[(0,c._)("button",{type:"button",class:"btn w-100 p-3 fs-5 text-center",onClick:t=>s.order(e)},[(0,c.Uk)((0,i.zw)(e)+" "+(0,i.zw)(t.qty)+"個 ",1),t.update>0?((0,c.wg)(),(0,c.iD)("span",v,"[加大 * "+(0,i.zw)(t.update)+" / $"+(0,i.zw)(t.update*r.menu["加大"])+"]",1)):(0,c.kq)("",!0),k,(0,c.Uk)(" 小計：$"+(0,i.zw)(r.menu[e])+" * "+(0,i.zw)(t.qty)+" ",1),t.update>0?((0,c.wg)(),(0,c.iD)("span",g,"+ $"+(0,i.zw)(r.menu["加大"])+" * "+(0,i.zw)(t.update),1)):(0,c.kq)("",!0),(0,c.Uk)(" = $"+(0,i.zw)(r.menu[e]*t.qty+t.update*r.menu["加大"])+" 元 ",1)],8,w)]),(0,c._)("div",null,[(0,c._)("button",{type:"button",class:"btn btn-secondary border-top-m border-end-m w-50 p-3 fs-5",onClick:t=>s.cancelUpdateFood(e),disabled:0===t.update},"取消加大",8,D),(0,c._)("button",{type:"button",class:"btn btn-success border-top-m w-50 p-3 fs-5",onClick:t=>s.updateFood(e)},"加大 $"+(0,i.zw)(r.menu["加大"]),9,q),(0,c._)("button",{type:"button",class:"btn btn-danger border-top-m w-100 p-3 fs-5",onClick:t=>s.deleteFood(e)},"刪除",8,$)])])),[[a.F8,"日期"!==e&&t.qty>0]]))),128))]),(0,c._)("button",{type:"button",onClick:e[0]||(e[0]=(...t)=>s.checkout&&s.checkout(...t)),class:"btn btn-primary d-block mx-auto"},"結帳")])):(0,c.kq)("",!0),(0,c._)("div",null,[!s.hasProducts&&r.isSendCart?((0,c.wg)(),(0,c.iD)("h3",O,"訂單已成功送出！！")):(0,c.kq)("",!0)])])}var x={computed:{hasProducts(){let t=null;return Object.keys(this.cartData).forEach((e=>{this.cartData[e].qty>0&&(t=!0)})),t}},data(){return{foodName:["泡菜","咖哩","粥","酸白菜"],cartData:{"泡菜":{qty:0,update:0},"咖哩":{qty:0,update:0},"粥":{qty:0,update:0},"酸白菜":{qty:0,update:0}},menu:{},cartTotal:0,isSendCart:!1,id:"1ofK-ON44gebNvnyanCFQD4Shd9sIwd5cHM4SJMJgyDM",apiKey:"AIzaSyDXvay-J2Cc6wpt1reGz6mtk9Q2CkLjoss",sheetBaseUrl:"https://sheets.googleapis.com/v4/spreadsheets/",sendSheetUrl:"https://script.google.com/macros/s/AKfycbz_RZDsODdddFj9Cat8JGrDMfTDFfBmybNPfUSM2XqeXnjEr7iqoNASIeZcwUyltG9V/exec"}},methods:{order(t){this.cartData[t].qty++},async checkout(){const t=new Date((new Date).getTime()+288e5).toISOString().split("T")[0].split("-"),e=`${t[0]}年${t[1]}月${t[2]}日`;let n=0;const a=[];Object.keys(this.cartData).forEach((t=>{a.push(`${t}=${this.cartData[t].qty}`),this.cartData[t].update&&(n+=this.cartData[t].update)}));const o=this.computedTurnover();this.cartTotal=o;const r=`?日期=${e}&${a.join("&")}&加大次數=${n}&每日營業額=${o}`;this.$http.post(`${this.sendSheetUrl}${r}`).then((t=>{this.isSendCart=!0,this.cartData={"泡菜":{qty:0,update:0},"咖哩":{qty:0,update:0},"粥":{qty:0,update:0},"酸白菜":{qty:0,update:0}}})).catch((t=>{console.log(t)}))},deleteFood(t){this.cartData[t].qty>=0&&(this.cartData[t].qty--,this.cartData[t].update=0,this.isSendCart=!1)},updateFood(t){this.cartData[t].update++},cancelUpdateFood(t){0!==this.cartData[t].update&&this.cartData[t].update--},computedTurnover(){let t=0,e=0;return Object.keys(this.cartData).forEach((e=>{if(this.cartData[e].qty){const n=this.cartData[e].qty*parseInt(this.menu[e]);t+=n}})),Object.keys(this.cartData).forEach((t=>{this.cartData[t].update&&(e+=this.cartData[t].update)})),e&&(t+=e*this.menu["加大"]),parseInt(t)},getMenuPrice(){return new Promise(((t,e)=>{const n="菜單";this.$http.get(`${this.sheetBaseUrl}${this.id}/values/${n}?alt=json&key=${this.apiKey}`).then((t=>{const e=t.data.values[0],n=t.data.values[1];for(let a=1;a<=e.length;a++){if(!e[a])break;this.menu[e[a]]=n[a]}})).catch((t=>{console.log(t)}))}))}},async mounted(){this.menu=await this.getMenuPrice()}},C=n(89);const j=(0,C.Z)(x,[["render",_]]);var S=j;const z=(0,a.ri)(S);z.use(s.Z,r()),z.mount("#app")}},e={};function n(a){var o=e[a];if(void 0!==o)return o.exports;var r=e[a]={id:a,loaded:!1,exports:{}};return t[a](r,r.exports,n),r.loaded=!0,r.exports}n.m=t,function(){n.amdO={}}(),function(){var t=[];n.O=function(e,a,o,r){if(!a){var s=1/0;for(d=0;d<t.length;d++){a=t[d][0],o=t[d][1],r=t[d][2];for(var c=!0,i=0;i<a.length;i++)(!1&r||s>=r)&&Object.keys(n.O).every((function(t){return n.O[t](a[i])}))?a.splice(i--,1):(c=!1,r<s&&(s=r));if(c){t.splice(d--,1);var u=o();void 0!==u&&(e=u)}}return e}r=r||0;for(var d=t.length;d>0&&t[d-1][2]>r;d--)t[d]=t[d-1];t[d]=[a,o,r]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.hmd=function(t){return t=Object.create(t),t.children||(t.children=[]),Object.defineProperty(t,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+t.id)}}),t}}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,a){var o,r,s=a[0],c=a[1],i=a[2],u=0;if(s.some((function(e){return 0!==t[e]}))){for(o in c)n.o(c,o)&&(n.m[o]=c[o]);if(i)var d=i(n)}for(e&&e(a);u<s.length;u++)r=s[u],n.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return n.O(d)},a=self["webpackChunkvue_template"]=self["webpackChunkvue_template"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(6259)}));a=n.O(a)})();
//# sourceMappingURL=app.6e155ac3.js.map