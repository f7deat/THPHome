"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1658],{86444:function(_,y,e){var T=e(53939),d=e.n(T),g=e(83134),C=e.n(g),W=e(4870),B=e(46665),K=e(68136),F=e(44949),G=e(58703),c=e(33130),I=function(m){var f=W.Z.useFormInstance(),Z=(0,K.useRef)(null),S=function(){if(Z.current){var o;f.setFieldValue(m.name,(o=Z.current)===null||o===void 0?void 0:o.getContent())}};return(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(F.M,{onChange:S,onInit:function(o,N){return Z.current=N},apiKey:"mn4nbwhddqp9jr1g1c3w17dkdu96ji7lr2fmolsncez1k3ng",init:{plugins:"anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",toolbar:"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",file_picker_types:"file image media",file_picker_callback:function(o,N,E){if(E.filetype=="file"&&o("mypage.html",{text:"My text"}),E.filetype=="image"){var P=document.createElement("input");P.setAttribute("type","file"),P.setAttribute("accept","image/*"),P.addEventListener("change",function(){var H=C()(d()().mark(function L(V){var M,u,x;return d()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return M=V.target.files[0],u=new FormData,u.append("file",M),j.next=5,(0,G.request)("file/image/upload",{data:u,method:"POST"});case 5:x=j.sent,x&&(B.ZP.success("T\u1EA3i l\xEAn th\xE0nh c\xF4ng!"),o(x.url,{alt:"My alt text"}));case 7:case"end":return j.stop()}},L)}));return function(L){return H.apply(this,arguments)}}()),P.click()}E.filetype=="media"&&o("movie.mp4",{source2:"alt.ogg",poster:"image.jpg"})}},initialValue:f.getFieldValue(m.name)})})};y.Z=I},17433:function(_,y,e){e.r(y),e.d(y,{default:function(){return fe}});var T=e(78095),d=e.n(T),g=e(53939),C=e.n(g),W=e(60430),B=e.n(W),K=e(83134),F=e.n(K),G=e(34827),c=e.n(G),I=e(18801),b=e(24991),m=e(4870),f=e(46665),Z=e(88094),S=e(13762),p=e(2537),o=e(10483),N=e(41605),E=e(15621),P=e(24657),H=e(62380),L=e(48233),V=e(63687),M=e(83294),u=e(68136),x=function(h){return h[h.DEFAULT=0]="DEFAULT",h[h.PAGE=1]="PAGE",h[h.NEWS=2]="NEWS",h[h.NOTIFICATION=3]="NOTIFICATION",h}({}),w=[{value:x.PAGE,label:"Trang"},{value:x.NEWS,label:"Tin t\u1EE9c"},{value:x.NOTIFICATION,label:"Th\xF4ng b\xE1o"}],j=e(86444),i=e(58703),ue=e(62066),de=e.n(ue),ce=e(81068),R=e(26805),t=e(33130),me=I.Z.Dragger,he=function(){var ve=b.Z.Option,ge=m.Z.useForm(),pe=c()(ge,1),z=pe[0],Ee=(0,i.useParams)(),D=Ee.id,xe=(0,u.useState)({}),k=c()(xe,2),s=k[0],$=k[1],je=(0,u.useState)(),q=c()(je,2),J=q[0],ye=q[1],Ce=(0,u.useState)([]),ee=c()(Ce,2),Y=ee[0],te=ee[1],Pe=(0,u.useState)([]),ne=c()(Pe,2),O=ne[0],Q=ne[1],De=(0,u.useState)(),ae=c()(De,2),Ze=ae[0],X=ae[1],Oe=(0,u.useState)(""),le=c()(Oe,2),ie=le[0],se=le[1],U=(0,i.useIntl)(),re=(0,u.useCallback)(function(){D&&((0,i.request)("post/get/".concat(D)).then(function(n){$(n),z.setFields([{name:"content",value:n.content},{name:"title",value:n.title},{name:"type",value:n.type},{name:"thumbnail",value:n.thumbnail},{name:"language",value:n.language}]),se(n.thumbnail)}),(0,i.request)("post/get-list-category-id-in-post/".concat(D)).then(function(n){te(n)}),(0,i.request)("post/attachment-list-in-post/".concat(D)).then(function(n){var l=n.map(function(a){return{uid:a.id,name:a.name,status:"done",url:"/files/".concat(a.id).concat(a.extension)}});Q(l)}))},[D]);(0,u.useEffect)(function(){re(),(0,i.request)("category/get-list?language=".concat((0,R.d)(U.locale))).then(function(n){ye(n)})},[re]);var Ae=function(){var l=O.map(function(a){return{id:a.uid}});(0,i.request)("post/add",{method:"POST",data:{post:s,listCategoryId:Y,attachments:l}}).then(function(a){a.succeeded?i.history.push("/post/list?type=".concat(s.type,"&language=").concat((0,R.d)(U.locale))):f.ZP.error("ERROR"),X(!1)})},Te=function(){var l=O.map(function(a){return{id:a.uid}});(0,i.request)("post/update",{method:"POST",data:{post:s,listCategoryId:Y,attachments:l}}).then(function(a){a.succeeded?i.history.push("/post/list?type=".concat(s.type,"&language=").concat((0,R.d)(U.locale))):f.ZP.error("ERROR"),X(!1)})};function Fe(n){te(n)}var Ie=function(l){(0,i.request)("post/file/delete/".concat(l.uid),{method:"DELETE"}).then(function(a){a.succeeded?Q(O.filter(function(v){return v.uid!==l.uid})):f.ZP.error(a.message)})},be=function(){var n=F()(C()().mark(function l(a){var v,r,oe;return C()().wrap(function(A){for(;;)switch(A.prev=A.next){case 0:return v=new FormData,v.append("file",a),A.next=4,(0,i.request)("post/upload",{method:"POST",data:v});case 4:r=A.sent,oe={uid:r.attach.id,name:r.attach.name,status:"done",url:"/files/".concat(r.attach.id).concat(r.attach.extension)},Q([].concat(B()(O),[oe])),f.ZP.success("".concat(a.name," file uploaded successfully."));case 8:case"end":return A.stop()}},l)}));return function(a){return n.apply(this,arguments)}}(),Se={name:"file",multiple:!1,beforeUpload:be,fileList:O,onRemove:Ie},Ne=function(){var n=F()(C()().mark(function l(a){return C()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:a.type=Number(a.type),s.content=a.content,s.type=a.type,s.title=a.title,s.thumbnail=a.thumbnail,s.language=(0,R.d)(U.locale),X(!0),D?Te():Ae();case 8:case"end":return r.stop()}},l)}));return function(a){return n.apply(this,arguments)}}();return(0,t.jsx)(ce._z,{children:(0,t.jsx)(Z.Z,{children:(0,t.jsx)(m.Z,{onFinish:Ne,layout:"vertical",form:z,children:(0,t.jsxs)(S.Z,{gutter:16,children:[(0,t.jsxs)(p.Z,{span:18,children:[(0,t.jsx)(m.Z.Item,{name:"title",label:"Ti\xEAu \u0111\u1EC1",rules:[{required:!0,message:"Vui l\xF2ng nh\u1EADp ti\xEAu \u0111\u1EC1 b\xE0i vi\u1EBFt"}],children:(0,t.jsx)(o.Z,{})}),(0,t.jsx)("div",{className:"mb-1",children:"M\xF4 t\u1EA3"}),(0,t.jsx)(o.Z.TextArea,{value:s.description,onChange:function(l){return $(d()(d()({},s),{},{description:l.target.value}))},className:"mb-2"}),(0,t.jsx)(m.Z.Item,{name:"content",label:"N\u1ED9i dung",children:(0,t.jsx)(j.Z,{name:"content"})}),(0,t.jsxs)(N.Z,{children:[(0,t.jsx)(E.ZP,{type:"primary",htmlType:"submit",loading:Ze,children:"L\u01B0u l\u1EA1i"}),(0,t.jsx)(E.ZP,{onClick:function(){return i.history.push("/admin/post/list")},children:"H\u1EE7y"})]})]}),(0,t.jsxs)(p.Z,{span:6,children:[(0,t.jsxs)(S.Z,{gutter:16,children:[(0,t.jsx)(p.Z,{span:12,children:(0,t.jsx)(m.Z.Item,{label:"Lo\u1EA1i",name:"type",rules:[{required:!0,message:"Vui l\xF2ng ch\u1ECDn lo\u1EA1i b\xE0i vi\u1EBFt"}],children:(0,t.jsx)(b.Z,{options:w})})}),(0,t.jsx)(p.Z,{span:12,children:(0,t.jsx)(m.Z.Item,{label:"Ng\xF4n ng\u1EEF",tooltip:"Chuy\u1EC3n ng\xF4n ng\u1EEF tr\xEAn thanh c\xF4ng c\u1EE5",children:(0,t.jsx)(o.Z,{disabled:!0,value:(0,i.getLocale)()})})})]}),(0,t.jsx)("div",{className:"mb-1",children:"Danh m\u1EE5c"}),(0,t.jsx)(b.Z,{mode:"multiple",allowClear:!0,style:{width:"100%"},placeholder:"Vui l\xF2ng ch\u1ECDn",onChange:Fe,className:"mb-2",value:Y,optionFilterProp:"children",filterOption:function(l,a){return a.children.toLowerCase().indexOf(l.toLowerCase())>=0},children:J==null?void 0:J.map(function(n){return(0,t.jsx)(ve,{value:n.id,children:n.name},n.id)})}),(0,t.jsx)("div",{className:"flex gap-2",children:(0,t.jsx)(m.Z.Item,{label:"\u1EA2nh \u0111\u1EA1i di\u1EC7n",name:"thumbnail",style:{width:"100%"},children:(0,t.jsx)(o.Z,{suffix:(0,t.jsx)(I.Z,{beforeUpload:function(l){var a=l.type==="image/jpeg"||l.type==="image/png";if(a){var v=new FormData;return v.append("file",l),(0,i.request)("file/image/upload",{method:"POST",data:v}).then(function(r){if(!r.succeeded)return f.ZP.error(r.message),!1;z.setFieldValue("thumbnail",r.url),se(r.url)}),!1}else return f.ZP.error("You can only upload JPG or PNG file!"),!1},maxCount:1,showUploadList:!1,children:(0,t.jsx)(E.ZP,{icon:(0,t.jsx)(V.Z,{}),size:"small",children:"T\u1EA3i l\xEAn"})})})})}),(0,t.jsx)("div",{className:"mb-4",children:ie?(0,t.jsx)(P.Z,{src:ie,height:200,wrapperClassName:"w-full",style:{width:"100%",objectFit:"cover"}}):(0,t.jsx)(H.Z,{})}),(0,t.jsx)("div",{className:"mb-1",children:"Ng\xE0y xu\u1EA5t b\u1EA3n"}),(0,t.jsx)("div",{className:"mb-2",children:(0,t.jsx)(L.default,{onChange:function(l){return $(d()(d()({},s),{},{modifiedDate:l==null?void 0:l.toDate()}))},value:de()(s==null?void 0:s.modifiedDate)})}),(0,t.jsx)("div",{className:"mb-1",children:"T\u1EC7p tin \u0111\xEDnh k\xE8m"}),(0,t.jsx)("div",{className:"mb-2",children:(0,t.jsxs)(me,d()(d()({},Se),{},{children:[(0,t.jsx)("p",{className:"ant-upload-drag-icon",children:(0,t.jsx)(M.Z,{})}),(0,t.jsx)("p",{className:"ant-upload-text",children:"Ch\u1ECDn t\u1EC7p tin \u0111\xEDnh k\xE8m"}),(0,t.jsx)("p",{className:"ant-upload-hint",children:"H\u1ED7 tr\u1EE3 c\xE1c \u0111\u1ECBnh d\u1EA1ng th\xF4ng d\u1EE5ng .docx, .xlsx, .pdf"})]}))})]})]})})})})},fe=he},26805:function(_,y,e){e.d(y,{d:function(){return d}});function T(g){return g.trim()}function d(g){return g?g==="vi-VN"?1:2:1}}}]);