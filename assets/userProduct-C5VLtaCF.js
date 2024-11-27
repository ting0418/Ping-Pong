import{_ as v,o as a,c as n,p as L,d as s,F as b,r as P,n as x,t as l,a as m,b as u,e as C,v as k,f as g,k as $}from"./index-DGr2lNFu.js";import{S as I}from"./swiper-bundle-BFNXhAkM.js";import{P as S}from"./Pagination-D3vxUc6f.js";import{S as _}from"./sweetalert2.esm.all-D3pEHXw3.js";const T="/pingPong/assets/1-B-kVPS1T.jpg",F="/pingPong/assets/2-wyFgniOD.webp",N="/pingPong/assets/3-DObRXOAT.jpg",O={mounted(){new I(".swiper",{speed:400,spaceBetween:100,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!0},loop:!0,autoplay:{delay:3e3,disableOnInteraction:!1}})}},B={class:"swiper"};function j(t,e,r,p,c,o){return a(),n("div",B,e[0]||(e[0]=[L('<div class="swiper-wrapper" data-v-cbe0e078><div class="swiper-slide" data-v-cbe0e078><img src="'+T+'" alt="" data-v-cbe0e078></div><div class="swiper-slide" data-v-cbe0e078><img src="'+F+'" alt="" data-v-cbe0e078></div><div class="swiper-slide" data-v-cbe0e078><img src="'+N+'" alt="" data-v-cbe0e078></div></div><div class="swiper-pagination" data-v-cbe0e078></div><div class="swiper-button-next" data-v-cbe0e078></div><div class="swiper-button-prev" data-v-cbe0e078></div>',4)]))}const V=v(O,[["render",j],["__scopeId","data-v-cbe0e078"]]),E={data(){return{selectedItem:"全部商品",menuItems:["全部商品","球皮","球鞋","球拍","配件"]}},methods:{selectCategory(t){this.selectedItem=t,this.$emit("category-selected",t)}}},D={class:"mt-5"},J={class:"list-unstyled bg-color rounded p-3"},U=["onClick"],A={class:"menu-link fw-bold cursor-pointer"};function M(t,e,r,p,c,o){return a(),n("div",D,[s("ul",J,[(a(!0),n(b,null,P(c.menuItems,d=>(a(),n("li",{key:d,class:x([{active:c.selectedItem===d},"menu-item text-center"]),onClick:f=>o.selectCategory(d)},[s("a",A,l(d),1)],10,U))),128))])])}const q=v(E,[["render",M],["__scopeId","data-v-45377a75"]]),z={components:{Swiper:V,Category:q,Pagination:S},data(){return{pagination:{current_page:1,per_page:9,total_pages:0},category:"全部商品",filteredProductList:[],searchInput:"",productList:[],isLoading:!0}},computed:{paginatedProducts(){const t=(this.pagination.current_page-1)*this.pagination.per_page,e=t+this.pagination.per_page;return this.filteredProductList.slice(t,e)}},methods:{updatePage(t){this.pagination.current_page=t,this.$forceUpdate()},updateTotalPages(){this.pagination.total_pages=Math.ceil(this.filteredProductList.length/this.pagination.per_page)},filterByCategory(t){this.category=t,t==="全部商品"?this.filteredProductList=this.productList:(this.filteredProductList=this.productList.filter(e=>e.category===t),this.pagination.current_page=1),this.updateTotalPages()},searchProduct(){const t=this.searchInput.toLowerCase();this.searchInput="",this.isLoading=!0,setTimeout(()=>{this.filteredProductList=this.productList.filter(e=>e.title.toLowerCase().includes(t)),this.filteredProductList.length||_.fire({title:"失敗",text:"查無此商品，看看其他商品吧!",icon:"error"}).then(()=>{this.getProductList()}),this.isLoading=!1,this.updateTotalPages()},500)},getProductList(){m.get("https://vue3-course-api.hexschool.io/api/tingg-api/products/all").then(e=>{const r=JSON.parse(localStorage.getItem("favorites"))||[];this.productList=e.data.products.map(p=>({...p,isFavorite:r.includes(p.id)})),this.filteredProductList=this.productList,this.isLoading=!1,this.updateTotalPages()}).catch(e=>{console.error("API 請求失敗:",e),this.isLoading=!1})},getProduct(t){this.$router.push(`/user/product/${t}`)},addToCart(t){m.post("https://vue3-course-api.hexschool.io/api/tingg-api/cart",{data:{product_id:t,qty:1}}).then(r=>{_.fire({title:"成功",text:"商品已成功加入購物車",icon:"success"})})},toggleFavorite(t){t.isFavorite=!t.isFavorite;const e=JSON.parse(localStorage.getItem("favorites"))||[];if(t.isFavorite)e.push(t.id),_.fire({title:"成功",text:"商品已成功加入收藏",icon:"success"});else{const r=e.indexOf(t.id);r!==-1&&(e.splice(r,1),_.fire({title:"成功",text:"商品已成功取消收藏",icon:"success"}))}localStorage.setItem("favorites",JSON.stringify(e)),this.filteredProductList=[...this.productList]}},watch:{filteredProductList(){this.updateTotalPages()}},created(){this.getProductList()}},R={class:"container"},X={class:"d-flex justify-content-center align-items-center mt-5"},G={class:"me-md-5 me-1 fw-bold"},H={class:"row justify-content-center"},K={class:"col-10 mt-4"},Q={class:"row"},W={class:"card mx-2",style:{width:"100%",height:"auto"}},Y=["onClick"],Z=["src"],tt={class:"card-body"},et={class:"card-title"},st={class:"border border-warning rounded-3 px-1"},it={class:"d-flex justify-content-around my-3"},ot={class:"btn custom-button bg-light rounded-3"},at=["onClick"],nt=["onClick"],ct={key:0,class:"bi bi-heart fs-3 cursor-pointer"},rt={key:1,class:"bi bi-suit-heart-fill fs-3 text-danger"},dt={key:0,class:"text-dark"},lt={class:"d-flex align-items-center justify-content-between"},pt={class:"text-danger"},ut=["onClick"];function gt(t,e,r,p,c,o){const d=g("Loading"),f=g("Swiper"),w=g("Category"),y=g("Pagination");return a(),n("div",R,[u(d,{active:c.isLoading},null,8,["active"]),u(f,{class:"my-5"}),s("div",X,[s("h3",G,l(c.category),1),C(s("input",{type:"text",class:"form-control w-50 h-50","onUpdate:modelValue":e[0]||(e[0]=i=>c.searchInput=i)},null,512),[[k,c.searchInput]]),s("button",{class:"btn btn-outline-success ms-2",onClick:e[1]||(e[1]=i=>o.searchProduct())}," 查詢 ")]),s("div",H,[u(w,{class:"col-md-2",onCategorySelected:o.filterByCategory},null,8,["onCategorySelected"]),s("div",K,[s("div",Q,[(a(!0),n(b,null,P(o.paginatedProducts,i=>(a(),n("div",{class:"col-12 col-md-6 col-lg-4 mb-4",key:i.id},[s("div",W,[s("button",{class:"border border-0",onClick:h=>o.getProduct(i.id)},[s("img",{src:i.imageUrl,class:"card-img-top",alt:"Product Image"},null,8,Z)],8,Y),s("div",tt,[s("h5",et,l(i.title),1),s("span",st,l(i.category),1),s("div",it,[s("button",ot,[s("i",{class:"bi bi-cart fs-3",onClick:h=>o.addToCart(i.id)},null,8,at)]),s("button",{class:"btn custom-button bg-light rounded-3",onClick:h=>o.toggleFavorite(i)},[i.isFavorite?(a(),n("i",rt)):(a(),n("i",ct))],8,nt)]),i.origin_price>i.price?(a(),n("h5",dt,[s("del",null,"$NT"+l(i.origin_price),1)])):$("",!0),s("div",lt,[s("h5",pt,"$NT"+l(i.price),1),s("button",{class:"btn btn-outline-dark",onClick:h=>o.getProduct(i.id)}," 更多資訊 ",8,ut)])])])]))),128))])])]),u(y,{pages:c.pagination,onEmitPages:o.updatePage},null,8,["pages","onEmitPages"])])}const mt=v(z,[["render",gt],["__scopeId","data-v-846f7d67"]]);export{mt as default};
