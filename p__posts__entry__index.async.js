"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6519],{96668:function(j,v,t){t.d(v,{W:function(){return i},h:function(){return e}});var e=function(r){return r[r.DEFAULT=0]="DEFAULT",r[r.PAGE=1]="PAGE",r[r.NEWS=2]="NEWS",r[r.NOTIFICATION=3]="NOTIFICATION",r[r.GALLERY=4]="GALLERY",r[r.ADMISSION=5]="ADMISSION",r}({}),i=[{value:e.PAGE,label:"Trang"},{value:e.NEWS,label:"Tin t\u1EE9c"},{value:e.NOTIFICATION,label:"Th\xF4ng b\xE1o"},{value:e.ADMISSION,label:"Tuy\u1EC3n sinh"}]},5691:function(j,v,t){t.r(v);var e=t(96668),i=t(82757),r=t(62086),u=function(){return(0,r.jsx)(i.Z,{type:e.h.DEFAULT})};v.default=u},82757:function(j,v,t){t.d(v,{Z:function(){return ut}});var e=t(26068),i=t.n(e),r=t(48305),u=t.n(r),c=t(68110),m=t(99082),s=t(55641),l=t(53739),x=t(22757),O=t(23713),g=t(93236),f=t(90530),o=t(69838),F=t(22717),W=t(76121),z=t(8221),Y=t(28759),q=t(48486),b=t(21897),k=t(89631),B=t(37090),J=t(42389),V=t(77097),H=t(98365),R=t(63134),Q=t(90228),U=t.n(Q),X=t(87999),$=t.n(X),w=t(97474),_=t(25283),tt=t(1536),nt=t(14123),n=t(62086),et=function(A){var h=A.data,p=A.actionRef,L=A.setOpen,I=(0,g.useRef)();(0,g.useEffect)(function(){if(h){var E;(E=I.current)===null||E===void 0||E.setFields([{name:"title",value:h.title},{name:"description",value:h.description}])}},[JSON.stringify(h)]);var D=function(){var E=$()(U()().mark(function P(C){var S,M;return U()().wrap(function(T){for(;;)switch(T.prev=T.next){case 0:return M=i()(i()({},h),{},{title:C.title,description:C.description}),T.next=3,(0,w.YS)(M);case 3:c.ZP.success("Nh\xE2n b\u1EA3n th\xE0nh c\xF4ng!"),L(!1),(S=p.current)===null||S===void 0||S.reload();case 6:case"end":return T.stop()}},P)}));return function(C){return E.apply(this,arguments)}}();return(0,n.jsxs)(_.Y,i()(i()({},A),{},{title:"Nh\xE2n b\u1EA3n",formRef:I,onFinish:D,children:[(0,n.jsx)(tt.Z,{label:"Ti\xEAu \u0111\u1EC1",name:"title",rules:[{required:!0}]}),(0,n.jsx)(nt.Z,{label:"M\xF4 t\u1EA3",name:"description"})]}))},rt=et,Z=t(96668),at=function(A){var h=A.type,p=(0,g.useRef)(),L=(0,B.useIntl)(),I=(0,g.useState)(!1),D=u()(I,2),E=D[0],P=D[1],C=(0,g.useState)(),S=u()(C,2),M=S[0],G=S[1],T=(0,g.useState)(!1),K=u()(T,2),it=K[0],st=K[1];function lt(y){(0,B.request)("post/remove/".concat(y),{method:"POST"}).then(function(d){if(d.succeeded){var a;c.ZP.success("succeeded!"),(a=p.current)===null||a===void 0||a.reload()}else c.ZP.error("error!")})}function ct(y){(0,B.request)("post/active/".concat(y),{method:"POST"}).then(function(d){if(d.succeeded){var a;c.ZP.success(d.message),(a=p.current)===null||a===void 0||a.reload()}else c.ZP.error(d.message)})}var dt=function(d,a){d.key==="copy"&&(G(a),P(!0)),d.key==="zalo"&&(0,R.oA)(a.id).then(function(){st(!1),c.ZP.success("Chia s\u1EBB th\xE0nh c\xF4ng!")})},vt=[{title:"STT",valueType:"indexBorder",width:40,align:"center"},{title:"Ti\xEAu \u0111\u1EC1",dataIndex:"title",render:function(d,a){return(0,n.jsx)("a",{href:"https://dhhp.edu.vn/post/".concat(a.url,"-").concat(a.id,".html"),target:"_blank",rel:"noreferrer",children:a.title})}},{title:(0,n.jsx)(B.FormattedMessage,{id:"general.view"}),dataIndex:"view",valueType:"digit",search:!1,width:100,align:"center"},{title:"Tr\u1EA1ng th\xE1i",dataIndex:"status",valueEnum:{0:"Ch\u1EDD duy\u1EC7t",1:"\u0110\xE3 xu\u1EA5t b\u1EA3n",2:"\u0110\xE3 x\xF3a"},render:function(d,a){return(0,n.jsx)(k.Z,{title:"Nh\u1EA5p \u0111\u1EC3 chuy\u1EC3n tr\u1EA1ng th\xE1i",children:(0,n.jsx)(m.Z,{color:a.status===1?"cyan":"gold",onClick:function(){return ct(a.id||0)},style:{cursor:"pointer"},children:a.status===1?"xu\u1EA5t b\u1EA3n":"ch\u1EDD duy\u1EC7t"})})},width:100},{title:"Ng\xE0y xu\u1EA5t b\u1EA3n",dataIndex:"modifiedDate",valueType:"date",width:140,search:!1},{title:"\u0110\u0103ng b\u1EDFi",dataIndex:"createdBy",width:140,search:!1},{title:"T\xE1c v\u1EE5",render:function(d,a){return[(0,n.jsx)(k.Z,{title:"Page Builder",children:(0,n.jsx)(s.ZP,{size:"small",icon:(0,n.jsx)(f.Z,{}),hidden:h!==Z.h.DEFAULT&&h!==Z.h.PAGE,onClick:function(){B.history.push("/post/page/".concat(a.id))}})},"build"),(0,n.jsx)(B.Link,{to:"/post/setting/".concat(a.id),hidden:h===Z.h.DEFAULT,children:(0,n.jsx)(s.ZP,{type:"primary",size:"small",icon:(0,n.jsx)(o.Z,{})})},"edit"),(0,n.jsx)(l.Z,{title:"B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a?",onConfirm:function(){return lt(a.id||0)},okText:"Yes",cancelText:"No",children:(0,n.jsx)(s.ZP,{type:"primary",size:"small",danger:!0,icon:(0,n.jsx)(F.Z,{}),hidden:h===Z.h.DEFAULT})},"delete"),(0,n.jsx)(x.Z,{menu:{items:[{label:"Chia s\u1EBB l\xEAn Zalo OA",key:"zalo",icon:(0,n.jsx)(W.Z,{})},{label:"Nh\xE2n b\u1EA3n",key:"copy",icon:(0,n.jsx)(z.Z,{})},{label:"D\u1ECBch sang ng\xF4n ng\u1EEF kh\xE1c",key:"translate",icon:(0,n.jsx)(Y.Z,{})}],onClick:function(ft){return dt(ft,a)}},children:(0,n.jsx)(s.ZP,{size:"small",icon:(0,n.jsx)(q.Z,{})})},"more")]},valueType:"option",width:100,align:"center"}];return(0,n.jsxs)(V._z,{extra:(0,n.jsx)(B.Link,{to:"/post/setting",children:(0,n.jsx)(s.ZP,{type:"primary",icon:(0,n.jsx)(b.Z,{}),children:"B\xE0i vi\u1EBFt m\u1EDBi"})}),children:[(0,n.jsx)(H.Z,{actionRef:p,request:function(d){return(0,R.AB)(i()(i()({},d),{},{type:h,language:(0,J.dK)(L.locale),pageIndex:d.current}))},search:{layout:"vertical"},columns:vt,rowKey:"id"}),(0,n.jsx)(rt,{open:E,onOpenChange:P,data:M,actionRef:p,setOpen:P}),(0,n.jsx)(O.Z,{spinning:it,fullscreen:!0})]})},ut=at},97474:function(j,v,t){t.d(v,{Ap:function(){return r},B:function(){return O},IY:function(){return l},Ky:function(){return s},ND:function(){return c},Wt:function(){return x},YS:function(){return g},g_:function(){return m},lq:function(){return i},nt:function(){return u}});var e=t(37090),i=function(o){return(0,e.request)("block/sort-order",{method:"POST",data:o})},r=function(o){return(0,e.request)("block/delete/".concat(o),{method:"POST"})},u=function(o){return(0,e.request)("block/add",{method:"POST",data:o})},c=function(o){return(0,e.request)("block/save-info",{method:"POST",data:o})},m=function(o){return(0,e.request)("block/list/".concat(o))},s=function(o){return(0,e.request)("block/".concat(o))},l=function(o){return(0,e.request)("block/active/".concat(o),{method:"POST"})},x=function(){return(0,e.request)("block/options")},O=function(o,F){return(0,e.request)("block/save/".concat(o),{method:"POST",data:F})},g=function(o){return(0,e.request)("block/copy",{method:"POST",data:o})}},63134:function(j,v,t){t.d(v,{AB:function(){return i},FO:function(){return u},fj:function(){return c},oA:function(){return m},uC:function(){return r}});var e=t(37090),i=function(l){return(0,e.request)("post/get-list",{params:l})},r=function(l){return(0,e.request)("post/get/".concat(l))},u=function(l){return(0,e.request)("post/options",{params:l})},c=function(l){return(0,e.request)("post/page-builder/update",{method:"POST",data:l})},m=function(l){return(0,e.request)("post/zalo/share/".concat(l),{method:"POST"})}},42389:function(j,v,t){t.d(v,{dK:function(){return i},gB:function(){return r}});function e(u){return u.trim()}function i(u){return u?u==="vi-VN"?1:2:1}function r(u){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,m=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,s=c?1e3:1024;if(Math.abs(u)<s)return u+" B";var l=c?["kB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],x=-1,O=Math.pow(10,m);do u/=s,++x;while(Math.round(Math.abs(u)*O)/O>=s&&x<l.length-1);return u.toFixed(m)+" "+l[x]}}}]);
