"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3906],{96668:function(j,v,t){t.d(v,{W:function(){return i},h:function(){return e}});var e=function(a){return a[a.DEFAULT=0]="DEFAULT",a[a.PAGE=1]="PAGE",a[a.NEWS=2]="NEWS",a[a.NOTIFICATION=3]="NOTIFICATION",a}({}),i=[{value:e.PAGE,label:"Trang"},{value:e.NEWS,label:"Tin t\u1EE9c"},{value:e.NOTIFICATION,label:"Th\xF4ng b\xE1o"}]},51481:function(j,v,t){t.r(v);var e=t(96668),i=t(82757),a=t(62086),o=function(){return(0,a.jsx)(i.Z,{type:e.h.NOTIFICATION})};v.default=o},82757:function(j,v,t){t.d(v,{Z:function(){return at}});var e=t(26068),i=t.n(e),a=t(48305),o=t.n(a),c=t(68110),m=t(99082),s=t(55641),l=t(53739),x=t(22757),p=t(23713),y=t(93236),f=t(90530),u=t(69838),M=t(22717),z=t(76121),G=t(8221),Y=t(28759),q=t(48486),J=t(21897),L=t(89631),B=t(37090),V=t(42389),b=t(77097),H=t(98365),U=t(63134),Q=t(90228),R=t.n(Q),X=t(87999),$=t.n(X),w=t(97474),_=t(25283),tt=t(1536),nt=t(14123),n=t(62086),et=function(P){var h=P.data,E=P.actionRef,N=P.setOpen,I=(0,y.useRef)();(0,y.useEffect)(function(){if(h){var O;(O=I.current)===null||O===void 0||O.setFields([{name:"title",value:h.title},{name:"description",value:h.description}])}},[JSON.stringify(h)]);var F=function(){var O=$()(R()().mark(function T(C){var A,D;return R()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return D=i()(i()({},h),{},{title:C.title,description:C.description}),S.next=3,(0,w.YS)(D);case 3:c.ZP.success("Nh\xE2n b\u1EA3n th\xE0nh c\xF4ng!"),N(!1),(A=E.current)===null||A===void 0||A.reload();case 6:case"end":return S.stop()}},T)}));return function(C){return O.apply(this,arguments)}}();return(0,n.jsxs)(_.Y,i()(i()({},P),{},{title:"Nh\xE2n b\u1EA3n",formRef:I,onFinish:F,children:[(0,n.jsx)(tt.Z,{label:"Ti\xEAu \u0111\u1EC1",name:"title",rules:[{required:!0}]}),(0,n.jsx)(nt.Z,{label:"M\xF4 t\u1EA3",name:"description"})]}))},rt=et,Z=t(96668),ot=function(P){var h=P.type,E=(0,y.useRef)(),N=(0,B.useIntl)(),I=(0,y.useState)(!1),F=o()(I,2),O=F[0],T=F[1],C=(0,y.useState)(),A=o()(C,2),D=A[0],K=A[1],S=(0,y.useState)(!1),W=o()(S,2),it=W[0],st=W[1];function lt(g){(0,B.request)("post/remove/".concat(g),{method:"POST"}).then(function(d){if(d.succeeded){var r;c.ZP.success("succeeded!"),(r=E.current)===null||r===void 0||r.reload()}else c.ZP.error("error!")})}function ct(g){(0,B.request)("post/active/".concat(g),{method:"POST"}).then(function(d){if(d.succeeded){var r;c.ZP.success(d.message),(r=E.current)===null||r===void 0||r.reload()}else c.ZP.error(d.message)})}var dt=function(d,r){d.key==="copy"&&(K(r),T(!0)),d.key==="zalo"&&(0,U.oA)(r.id).then(function(){st(!1),c.ZP.success("Chia s\u1EBB th\xE0nh c\xF4ng!")})},vt=[{title:"STT",valueType:"indexBorder",width:40,align:"center"},{title:"Ti\xEAu \u0111\u1EC1",dataIndex:"title",render:function(d,r){return(0,n.jsx)("a",{href:"https://dhhp.edu.vn/post/".concat(r.url,"-").concat(r.id,".html"),target:"_blank",rel:"noreferrer",children:r.title})}},{title:(0,n.jsx)(B.FormattedMessage,{id:"general.view"}),dataIndex:"view",valueType:"digit",search:!1,width:100,align:"center"},{title:"Tr\u1EA1ng th\xE1i",dataIndex:"status",valueEnum:{0:"Ch\u1EDD duy\u1EC7t",1:"\u0110\xE3 xu\u1EA5t b\u1EA3n",2:"\u0110\xE3 x\xF3a"},render:function(d,r){return(0,n.jsx)(L.Z,{title:"Nh\u1EA5p \u0111\u1EC3 chuy\u1EC3n tr\u1EA1ng th\xE1i",children:(0,n.jsx)(m.Z,{color:r.status===1?"cyan":"gold",onClick:function(){return ct(r.id||0)},style:{cursor:"pointer"},children:r.status===1?"xu\u1EA5t b\u1EA3n":"ch\u1EDD duy\u1EC7t"})})},width:100},{title:"Ng\xE0y xu\u1EA5t b\u1EA3n",dataIndex:"modifiedDate",valueType:"date",width:140,search:!1},{title:"\u0110\u0103ng b\u1EDFi",dataIndex:"createdBy",width:140,search:!1},{title:"T\xE1c v\u1EE5",render:function(d,r){return[(0,n.jsx)(L.Z,{title:"Page Builder",children:(0,n.jsx)(s.ZP,{size:"small",icon:(0,n.jsx)(f.Z,{}),hidden:h!==Z.h.DEFAULT&&h!==Z.h.PAGE,onClick:function(){B.history.push("/post/page/".concat(r.id))}})},"build"),(0,n.jsx)(B.Link,{to:"/post/setting/".concat(r.id),hidden:h===Z.h.DEFAULT,children:(0,n.jsx)(s.ZP,{type:"primary",size:"small",icon:(0,n.jsx)(u.Z,{})})},"edit"),(0,n.jsx)(l.Z,{title:"B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a?",onConfirm:function(){return lt(r.id||0)},okText:"Yes",cancelText:"No",children:(0,n.jsx)(s.ZP,{type:"primary",size:"small",danger:!0,icon:(0,n.jsx)(M.Z,{}),hidden:h===Z.h.DEFAULT})},"delete"),(0,n.jsx)(x.Z,{menu:{items:[{label:"Chia s\u1EBB l\xEAn Zalo OA",key:"zalo",icon:(0,n.jsx)(z.Z,{})},{label:"Nh\xE2n b\u1EA3n",key:"copy",icon:(0,n.jsx)(G.Z,{})},{label:"D\u1ECBch sang ng\xF4n ng\u1EEF kh\xE1c",key:"translate",icon:(0,n.jsx)(Y.Z,{})}],onClick:function(ft){return dt(ft,r)}},children:(0,n.jsx)(s.ZP,{size:"small",icon:(0,n.jsx)(q.Z,{})})},"more")]},valueType:"option",width:100,align:"center"}];return(0,n.jsxs)(b._z,{extra:(0,n.jsx)(B.Link,{to:"/post/setting",children:(0,n.jsx)(s.ZP,{type:"primary",icon:(0,n.jsx)(J.Z,{}),children:"B\xE0i vi\u1EBFt m\u1EDBi"})}),children:[(0,n.jsx)(H.Z,{actionRef:E,request:function(d){return(0,U.AB)(i()(i()({},d),{},{type:h,language:(0,V.dK)(N.locale),pageIndex:d.current}))},search:{layout:"vertical"},columns:vt,rowKey:"id"}),(0,n.jsx)(rt,{open:O,onOpenChange:T,data:D,actionRef:E,setOpen:T}),(0,n.jsx)(p.Z,{spinning:it,fullscreen:!0})]})},at=ot},97474:function(j,v,t){t.d(v,{Ap:function(){return a},B:function(){return p},IY:function(){return l},Ky:function(){return s},ND:function(){return c},Wt:function(){return x},YS:function(){return y},g_:function(){return m},lq:function(){return i},nt:function(){return o}});var e=t(37090),i=function(u){return(0,e.request)("block/sort-order",{method:"POST",data:u})},a=function(u){return(0,e.request)("block/delete/".concat(u),{method:"POST"})},o=function(u){return(0,e.request)("block/add",{method:"POST",data:u})},c=function(u){return(0,e.request)("block/save-info",{method:"POST",data:u})},m=function(u){return(0,e.request)("block/list/".concat(u))},s=function(u){return(0,e.request)("block/".concat(u))},l=function(u){return(0,e.request)("block/active/".concat(u),{method:"POST"})},x=function(){return(0,e.request)("block/options")},p=function(u,M){return(0,e.request)("block/save/".concat(u),{method:"POST",data:M})},y=function(u){return(0,e.request)("block/copy",{method:"POST",data:u})}},63134:function(j,v,t){t.d(v,{AB:function(){return i},FO:function(){return o},fj:function(){return c},oA:function(){return m},uC:function(){return a}});var e=t(37090),i=function(l){return(0,e.request)("post/get-list",{params:l})},a=function(l){return(0,e.request)("post/get/".concat(l))},o=function(l){return(0,e.request)("post/options",{params:l})},c=function(l){return(0,e.request)("post/page-builder/update",{method:"POST",data:l})},m=function(l){return(0,e.request)("post/zalo/share/".concat(l),{method:"POST"})}},42389:function(j,v,t){t.d(v,{dK:function(){return i},gB:function(){return a}});function e(o){return o.trim()}function i(o){return o?o==="vi-VN"?1:2:1}function a(o){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,m=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,s=c?1e3:1024;if(Math.abs(o)<s)return o+" B";var l=c?["kB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],x=-1,p=Math.pow(10,m);do o/=s,++x;while(Math.round(Math.abs(o)*p)/p>=s&&x<l.length-1);return o.toFixed(m)+" "+l[x]}}}]);
