"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3659],{26637:function(Q,Z,a){a.r(Z),a.d(Z,{default:function(){return de}});var E=a(78095),o=a.n(E),m=a(34827),c=a.n(m),f=a(10483),N=a(24991),v=a(46665),U=a(96216),C=a(41605),u=a(15621),T=a(30339),W=a(78491),X=a(18186),p=a(4870),$=a(13762),A=a(2537),w=a(62380),k=a(28791),l=a(68136),q=a(22200),I=a(49799),L=a(25223),_=a(88821),ee=a(52643),te={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"}}]},name:"arrow-left",theme:"outlined"},ne=te,ae=a(91471),se=function(S,y){return l.createElement(ae.Z,(0,ee.Z)({},S,{ref:y,icon:ne}))},ie=l.forwardRef(se),oe=a(54619),d=a(58703),le=a(81068),z=a(77042),D=a(26805),e=a(33130),re=f.Z.TextArea,F=N.Z.Option,ue=function(){var S=(0,l.useState)([]),y=c()(S,2),x=y[0],ve=y[1],he=(0,l.useState)(!1),H=c()(he,2),O=H[0],V=H[1],me=(0,l.useState)(),B=c()(me,2),fe=B[0],xe=B[1],ge=(0,l.useState)(!1),M=c()(ge,2),je=M[0],g=M[1],Ze=(0,l.useState)(0),R=c()(Ze,2),h=R[0],K=R[1],Ce=(0,l.useState)(),Y=c()(Ce,2),n=Y[0],r=Y[1],ye=(0,l.useState)(!1),b=c()(ye,2),G=b[0],P=b[1],J=(0,d.useIntl)(),j=function(t){(0,d.request)("category/get-list/".concat(t,"?language=").concat((0,D.d)(J.locale))).then(function(i){ve(i)})};(0,l.useEffect)(function(){j(h)},[h]);function Se(s){r(s),(0,d.request)("post/get-in-category/".concat(s.id)).then(function(t){xe(t),V(!O)})}function Oe(s){(0,d.request)("category/update",{data:s,method:"POST"}).then(function(t){v.ZP.success(t.message),j(h),g(!1)})}var Pe=function(){n.language=(0,D.d)(J.locale),n.isDisplayOnHome=G,n.id?Oe(n):(0,d.request)("category/add",{method:"POST",data:n}).then(function(t){t.succeeded?(v.ZP.success(t.message),j(h),g(!1)):v.ZP.error(t.message)})},Ee=function(){P(!1),g(!0),r({})},Ne=function(t){P(t.isDisplayOnHome),r(t),g(!0)};function Te(s){(0,d.request)("category/delete/".concat(s),{method:"POST"}).then(function(t){t.succeeded?(j(0),v.ZP.success("Success!")):v.ZP.error(t.message)})}function pe(s,t){(0,d.request)("category/remove-post",{method:"POST",data:{categoryId:s,postId:t}}).then(function(i){i.succeeded&&v.ZP.success("succeeded!")})}function Ae(s,t){t?s.status=1:s.status=0,(0,d.request)("category/active",{method:"POST",data:s}).then(function(i){v.ZP.success(i.message),j(h)})}var Ie=[{title:"Id",dataIndex:"id",search:!1},{title:"T\xEAn danh m\u1EE5c",render:function(t){return(0,e.jsxs)("div",{children:[(0,e.jsx)("div",{onClick:function(){return K(t.id)},className:"font-bold cursor-pointer",children:t.name}),(0,e.jsx)("div",{className:"text-gray-500",children:t.description})]})}},{title:"Normalized Name",dataIndex:"normalizeName"},{title:"Status",render:function(t){return(0,e.jsx)(U.Z,{size:"small",defaultChecked:t.status===1,onChange:function(De){return Ae(t,De)}})}},{title:"",valueType:"option",render:function(t){return(0,e.jsxs)(C.Z,{children:[(0,e.jsx)(u.ZP,{type:"primary",size:"small",icon:(0,e.jsx)(q.Z,{}),onClick:function(){return Se(t)}}),(0,e.jsx)(u.ZP,{size:"small",icon:(0,e.jsx)(I.Z,{}),onClick:function(){return Ne(t)}}),(0,e.jsx)(T.Z,{title:"Are you sure to delete?",okText:"Yes",cancelText:"No",onConfirm:function(){return Te(t.id)},children:(0,e.jsx)(u.ZP,{type:"primary",size:"small",danger:!0,icon:(0,e.jsx)(L.Z,{})})})]})}}],Le=[{title:"Id",dataIndex:"id"},{title:"Title",dataIndex:"title"},{title:"",render:function(t){return(0,e.jsxs)(C.Z,{children:[(0,e.jsx)(u.ZP,{type:"primary",icon:(0,e.jsx)(I.Z,{})}),(0,e.jsx)(T.Z,{title:"Are you sure to delete from this category?",okText:"Yes",cancelText:"No",onConfirm:function(){return pe(h,t.id)},children:(0,e.jsx)(u.ZP,{type:"primary",danger:!0,icon:(0,e.jsx)(L.Z,{})})})]})}}];function ze(s){r(function(t){return o()(o()({},t),{},{parrentId:s})})}return(0,e.jsxs)(le._z,{extra:(0,e.jsxs)(C.Z,{className:"mb-2",children:[(0,e.jsx)(u.ZP,{type:"primary",icon:(0,e.jsx)(_.Z,{}),onClick:Ee,children:"T\u1EA1o m\u1EDBi"}),(0,e.jsx)(u.ZP,{icon:(0,e.jsx)(ie,{}),onClick:function(){return K(0)},hidden:h===0,children:"Back"})]}),children:[(0,e.jsx)(z.Z,{search:{layout:"vertical"},dataSource:x,columns:Ie,rowKey:"id",rowSelection:{}}),(0,e.jsxs)(W.Z,{title:n==null?void 0:n.name,placement:"right",closable:!1,onClose:function(){return V(!O)},visible:O,width:960,children:[(0,e.jsxs)(C.Z,{className:"mb-3",children:[(0,e.jsx)(f.Z,{}),(0,e.jsx)(u.ZP,{type:"primary",icon:(0,e.jsx)(oe.Z,{})})]}),(0,e.jsx)(z.Z,{dataSource:fe,columns:Le,rowSelection:{},rowKey:"id"})]}),(0,e.jsx)(X.Z,{title:(n==null?void 0:n.name)||"New Category",visible:je,onOk:Pe,onCancel:function(){return g(!1)},width:600,children:(0,e.jsx)(p.Z,{layout:"vertical",children:(0,e.jsxs)($.Z,{gutter:16,children:[(0,e.jsxs)(A.Z,{span:12,children:[(0,e.jsx)("div",{children:"T\xEAn danh m\u1EE5c:"}),(0,e.jsx)(f.Z,{className:"mb-2",value:n==null?void 0:n.name,onChange:function(t){return r(function(i){return o()(o()({},i),{},{name:t.target.value})})}}),(0,e.jsx)("div",{children:"Icon:"}),(0,e.jsx)(f.Z,{className:"mb-2",value:n==null?void 0:n.icon,onChange:function(t){return r(function(i){return o()(o()({},i),{},{icon:t.target.value})})}}),(0,e.jsx)(p.Z.Item,{label:"Normalize Name",tooltip:"D\xF9ng l\xE0m key cho \u0111a ng\xF4n ng\u1EEF",rules:[{required:!0,message:"Vui l\xF2ng nh\u1EADp!"}],children:(0,e.jsx)(f.Z,{className:"mb-2",value:n==null?void 0:n.url,onChange:function(t){return r(function(i){return o()(o()({},i),{},{normalizeName:t.target.value})})}})}),(0,e.jsx)("div",{children:"Danh m\u1EE5c cha:"}),(0,e.jsxs)(N.Z,{showSearch:!0,placeholder:"Select category",optionFilterProp:"children",onChange:ze,className:"w-full mb-2",value:n==null?void 0:n.parrentId,allowClear:!0,children:[(0,e.jsx)(F,{value:-1,children:"Tr\u1ED1ng"},-1),x&&(x==null?void 0:x.map(function(s){return(0,e.jsx)(F,{value:s.id,children:s.name},s.id)}))]}),(0,e.jsx)("div",{children:"M\xF4 t\u1EA3:"}),(0,e.jsx)(re,{className:"mb-2",value:n==null?void 0:n.description,onChange:function(t){return r(function(i){return o()(o()({},i),{},{description:t.target.value})})}})]}),(0,e.jsxs)(A.Z,{span:12,children:[(0,e.jsx)("div",{children:"Thumbnail:"}),(0,e.jsx)(f.Z,{className:"mb-2",value:n==null?void 0:n.thumbnail,onChange:function(t){return r(function(i){return o()(o()({},i),{},{thumbnail:t.target.value})})}}),n!=null&&n.thumbnail?(0,e.jsx)("img",{src:n==null?void 0:n.thumbnail,alt:n==null?void 0:n.name,className:"w-full object-fit-cover",height:138}):(0,e.jsx)(w.Z,{}),(0,e.jsx)("div",{children:(0,e.jsx)(k.Z,{onChange:function(t){return P(t.target.checked)},checked:G,children:"Hi\u1EC3n th\u1ECB tr\xEAn trang ch\u1EE7"})})]})]})})})]})},de=ue},26805:function(Q,Z,a){a.d(Z,{d:function(){return o}});function E(m){return m.trim()}function o(m){return m?m==="vi-VN"?1:2:1}}}]);
