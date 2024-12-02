import{S as h}from"./sweetalert2.esm.all-D3pEHXw3.js";import{_,a,c as r,b,d as t,t as i,k as g,F as u,r as y,g as f,o as d}from"./index-Bw4PRYnB.js";const x={data(){return{newContent:[],quantity:1,product:{},isLoading:!1,cartAdded:!1}},methods:{increase(){this.quantity++},decrease(){this.quantity>1&&this.quantity--},addToCart(c){a.post("https://vue3-course-api.hexschool.io/api/tingg-api/cart",{data:{product_id:c,qty:this.quantity}}).then(n=>{console.log("商品已加入購物車:",n),this.cartAdded=!0,h.fire({title:"成功",text:"商品已成功加入購物車",icon:"success"})}).catch(n=>{console.error("加入購物車失敗:",n)})}},mounted(){this.isLoading=!0;const s=`https://vue3-course-api.hexschool.io/api/tingg-api/product/${this.$route.params.ProductId}`;a.get(s).then(n=>{this.isLoading=!1,this.product=n.data.product,this.newContent=this.product.content.split(","),console.log(this.newContent)})}},v={class:"container mt-5 d-flex justify-content-center"},q={class:"d-flex flex-column flex-md-row"},C=["src"],w={class:"product-details ms-md-2 mt-3 mt-md-0"},k={class:"product-title mb-3 fw-bold"},L={class:"product-subtitle mb-3"},N={class:"d-flex"},T={key:0,class:"price mb-4 me-3"},B={class:"price text-danger mb-4"},S={class:"quantity-selector d-flex align-items-center"},V=["disabled"],A={class:"mx-3 quantity-display"},D={class:"mt-3"},F={class:"container"};function I(c,s,n,j,e,l){const p=f("Loading");return d(),r(u,null,[b(p,{active:e.isLoading,loader:"bars",color:"#e9e9d7"},null,8,["active"]),t("div",v,[t("div",q,[t("img",{src:e.product.imageUrl,class:"product-image me-5",alt:"商品圖片"},null,8,C),t("div",w,[t("h1",k,i(e.product.title),1),t("h6",L,i(e.product.description),1),s[4]||(s[4]=t("ul",{class:"list-unstyled"},[t("li",null,"物品狀況：全新"),t("li",null,"物品所在地: 新北市")],-1)),t("div",N,[e.product.origin_price>e.product.price?(d(),r("h5",T,[t("del",null,"NT$:"+i(e.product.origin_price),1)])):g("",!0),t("h5",B,"NT$:"+i(e.product.price),1)]),t("div",S,[s[3]||(s[3]=t("p",{class:"mt-3 me-2"},"數量:",-1)),t("button",{class:"btn btn-outline-secondary quantity-btn",onClick:s[0]||(s[0]=(...o)=>l.decrease&&l.decrease(...o)),disabled:e.quantity<=1}," - ",8,V),t("span",A,i(e.quantity),1),t("button",{class:"btn btn-outline-secondary quantity-btn",onClick:s[1]||(s[1]=(...o)=>l.increase&&l.increase(...o))}," + ")]),t("div",D,[t("button",{class:"btn btn-outline-secondary add-to-cart-btn",onClick:s[2]||(s[2]=o=>l.addToCart(e.product.id))}," 加入購物車 ")])])])]),t("div",F,[s[5]||(s[5]=t("hr",null,null,-1)),s[6]||(s[6]=t("h2",{class:"fw-bold my-3"},"商品規格",-1)),t("ol",null,[(d(!0),r(u,null,y(e.newContent,(o,m)=>(d(),r("li",{key:m},[t("p",null,i(o),1)]))),128))]),s[7]||(s[7]=t("h2",{class:"fw-bold my-3"},"購物須知",-1)),s[8]||(s[8]=t("ol",null,[t("li",null,[t("p",null," 商品圖片為實物拍攝，因拍攝光線、顯示器差異等因素，商品圖片可能會與實際商品略有不同，實際顏色以收到商品為準。 ")]),t("li",null,[t("p",null," 訂單確認後，商品將於1-3個工作天內處理並安排出貨。若遇上假日或特殊情況（如節慶促銷），處理時間可能會稍有延遲。 ")]),t("li",null,[t("p",null,"商品尺寸為手工測量，可能有±2公分的誤差，請確認所需尺寸後再下單。")]),t("li",null,[t("p",null," 消費滿一定金額可享免運優惠，未達標準之訂單則需支付相應運費，具體標準請參考網站配送政策。 ")]),t("li",null,[t("p",null," 我們提供完整的售後服務，若在商品使用過程中遇到任何問題，歡迎隨時聯繫客服，我們將盡力協助解決。 ")])],-1))])],64)}const U=_(x,[["render",I],["__scopeId","data-v-ce7a970c"]]);export{U as default};