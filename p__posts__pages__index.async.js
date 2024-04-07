"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6230],{86444:function(ee,L,t){var g=t(53939),c=t.n(g),R=t(83134),H=t.n(R),K=t(4870),S=t(46665),W=t(68136),G=t(44949),C=t(58703),U=t(33130),z=function(a){var y=K.Z.useFormInstance(),D=(0,W.useRef)(null),$=function(){if(D.current){var F;y.setFieldValue(a.name,(F=D.current)===null||F===void 0?void 0:F.getContent())}};return(0,U.jsx)(U.Fragment,{children:(0,U.jsx)(G.M,{onChange:$,onInit:function(F,w){return D.current=w},apiKey:"mn4nbwhddqp9jr1g1c3w17dkdu96ji7lr2fmolsncez1k3ng",init:{plugins:"anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",toolbar:"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",file_picker_types:"file image media",file_picker_callback:function(F,w,X){if(X.filetype=="file"&&F("mypage.html",{text:"My text"}),X.filetype=="image"){var Z=document.createElement("input");Z.setAttribute("type","file"),Z.setAttribute("accept","image/*"),Z.addEventListener("change",function(){var te=H()(c()().mark(function J(p){var Q,q,_;return c()().wrap(function(V){for(;;)switch(V.prev=V.next){case 0:return Q=p.target.files[0],q=new FormData,q.append("file",Q),V.next=5,(0,C.request)("file/image/upload",{data:q,method:"POST"});case 5:_=V.sent,_&&(S.ZP.success("T\u1EA3i l\xEAn th\xE0nh c\xF4ng!"),F(_.url,{alt:"My alt text"}));case 7:case"end":return V.stop()}},J)}));return function(J){return te.apply(this,arguments)}}()),Z.click()}X.filetype=="media"&&F("movie.mp4",{source2:"alt.ogg",poster:"image.jpg"})}},initialValue:y.getFieldValue(a.name)})})};L.Z=z},22403:function(ee,L,t){t.r(L),t.d(L,{default:function(){return Oe}});var g=t(34827),c=t.n(g),R=t(96338),H=t(70524),K=t(29483),S=t(81068),W=t(79392),G=t(58703),C=t(15621),U=t(13762),z=t(2537),r=t(68136),a=t(41220),y=t(16331),D=t(91816),$=t(62380),e=t(33130),F=function(){var d=(0,G.useParams)(),n=d.id,m=a.A.useForm(),i=c()(m,1),u=i[0],j=(0,r.useState)(),O=c()(j,2),P=O[0],M=O[1];return(0,r.useEffect)(function(){n&&(0,R.uC)(n).then(function(f){f&&(u.setFields([{name:"title",value:f.title},{name:"description",value:f.description},{name:"thumbnail",value:f.thumbnail}]),f.thumbnail&&M(f.thumbnail))})},[n]),(0,e.jsx)(e.Fragment,{children:(0,e.jsx)(a.A,{form:u,children:(0,e.jsxs)(U.Z,{gutter:16,children:[(0,e.jsxs)(z.Z,{span:16,children:[(0,e.jsx)(y.Z,{label:"Ti\xEAu \u0111\u1EC1",name:"title",rules:[{required:!0}]}),(0,e.jsx)(D.Z,{label:"M\xF4 t\u1EA3",name:"description",tooltip:"Meta Description"}),(0,e.jsx)(y.Z,{label:"\u1EA2nh \u0111\u1EA1i di\u1EC7n",name:"thumbnail"})]}),(0,e.jsx)(z.Z,{span:8,children:(0,e.jsx)(W.Z,{bordered:!0,title:"\u1EA2nh \u0111\u1EA1i di\u1EC7n",headerBordered:!0,children:P?(0,e.jsx)("img",{src:P,className:"w-full object-cover h-48"}):(0,e.jsx)($.Z,{})})})]})})})},w=F,X=t(53939),Z=t.n(X),te=t(83134),J=t.n(te),p=t(81268),Q=t(43772),q=function(d){var n=d.id,m=a.A.useFormInstance();return(0,r.useEffect)(function(){n&&(0,p.Ky)(n).then(function(i){m.setFields([{name:"type",value:i.type},{name:"value",value:i.value},{name:"className",value:i.className}])})},[n]),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(Q.Z,{label:"Lo\u1EA1i",name:"type",options:[{label:"H1",value:"h1"},{label:"H2",value:"h2"},{label:"H3",value:"h3"},{label:"Paragraph",value:"paragraph"}]}),(0,e.jsx)(D.Z,{label:"N\u1ED9i dung",name:"value"})]})},_=q,ie=function(d){var n=d.id,m=a.A.useFormInstance();return(0,r.useEffect)(function(){n&&(0,p.Ky)(n).then(function(i){m.setFields([{name:"introduce",value:i.introduce},{name:"lecturer",value:i.lecturer},{name:"career",value:i.career},{name:"opportunity",value:i.opportunity}])})},[n]),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(D.Z,{label:"TH\xD4NG TIN V\u1EC0 NG\xC0NH",name:"introduce"}),(0,e.jsx)(D.Z,{label:"\u0110\u1ED8I NG\u0168 GI\u1EA2NG VI\xCAN",name:"lecturer"}),(0,e.jsx)(D.Z,{label:"C\u01A0 H\u1ED8I VI\u1EC6C L\xC0M",name:"career"}),(0,e.jsx)(D.Z,{label:"C\u01A0 H\u1ED8I PH\xC1T TRI\u1EC2N",name:"opportunity"})]})},V=ie,ve=function(d){var n=d.id,m=a.A.useFormInstance();return(0,r.useEffect)(function(){n&&(0,p.Ky)(n).then(function(i){m.setFields([{name:"embedUrl",value:i.embedUrl}])})},[n]),(0,e.jsx)(e.Fragment,{children:(0,e.jsx)(y.Z,{label:"Embed URL",name:"embedUrl",rules:[{required:!0}]})})},he=ve,ge=function(d){var n=d.id,m=a.A.useFormInstance();return(0,r.useEffect)(function(){n&&(0,p.Ky)(n).then(function(i){m.setFields([{name:"label",value:i.label},{name:"className",value:i.className}])})},[n]),(0,e.jsx)(e.Fragment,{children:(0,e.jsx)(y.Z,{label:"Label",name:"label"})})},xe=ge,le=t(86444),pe=function(d){var n=d.id,m=a.A.useFormInstance();return(0,r.useEffect)(function(){n&&(0,p.Ky)(n).then(function(i){m.setFields([{name:"raw",value:i.raw},{name:"className",value:i.className}])})},[n]),(0,e.jsx)(a.A.Item,{name:"raw",label:"N\u1ED9i dung",children:(0,e.jsx)(le.Z,{name:"raw"})})},je=pe,ne=t(88821),se=t(59342),oe=t(24657),ue=t(21248),I=t(46665),ye=function(d){var n=d.id,m=(0,r.useState)([]),i=c()(m,2),u=i[0],j=i[1],O=(0,r.useState)([]),P=c()(O,2),M=P[0],f=P[1],k=a.A.useFormInstance();return(0,r.useEffect)(function(){n&&(0,p.Ky)(n).then(function(l){k.setFields([{name:"label",value:l.label},{name:"className",value:l.className}]),l.logos?j(l.logos):j([])})},[n]),(0,r.useEffect)(function(){f([])},[k]),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(y.Z,{name:"logos",hidden:!0}),(0,e.jsxs)("div",{className:"flex gap-4",style:{gap:8,flexWrap:"wrap"},children:[u.map(function(l,o){return(0,e.jsx)("div",{className:"relative",style:{border:"1px solid #d1d1d1",borderRadius:8,marginBottom:8,padding:4},children:(0,e.jsx)(se.Z.Ribbon,{text:(0,e.jsx)(C.ZP,{onClick:function(){j(u.filter(function(E){return E!==l}))},type:"text",size:"small",style:{color:"white"},children:"X\xF3a"}),children:(0,e.jsx)(oe.Z,{src:l,alt:"LOGO",width:90,height:90,style:{borderRadius:8,objectFit:"cover"}})})},o)}),(0,e.jsx)(ue.Z,{beforeUpload:function(o){var v=o.type==="image/jpeg"||o.type==="image/png";if(v){var E=new FormData;return E.append("file",o),(0,G.request)("file/upload",{method:"POST",data:E}).then(function(A){if(!A.succeeded)return I.ZP.error(A.message),!1;u.push(A.url),j(u),k.setFieldValue("logos",u)}),!1}else return I.ZP.error("You can only upload JPG or PNG file!"),!1},listType:"picture-card",fileList:M,onChange:function(o){var v=o.fileList;f([v.pop()])},children:(0,e.jsxs)("button",{style:{border:0,background:"none"},type:"button",children:[(0,e.jsx)(ne.Z,{}),(0,e.jsx)("div",{style:{marginTop:8},children:"Upload"})]})})]})]})},Ee=ye,Pe=function(d){var n=d.id,m=(0,r.useState)([]),i=c()(m,2),u=i[0],j=i[1],O=(0,r.useState)([]),P=c()(O,2),M=P[0],f=P[1],k=a.A.useFormInstance();return(0,r.useEffect)(function(){n&&(0,p.Ky)(n).then(function(l){k.setFields([{name:"textContent",value:l.textContent},{name:"images",value:l.images},{name:"className",value:l.className}]),l.images?j(l.images):j([])})},[n]),(0,r.useEffect)(function(){f([])},[k,n]),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(y.Z,{name:"images",hidden:!0}),(0,e.jsx)(a.A.Item,{name:"textContent",label:"N\u1ED9i dung",children:(0,e.jsx)(le.Z,{name:"textContent"})}),(0,e.jsxs)("div",{className:"flex gap-4",style:{gap:8,flexWrap:"wrap"},children:[u.map(function(l,o){return(0,e.jsx)("div",{className:"relative",style:{border:"1px solid #d1d1d1",borderRadius:8,marginBottom:8,padding:4},children:(0,e.jsx)(se.Z.Ribbon,{text:(0,e.jsx)(C.ZP,{onClick:function(){j(u.filter(function(E){return E!==l}))},type:"text",size:"small",style:{color:"white"},children:"X\xF3a"}),children:(0,e.jsx)(oe.Z,{src:l,alt:"LOGO",width:90,height:90,style:{borderRadius:8,objectFit:"cover"}})})},o)}),(0,e.jsx)(ue.Z,{beforeUpload:function(o){var v=o.type==="image/jpeg"||o.type==="image/png";if(v){var E=new FormData;return E.append("file",o),(0,G.request)("file/upload",{method:"POST",data:E}).then(function(A){if(!A.succeeded)return I.ZP.error(A.message),!1;u.push(A.url),j(u),k.setFieldValue("images",u)}),!1}else return I.ZP.error("You can only upload JPG or PNG file!"),!1},listType:"picture-card",fileList:M,onChange:function(o){var v=o.fileList;f([v.pop()])},children:(0,e.jsxs)("button",{style:{border:0,background:"none"},type:"button",children:[(0,e.jsx)(ne.Z,{}),(0,e.jsx)("div",{style:{marginTop:8},children:"Upload"})]})})]})]})},be=Pe,Ce=t(80345),Be=t(49799),Se=t(25223),Ze=t(99894),ce=t(7482),de=t(20782),ke=t(30339),Te=function(){var d=(0,G.useParams)(),n=d.id,m=(0,r.useState)([]),i=c()(m,2),u=i[0],j=i[1],O=(0,r.useState)(!1),P=c()(O,2),M=P[0],f=P[1],k=(0,r.useState)(!1),l=c()(k,2),o=l[0],v=l[1],E=(0,r.useState)(),A=c()(E,2),s=A[0],me=A[1],fe=(0,r.useRef)(),re=(0,r.useRef)(),ae=function(){n&&(0,p.g_)(n).then(function(B){j(B.data)})};(0,r.useEffect)(function(){n&&ae()},[n]);var Ae=function(){var b=J()(Z()().mark(function B(h){return Z()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,(0,p.Ap)(h);case 2:I.ZP.success("Deleted!"),ae();case 4:case"end":return x.stop()}},B)}));return function(h){return b.apply(this,arguments)}}(),Ie=function(){var b=J()(Z()().mark(function B(h){var T;return Z()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:if(h.postId=n,!h.id){Y.next=7;break}return Y.next=4,(0,p.ND)(h);case 4:I.ZP.success("L\u01B0u th\xE0nh c\xF4ng!"),Y.next=10;break;case 7:return Y.next=9,(0,p.nt)(h);case 9:I.ZP.success("Th\xEAm th\xE0nh c\xF4ng!");case 10:v(!1),ae(),(T=re.current)===null||T===void 0||T.resetFields();case 13:case"end":return Y.stop()}},B)}));return function(h){return b.apply(this,arguments)}}();(0,r.useEffect)(function(){if(s){var b;(b=re.current)===null||b===void 0||b.setFields([{name:"id",value:s.id},{name:"name",value:s.name},{name:"blockId",value:s.blockId}])}},[s]);var Ne=[{title:"#",dataIndex:"sortOrder",className:"drag-visible"},{title:"Lo\u1EA1i",dataIndex:"blockName"},{title:"T\xEAn",dataIndex:"name"},{title:"Tr\u1EA1ng th\xE1i",dataIndex:"active",valueEnum:{false:{text:"Draft",status:"Default"},true:{text:"Active",status:"Processing"}},width:80},{title:"T\xE1c v\u1EE5",valueType:"option",render:function(B,h){return[(0,e.jsx)(de.Z,{title:"C\u1EA5u h\xECnh block",children:(0,e.jsx)(C.ZP,{size:"small",type:"primary",icon:(0,e.jsx)(Ce.Z,{}),onClick:function(){var x;me(h),(x=fe.current)===null||x===void 0||x.setFieldValue("id",h.id),f(!0)}})},"setting"),(0,e.jsx)(de.Z,{title:"Ch\u1EC9nh s\u1EEDa th\xF4ng tin",children:(0,e.jsx)(C.ZP,{size:"small",icon:(0,e.jsx)(Be.Z,{}),onClick:function(){me(h),v(!0)}})},"edit"),(0,e.jsx)(ke.Z,{title:"Are you sure?",onConfirm:function(){return Ae(h.id)},children:(0,e.jsx)(C.ZP,{size:"small",icon:(0,e.jsx)(Se.Z,{}),danger:!0,type:"primary"})},4)]},align:"center"}],Me=function(B,h,T){(0,p.lq)(T).then(function(x){j(T),I.ZP.success("Saved!")})},Le=function(){return s?s.normalizedName==="TextBlock"?(0,e.jsx)(_,{id:s.id}):s.normalizedName==="MajorGeneralBlock"?(0,e.jsx)(V,{id:s.id}):s.normalizedName==="VideoBlock"?(0,e.jsx)(he,{id:s.id}):s.normalizedName==="DividerBlock"?(0,e.jsx)(xe,{id:s.id}):s.normalizedName==="TinyMCEBlock"?(0,e.jsx)(je,{id:s.id}):s.normalizedName==="SponsorBlock"?(0,e.jsx)(Ee,{id:s.id}):s.normalizedName==="SideGalleryBlock"?(0,e.jsx)(be,{id:s.id}):(0,e.jsx)($.Z,{}):(0,e.jsx)($.Z,{})},Re=function(){var b=J()(Z()().mark(function B(h){return Z()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:if(s){x.next=2;break}return x.abrupt("return");case 2:return console.log(h),x.next=5,(0,p.B)(s.id,h);case 5:I.ZP.success("Saved!"),f(!1);case 7:case"end":return x.stop()}},B)}));return function(h){return b.apply(this,arguments)}}();return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("div",{className:"mb-2 flex justify-end gap-2",children:(0,e.jsx)(C.ZP,{onClick:function(){return v(!0)},type:"primary",icon:(0,e.jsx)(ne.Z,{}),children:(0,e.jsx)("span",{children:"Th\xEAm m\u1EDBi"})},0)}),(0,e.jsx)(Ze.Z,{search:!1,rowKey:"id",columns:Ne,pagination:!1,dataSource:u,dragSortKey:"sortOrder",onDragSortEnd:Me}),(0,e.jsxs)(ce.Y,{open:o,title:"Block",onOpenChange:v,onFinish:Ie,formRef:re,children:[(0,e.jsx)(y.Z,{name:"id",hidden:!0}),(0,e.jsx)(y.Z,{name:"name",label:"Name",rules:[{required:!0}]}),(0,e.jsx)(Q.Z,{rules:[{required:!0}],request:p.Wt,name:"blockId",label:"Block"})]}),(0,e.jsxs)(ce.Y,{open:M,onOpenChange:f,title:"Block Configuration",onFinish:Re,formRef:fe,children:[(0,e.jsx)(y.Z,{name:"id",hidden:!0}),(0,e.jsx)(y.Z,{name:"className",label:"Class Name"}),Le()]})]})},De=Te,Fe=function(){var d=(0,G.useParams)(),n=d.id,m=(0,r.useState)(),i=c()(m,2),u=i[0],j=i[1],O=(0,r.useState)("content"),P=c()(O,2),M=P[0],f=P[1],k=function(){n&&(0,R.uC)(n).then(function(E){return j(E)})};(0,r.useEffect)(function(){k()},[n]);var l=function(E){f(E)},o=(0,r.useRef)(null);return(0,e.jsx)(S._z,{title:u==null?void 0:u.name,extra:(0,e.jsx)(C.ZP,{icon:(0,e.jsx)(H.Z,{}),onClick:function(){return history.back()},children:(0,e.jsx)("span",{children:"Quay l\u1EA1i"})}),children:(0,e.jsxs)(U.Z,{gutter:16,children:[(0,e.jsx)(z.Z,{span:14,children:(0,e.jsx)(W.Z,{tabs:{tabPosition:"top",activeKey:M,items:[{label:"N\u1ED9i dung",key:"content",children:(0,e.jsx)(De,{})},{label:"C\xE0i \u0111\u1EB7t",key:"setting",children:(0,e.jsx)(w,{})}],onChange:l},className:"mb-4"})}),(0,e.jsx)(z.Z,{span:10,children:(0,e.jsx)(W.Z,{title:"Xem tr\u01B0\u1EDBc",headerBordered:!0,extra:(0,e.jsx)(C.ZP,{onClick:function(){o.current&&(o.current.src="https://dhhp.edu.vn/post/preview-".concat(n,".html"))},icon:(0,e.jsx)(K.Z,{}),size:"small",type:"dashed",children:"T\u1EA3i l\u1EA1i"}),children:(0,e.jsx)("div",{style:{overflow:"hidden",border:"1px solid #eee",textAlign:"center",margin:"0 0.6rem"},children:(0,e.jsx)("iframe",{ref:o,src:"https://dhhp.edu.vn/post/preview-".concat(n,".html"),style:{border:"1px solid #ddd",width:1920,height:2e3,transform:"scale(0.3)",transformOrigin:"top left"}})})})})]})})},Oe=Fe},81268:function(ee,L,t){t.d(L,{Ap:function(){return R},B:function(){return U},Ky:function(){return W},ND:function(){return K},Wt:function(){return C},YS:function(){return z},g_:function(){return S},lq:function(){return c},nt:function(){return H}});var g=t(58703),c=function(a){return(0,g.request)("block/sort-order",{method:"POST",data:a})},R=function(a){return(0,g.request)("block/delete/".concat(a),{method:"POST"})},H=function(a){return(0,g.request)("block/add",{method:"POST",data:a})},K=function(a){return(0,g.request)("block/save-info",{method:"POST",data:a})},S=function(a){return(0,g.request)("block/list/".concat(a))},W=function(a){return(0,g.request)("block/".concat(a))},G=function(a){return request("post/get/".concat(a))},C=function(a){return(0,g.request)("block/options")},U=function(a,y){return(0,g.request)("block/save/".concat(a),{method:"POST",data:y})},z=function(a){return(0,g.request)("block/copy",{method:"POST",data:a})}},96338:function(ee,L,t){t.d(L,{AB:function(){return c},FO:function(){return H},uC:function(){return R}});var g=t(58703),c=function(S){return(0,g.request)("post/get-list",{params:S})},R=function(S){return(0,g.request)("post/get/".concat(S))},H=function(S){return(0,g.request)("post/options",{params:S})}}}]);
