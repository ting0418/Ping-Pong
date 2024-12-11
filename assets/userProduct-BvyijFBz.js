import{_ as f,o as a,c as r,a as L,f as s,F as b,r as P,n as x,t as l,b as m,d as u,g as C,v as k,h as g,l as $}from"./index-DVcwlKcb.js";import{S as I}from"./swiper-bundle-CUnLjt9d.js";import{P as S}from"./Pagination-BUqklkKj.js";import{S as h}from"./sweetalert2.esm.all-D3pEHXw3.js";const T="/Ping-Pong/assets/2-wyFgniOD.webp",F="/Ping-Pong/assets/3-DObRXOAT.jpg",N={mounted(){new I(".swiper",{speed:400,spaceBetween:100,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!0},loop:!0,autoplay:{delay:3e3,disableOnInteraction:!1}})}},O={class:"swiper"};function B(t,e,n,p,c,o){return a(),r("div",O,e[0]||(e[0]=[L('<div class="swiper-wrapper" data-v-be2ca4ed><div class="swiper-slide" data-v-be2ca4ed><img src="'+T+'" alt="" data-v-be2ca4ed></div><div class="swiper-slide" data-v-be2ca4ed><img src="'+F+'" alt="" data-v-be2ca4ed></div></div><div class="swiper-pagination" data-v-be2ca4ed></div><div class="swiper-button-next" data-v-be2ca4ed></div><div class="swiper-button-prev" data-v-be2ca4ed></div>',4)]))}const j=f(N,[["render",B],["__scopeId","data-v-be2ca4ed"]]),E={data(){return{selectedItem:"全部商品",menuItems:["全部商品","球皮","球鞋","球拍","配件"]}},methods:{selectCategory(t){this.selectedItem=t,this.$emit("category-selected",this.selectedItem)}}},V={class:"mt-5"},D={class:"list-unstyled bg-color rounded p-3"},J=["onClick"],U={class:"menu-link fw-bold cursor-pointer"};function A(t,e,n,p,c,o){return a(),r("div",V,[s("ul",D,[(a(!0),r(b,null,P(c.menuItems,d=>(a(),r("li",{key:d,class:x([{active:c.selectedItem===d},"menu-item text-center"]),onClick:v=>o.selectCategory(d)},[s("a",U,l(d),1)],10,J))),128))])])}const M=f(E,[["render",A],["__scopeId","data-v-adaf0eea"]]),q={components:{Swiper:j,Category:M,Pagination:S},data(){return{pagination:{current_page:1,per_page:9,total_pages:0},category:"全部商品",filteredProductList:[],searchInput:"",productList:[],isLoading:!0}},computed:{paginatedProducts(){const t=(this.pagination.current_page-1)*this.pagination.per_page,e=t+this.pagination.per_page;return this.filteredProductList.slice(t,e)}},methods:{updatePage(t){this.pagination.current_page=t,this.$forceUpdate()},updateTotalPages(){this.pagination.total_pages=Math.ceil(this.filteredProductList.length/this.pagination.per_page)},filterByCategory(t){this.category=t,t==="全部商品"?this.filteredProductList=this.productList:(this.filteredProductList=this.productList.filter(e=>e.category===t),this.pagination.current_page=1),this.updateTotalPages()},searchProduct(){const t=this.searchInput.toLowerCase();this.searchInput="",this.isLoading=!0,setTimeout(()=>{this.filteredProductList=this.productList.filter(e=>e.title.toLowerCase().includes(t)),this.filteredProductList.length||h.fire({title:"失敗",text:"查無此商品，看看其他商品吧!",icon:"error"}).then(()=>{this.getProductList()}),this.isLoading=!1,this.updateTotalPages()},500)},getProductList(){m.get("https://vue3-course-api.hexschool.io/api/tingg-api/products/all").then(e=>{const n=JSON.parse(localStorage.getItem("favorites"))||[];this.productList=e.data.products.map(p=>({...p,isFavorite:n.includes(p.id)})),this.filteredProductList=this.productList,this.isLoading=!1,this.updateTotalPages()}).catch(e=>{console.error("API 請求失敗:",e),this.isLoading=!1})},getProduct(t){this.$router.push(`/user/product/${t}`)},addToCart(t){m.post("https://vue3-course-api.hexschool.io/api/tingg-api/cart",{data:{product_id:t,qty:1}}).then(n=>{h.fire({title:"成功",text:"商品已成功加入購物車",icon:"success"})})},toggleFavorite(t){t.isFavorite=!t.isFavorite;const e=JSON.parse(localStorage.getItem("favorites"))||[];if(t.isFavorite)e.push(t.id),h.fire({title:"成功",text:"商品已成功加入收藏",icon:"success"});else{const n=e.indexOf(t.id);n!==-1&&(e.splice(n,1),h.fire({title:"成功",text:"商品已成功取消收藏",icon:"success"}))}localStorage.setItem("favorites",JSON.stringify(e)),this.filteredProductList=[...this.productList]}},watch:{filteredProductList(){this.updateTotalPages()}},created(){this.getProductList()}},z={class:"container"},R={class:"d-flex justify-content-center align-items-center mt-5"},X={class:"me-md-5 me-1 fw-bold"},G={class:"container"},H={class:"row justify-content-center"},K={class:"col-10 mt-4"},Q={class:"row"},W={class:"card mx-2",style:{width:"100%",height:"auto"}},Y=["onClick"],Z=["src"],tt={class:"card-body"},et={class:"card-title fw-bolder"},st={class:"border border-warning rounded-3 px-1"},it={class:"d-flex justify-content-around my-3"},ot={class:"btn custom-button bg-light rounded-3"},at=["onClick"],rt=["onClick"],ct={key:0,class:"bi bi-heart fs-3 cursor-pointer"},nt={key:1,class:"bi bi-suit-heart-fill fs-3 text-danger"},dt={key:0,class:"text-dark"},lt={class:"d-flex align-items-center justify-content-between"},pt={class:"text-danger"},ut=["onClick"];function gt(t,e,n,p,c,o){const d=g("Loading"),v=g("Swiper"),y=g("Category"),w=g("Pagination");return a(),r("div",z,[u(d,{active:c.isLoading,loader:"bars",color:"#e9e9d7"},null,8,["active"]),u(v,{class:"my-5"}),s("div",R,[s("h3",X,l(c.category),1),C(s("input",{type:"text",class:"form-control w-50 h-50","onUpdate:modelValue":e[0]||(e[0]=i=>c.searchInput=i)},null,512),[[k,c.searchInput]]),s("button",{class:"btn btn-outline-success ms-2",onClick:e[1]||(e[1]=i=>o.searchProduct())}," 查詢 ")]),s("div",G,[s("div",H,[u(y,{class:"col-md-2",onCategorySelected:o.filterByCategory},null,8,["onCategorySelected"]),s("div",K,[s("div",Q,[(a(!0),r(b,null,P(o.paginatedProducts,i=>(a(),r("div",{class:"col-12 col-md-6 col-lg-4 mb-4",key:i.id},[s("div",W,[s("button",{class:"border border-0",onClick:_=>o.getProduct(i.id)},[s("img",{src:i.imageUrl,class:"card-img-top",alt:"Product Image"},null,8,Z)],8,Y),s("div",tt,[s("h5",et,l(i.title),1),s("span",st,l(i.category),1),s("div",it,[s("button",ot,[s("i",{class:"bi bi-cart fs-3",onClick:_=>o.addToCart(i.id)},null,8,at)]),s("button",{class:"btn bg-light rounded-3",onClick:_=>o.toggleFavorite(i)},[i.isFavorite?(a(),r("i",nt)):(a(),r("i",ct))],8,rt)]),i.origin_price>i.price?(a(),r("h5",dt,[s("del",null,"$NT"+l(i.origin_price),1)])):$("",!0),s("div",lt,[s("h5",pt,"$NT"+l(i.price),1),s("button",{class:"btn btn-outline-dark",onClick:_=>o.getProduct(i.id)}," 更多資訊 ",8,ut)])])])]))),128))])])])]),u(w,{pages:c.pagination,onEmitPages:o.updatePage},null,8,["pages","onEmitPages"])])}const mt=f(q,[["render",gt],["__scopeId","data-v-ad9e7f85"]]);export{mt as default};