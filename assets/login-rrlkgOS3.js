import{T as p}from"./ToastMsg-B44YZl_V.js";import{_ as c,m as g,a as f,c as b,d as e,i as w,f as l,v as d,b as v,F as h,g as y,o as x}from"./index-Bw4PRYnB.js";const a=g(),k={components:{ToastMsg:p},provide(){return{emitter:a}},data(){return{user:{username:"",password:""}}},methods:{signIn(){f.post("https://vue3-course-api.hexschool.io/admin/signin",this.user).then(s=>{if(s.data.success){const{token:r,expired:i}=s.data;document.cookie=`hexToken=${r}; expires=${new Date(i)}`,a.emit("push-message",{style:"success",title:"登入成功",message:s.data.message}),setTimeout(()=>{this.$router.push("/dashboard/products")},1e3)}else a.emit("push-message",{style:"danger",title:"登入失敗，請再試一次",message:s.data.message});console.log(s)})},backFrontStage(){this.$router.push("/")}}},T={class:"container mt-5"},M={class:"col-md-6"},E={class:"mb-2"},_={class:"mb-2"},F={class:"d-flex justify-content-between mt-4"};function P(u,s,r,i,o,n){const m=y("ToastMsg");return x(),b(h,null,[e("div",T,[e("form",{class:"row justify-content-center",onSubmit:s[3]||(s[3]=w((...t)=>n.signIn&&n.signIn(...t),["prevent"]))},[e("div",M,[s[7]||(s[7]=e("h1",{class:"h3 mb-3 font-weight-normal"},"請先登入",-1)),e("div",E,[s[4]||(s[4]=e("label",{for:"inputEmail",class:"sr-only"},"Email address",-1)),l(e("input",{"onUpdate:modelValue":s[0]||(s[0]=t=>o.user.username=t),type:"email",id:"inputEmail",class:"form-control",placeholder:"Email address",required:"",autofocus:""},null,512),[[d,o.user.username]])]),e("div",_,[s[5]||(s[5]=e("label",{for:"inputPassword",class:"sr-only"},"Password",-1)),l(e("input",{"onUpdate:modelValue":s[1]||(s[1]=t=>o.user.password=t),type:"password",id:"inputPassword",class:"form-control",placeholder:"Password",required:""},null,512),[[d,o.user.password]])]),e("div",F,[e("button",{class:"btn btn-danger",type:"button",onClick:s[2]||(s[2]=t=>n.backFrontStage())}," 不是管理員嗎? "),s[6]||(s[6]=e("button",{class:"btn btn-primary",type:"submit"},"登入",-1))])])],32)]),v(m)],64)}const I=c(k,[["render",P]]);export{I as default};