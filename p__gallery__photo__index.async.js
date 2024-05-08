"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5538],{71606:function(Q,x,e){var o=e(15558),_=e.n(o),C=e(90228),a=e.n(C),E=e(87999),m=e.n(E),l=e(48305),u=e.n(l),O=e(77642),j=e(23318),v=e(40292),t=e(68110),re=e(47686),J=e(53240),F=e(76477),ae=e(38844),P=e(93236),d=e(62086),w=function(c){var L=(0,P.useState)(""),G=u()(L,2),n=G[0],q=G[1],se=(0,P.useState)([]),$=u()(se,2),Z=$[0],I=$[1],oe=(0,P.useState)(!1),b=u()(oe,2),ee=b[0],K=b[1];function le(T){var p;try{p=new URL(T)}catch(B){return!1}return p.protocol==="https:"}var ie=function(){var T=m()(a()().mark(function p(){var B,U;return a()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:if(!(Z.length>0)){h.next=15;break}return B=new FormData,Z.forEach(function(ue){B.append("file",ue)}),K(!0),h.next=6,(0,O.IO)(B);case 6:if(U=h.sent,K(!1),U.succeeded){h.next=11;break}return t.ZP.error(U.message),h.abrupt("return");case 11:return I([]),c.onFinish(U),c.onCancel(),h.abrupt("return");case 15:if(le(n)){h.next=18;break}return t.ZP.error("Sorry, URL failed to upload."),h.abrupt("return");case 18:c.onFinish({url:n,succeeded:!0}),q(""),c.onCancel();case 21:case"end":return h.stop()}},p)}));return function(){return T.apply(this,arguments)}}();return(0,d.jsxs)(re.Z,{open:c.open,onCancel:function(){return c.onCancel()},centered:!0,title:"Upload",onOk:ie,confirmLoading:ee,children:[(0,d.jsx)("div",{className:"mb-4",children:(0,d.jsxs)(ae.Z,{fileList:Z,onRemove:function(p){var B=Z.indexOf(p),U=Z.slice();U.splice(B,1),I(U)},beforeUpload:function(p){return I([].concat(_()(Z),[p])),!1},maxCount:1,children:[(0,d.jsx)("p",{className:"ant-upload-drag-icon",children:(0,d.jsx)(j.Z,{})}),(0,d.jsx)("p",{className:"ant-upload-text",children:"Click or drag file to this area to upload"}),(0,d.jsx)("p",{className:"ant-upload-hint",children:"Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files."})]})}),(0,d.jsx)("div",{className:"text-center",children:(0,d.jsxs)("div",{className:"font-medium flex items-center gap-2 justify-center text-blue-500 text-base",children:[" ",(0,d.jsx)(v.Z,{})," Choose from your computer"]})}),(0,d.jsx)(J.Z,{children:"or"}),(0,d.jsx)(F.Z,{placeholder:"Paste image or URL",onChange:function(p){return q(p.currentTarget.value)}})]})};x.Z=w},3079:function(Q,x,e){e.r(x),e.d(x,{default:function(){return me}});var o=e(26068),_=e.n(o),C=e(90228),a=e.n(C),E=e(87999),m=e.n(E),l=e(48305),u=e.n(l),O=e(7411),j=e(38444),v=e(98365),t=e(20433),re=e(47686),J=e(69534),F=e(97146),ae=e(89631),P=e(55641),d=e(19991),w=e(58925),k=e(71606),c=e(93236),L=e(77642),G=e(42389),n=e(62086),q=function(W){var M=W.open,V=W.setOpen,X=(0,c.useState)(!1),A=u()(X,2),N=A[0],R=A[1],D=(0,c.useRef)(),S=(0,c.useState)(),H=u()(S,2),y=H[0],Y=H[1],z=function(){var s;(s=D.current)===null||s===void 0||s.reload()};return(0,n.jsxs)(re.Z,{width:1e3,open:M,title:"File Explorer",onCancel:function(){return V(!1)},footer:!1,centered:!0,children:[(0,n.jsxs)(J.Z,{gutter:16,children:[(0,n.jsx)(F.Z,{span:18,children:(0,n.jsx)(v.Z,{search:!1,columns:[{title:"#",valueType:"indexBorder"},{title:"Name",dataIndex:"fileName",render:function(s,r){return(0,n.jsx)(ae.Z,{title:s,children:(0,n.jsx)(P.ZP,{size:"small",onClick:function(){return Y(r)},type:"text",style:{maxWidth:300,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:s})})}},{title:"Size",dataIndex:"size",render:function(s,r){return(0,G.gB)(r.size)}},{title:"Upload",dataIndex:"createdDate",valueType:"dateTime",width:200},{title:"T\xE1c v\u1EE5",valueType:"option",render:function(){return[(0,n.jsx)(P.ZP,{size:"small",type:"text",icon:(0,n.jsx)(O.Z,{})})]},width:60}],size:"small",request:L.t4,actionRef:D,ghost:!0,toolBarRender:function(){return[(0,n.jsx)(P.ZP,{icon:(0,n.jsx)(j.Z,{}),type:"primary",onClick:function(){return R(!0)},children:"Upload"},"upload")]},pagination:{pageSize:5}})}),(0,n.jsx)(F.Z,{span:6,children:(0,n.jsx)(t.Z,{size:"small",title:"Preview",headerBordered:!0,bordered:!0,children:y?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"mb-2",children:(0,n.jsx)(d.Z,{src:y.url,height:150,style:{objectFit:"contain"}})}),(0,n.jsxs)("div",{className:"mb-2",children:["Size: ",(0,G.gB)(y.size)]}),(0,n.jsx)(P.ZP,{className:"w-full",type:"primary",children:"Ch\u1ECDn"})]}):(0,n.jsx)(w.Z,{})})})]}),(0,n.jsx)(k.Z,{open:N,onCancel:function(){return R(!1)},onFinish:z})]})},se=q,$=e(54885),Z=e(95306),I=e(1536),oe=e(14123),b=e(68110),ee=e(63134),K=e(37090),le=function(){var W=(0,K.useParams)(),M=W.id,V=$.A.useForm(),X=u()(V,1),A=X[0],N=(0,c.useState)(),R=u()(N,2),D=R[0],S=R[1],H=(0,c.useState)(!1),y=u()(H,2),Y=y[0],z=y[1];(0,c.useEffect)(function(){M&&(0,ee.uC)(M).then(function(r){r&&(A.setFields([{name:"id",value:r.id},{name:"title",value:r.title},{name:"description",value:r.description},{name:"thumbnail",value:r.thumbnail}]),r.thumbnail&&S(r.thumbnail))})},[M,D]);var i=function(f){A.setFieldValue("thumbnail",f.url),S(f.url)},s=function(){var r=m()(a()().mark(function f(ne){return a()().wrap(function(te){for(;;)switch(te.prev=te.next){case 0:return te.next=2,(0,ee.fj)(ne);case 2:b.ZP.success("L\u01B0u th\xE0nh c\xF4ng!");case 3:case"end":return te.stop()}},f)}));return function(ne){return r.apply(this,arguments)}}();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)($.A,{form:A,onFinish:s,children:[(0,n.jsx)(Z.Z,{name:"id",hidden:!0}),(0,n.jsxs)(J.Z,{gutter:16,children:[(0,n.jsxs)(F.Z,{span:16,children:[(0,n.jsx)(I.Z,{label:"Ti\xEAu \u0111\u1EC1",name:"title",rules:[{required:!0}]}),(0,n.jsx)(oe.Z,{label:"M\xF4 t\u1EA3",name:"description",tooltip:"Meta Description"}),(0,n.jsx)(I.Z,{label:"\u1EA2nh \u0111\u1EA1i di\u1EC7n",name:"thumbnail",fieldProps:{addonAfter:(0,n.jsx)(P.ZP,{icon:(0,n.jsx)(j.Z,{}),type:"text",size:"small",onClick:function(){return z(!0)},children:"Upload"})}})]}),(0,n.jsx)(F.Z,{span:8,children:(0,n.jsx)(t.Z,{bordered:!0,title:"\u1EA2nh \u0111\u1EA1i di\u1EC7n",headerBordered:!0,size:"small",children:D?(0,n.jsx)(d.Z,{src:D,className:"w-full object-cover h-48"}):(0,n.jsx)(w.Z,{})})})]})]}),(0,n.jsx)(k.Z,{open:Y,onCancel:function(){return z(!1)},onFinish:i})]})},ie=le,T=e(70474),p=e(22717),B=e(77097),U=e(58970),de=e(14292),h=e(53739),ue=function(){var W=(0,c.useState)(!1),M=u()(W,2),V=M[0],X=M[1],A=(0,c.useState)(!1),N=u()(A,2),R=N[0],D=N[1],S=(0,c.useRef)(),H=(0,K.useParams)(),y=H.id,Y=function(){var i=m()(a()().mark(function s(r){var f;return a()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return r.postId=y,r.fileId=r.id,g.next=4,(0,L.pA)(r);case 4:b.ZP.success("T\u1EA3i l\xEAn th\xE0nh c\xF4ng!"),(f=S.current)===null||f===void 0||f.reload();case 6:case"end":return g.stop()}},s)}));return function(r){return i.apply(this,arguments)}}(),z=function(){var i=m()(a()().mark(function s(r){var f;return a()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,(0,L.kd)(r);case 2:b.ZP.success("X\xF3a th\xE0nh c\xF4ng!"),(f=S.current)===null||f===void 0||f.reload();case 4:case"end":return g.stop()}},s)}));return function(r){return i.apply(this,arguments)}}();return(0,n.jsxs)(B._z,{extra:(0,n.jsxs)(de.Z,{children:[(0,n.jsx)(P.ZP,{icon:(0,n.jsx)(j.Z,{}),type:"primary",onClick:function(){return D(!0)},children:"T\u1EA3i l\xEAn"}),(0,n.jsx)(P.ZP,{icon:(0,n.jsx)(T.Z,{}),onClick:function(){return K.history.back()},children:"Quay l\u1EA1i"})]}),children:[(0,n.jsxs)(t.Z,{tabs:{type:"line"},children:[(0,n.jsx)(t.Z.TabPane,{tab:"Danh s\xE1ch",children:(0,n.jsx)(U.Rs,{actionRef:S,ghost:!0,pagination:{defaultPageSize:18},request:function(s){return(0,L.vs)(_()(_()({},s),{},{postId:y}))},grid:{gutter:16,column:6},renderItem:function(s){return(0,n.jsxs)("div",{className:"bg-white shadow",children:[(0,n.jsx)(d.Z,{src:s.url,className:"w-full object-cover",height:180,wrapperClassName:"w-full"}),(0,n.jsx)("div",{className:"p-1 flex justify-center",children:(0,n.jsx)(h.Z,{title:"X\xE1c nh\u1EADn x\xF3a",onConfirm:function(){return z(s.id)},children:(0,n.jsx)(P.ZP,{type:"text",icon:(0,n.jsx)(p.Z,{}),size:"small",danger:!0})})})]})}})},"list"),(0,n.jsx)(t.Z.TabPane,{tab:"C\xE0i \u0111\u1EB7t",children:(0,n.jsx)(ie,{})},"setting")]}),(0,n.jsx)(se,{open:V,setOpen:X}),(0,n.jsx)(k.Z,{open:R,onCancel:function(){return D(!1)},onFinish:Y})]})},me=ue},77642:function(Q,x,e){e.d(x,{IO:function(){return _},NR:function(){return u},TD:function(){return O},cI:function(){return l},ib:function(){return j},kd:function(){return m},pA:function(){return E},t4:function(){return C},vs:function(){return a}});var o=e(37090),_=function(t){return(0,o.request)("file/upload",{method:"POST",data:t,headers:{"Content-Type":"multipart/form-data"}})},C=function(t){return(0,o.request)("file/list",{params:t})},a=function(t){return(0,o.request)("gallery/photo/list",{params:t})},E=function(t){return(0,o.request)("gallery/photo/add",{method:"POST",data:t})},m=function(t){return(0,o.request)("gallery/photo/".concat(t),{method:"DELETE"})},l=function(t){return(0,o.request)("gallery/list",{params:t})},u=function(t){return(0,o.request)("gallery",{method:"POST",data:t})},O=function(t){return(0,o.request)("gallery",{method:"PUT",data:t})},j=function(t){return(0,o.request)("gallery/".concat(t),{method:"DELETE"})}},63134:function(Q,x,e){e.d(x,{AB:function(){return _},FO:function(){return a},fj:function(){return E},uC:function(){return C}});var o=e(37090),_=function(l){return(0,o.request)("post/get-list",{params:l})},C=function(l){return(0,o.request)("post/get/".concat(l))},a=function(l){return(0,o.request)("post/options",{params:l})},E=function(l){return(0,o.request)("post/page-builder/update",{method:"POST",data:l})}},42389:function(Q,x,e){e.d(x,{dK:function(){return _},gB:function(){return C}});function o(a){return a.trim()}function _(a){return a?a==="vi-VN"?1:2:1}function C(a){var E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,m=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,l=E?1e3:1024;if(Math.abs(a)<l)return a+" B";var u=E?["kB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],O=-1,j=Math.pow(10,m);do a/=l,++O;while(Math.round(Math.abs(a)*j)/j>=l&&O<u.length-1);return a.toFixed(m)+" "+u[O]}}}]);
