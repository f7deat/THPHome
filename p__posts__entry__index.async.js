"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6519],{96668:function(C,v,t){t.d(v,{W:function(){return s},h:function(){return e}});var e=function(r){return r[r.DEFAULT=0]="DEFAULT",r[r.PAGE=1]="PAGE",r[r.NEWS=2]="NEWS",r[r.NOTIFICATION=3]="NOTIFICATION",r[r.GALLERY=4]="GALLERY",r[r.ADMISSION=5]="ADMISSION",r}({}),s=[{value:e.PAGE,label:"Trang"},{value:e.NEWS,label:"Tin t\u1EE9c"},{value:e.NOTIFICATION,label:"Th\xF4ng b\xE1o"},{value:e.ADMISSION,label:"Tuy\u1EC3n sinh"}]},5691:function(C,v,t){t.r(v);var e=t(96668),s=t(82757),r=t(62086),o=function(){return(0,r.jsx)(s.Z,{type:e.h.DEFAULT})};v.default=o},82757:function(C,v,t){t.d(v,{Z:function(){return ot}});var e=t(26068),s=t.n(e),r=t(48305),o=t.n(r),l=t(68110),y=t(99082),d=t(55641),f=t(53739),i=t(22757),E=t(23713),g=t(93236),h=t(90530),u=t(69838),F=t(22717),K=t(76121),W=t(8221),z=t(28759),q=t(48486),H=t(21897),k=t(89631),B=t(37090),J=t(42389),V=t(77097),X=t(98365),R=t(63134),b=t(90228),U=t.n(b),Q=t(87999),$=t.n(Q),w=t(97474),_=t(25283),tt=t(1536),nt=t(14123),n=t(62086),et=function(p){var m=p.data,P=p.actionRef,N=p.setOpen,I=(0,g.useRef)();(0,g.useEffect)(function(){if(m){var O;(O=I.current)===null||O===void 0||O.setFields([{name:"title",value:m.title},{name:"description",value:m.description}])}},[JSON.stringify(m)]);var D=function(){var O=$()(U()().mark(function A(j){var T,M;return U()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return M=s()(s()({},m),{},{title:j.title,description:j.description}),S.next=3,(0,w.YS)(M);case 3:l.ZP.success("Nh\xE2n b\u1EA3n th\xE0nh c\xF4ng!"),N(!1),(T=P.current)===null||T===void 0||T.reload();case 6:case"end":return S.stop()}},A)}));return function(j){return O.apply(this,arguments)}}();return(0,n.jsxs)(_.Y,s()(s()({},p),{},{title:"Nh\xE2n b\u1EA3n",formRef:I,onFinish:D,children:[(0,n.jsx)(tt.Z,{label:"Ti\xEAu \u0111\u1EC1",name:"title",rules:[{required:!0}]}),(0,n.jsx)(nt.Z,{label:"M\xF4 t\u1EA3",name:"description"})]}))},rt=et,Z=t(96668),at=function(p){var m=p.type,P=(0,g.useRef)(),N=(0,B.useIntl)(),I=(0,g.useState)(!1),D=o()(I,2),O=D[0],A=D[1],j=(0,g.useState)(),T=o()(j,2),M=T[0],G=T[1],S=(0,g.useState)(!1),Y=o()(S,2),it=Y[0],st=Y[1];function lt(x){(0,B.request)("post/remove/".concat(x),{method:"POST"}).then(function(c){if(c.succeeded){var a;l.ZP.success("succeeded!"),(a=P.current)===null||a===void 0||a.reload()}else l.ZP.error("error!")})}function ct(x){(0,B.request)("post/active/".concat(x),{method:"POST"}).then(function(c){if(c.succeeded){var a;l.ZP.success(c.message),(a=P.current)===null||a===void 0||a.reload()}else l.ZP.error(c.message)})}var dt=function(c,a){c.key==="copy"&&(G(a),A(!0)),c.key==="zalo"&&(0,R.oA)(a.id).then(function(){st(!1),l.ZP.success("Chia s\u1EBB th\xE0nh c\xF4ng!")})},vt=[{title:"STT",valueType:"indexBorder",width:40,align:"center"},{title:"Ti\xEAu \u0111\u1EC1",dataIndex:"title",render:function(c,a){return(0,n.jsx)("a",{href:"https://dhhp.edu.vn/post/".concat(a.url,"-").concat(a.id,".html"),target:"_blank",rel:"noreferrer",children:a.title})}},{title:(0,n.jsx)(B.FormattedMessage,{id:"general.view"}),dataIndex:"view",valueType:"digit",search:!1,width:100,align:"center"},{title:"Tr\u1EA1ng th\xE1i",dataIndex:"status",valueEnum:{0:"Ch\u1EDD duy\u1EC7t",1:"\u0110\xE3 xu\u1EA5t b\u1EA3n"},render:function(c,a){return(0,n.jsx)(k.Z,{title:"Nh\u1EA5p \u0111\u1EC3 chuy\u1EC3n tr\u1EA1ng th\xE1i",children:(0,n.jsx)(y.Z,{color:a.status===1?"cyan":"gold",onClick:function(){return ct(a.id||0)},style:{cursor:"pointer"},children:a.status===1?"Xu\u1EA5t b\u1EA3n":"Ch\u1EDD duy\u1EC7t"})})},width:100},{title:"Ng\xE0y t\u1EA1o",dataIndex:"createdDate",valueType:"date",width:100,search:!1},{title:"Ng\xE0y c\u1EADp nh\u1EADt",dataIndex:"modifiedDate",valueType:"date",width:110,search:!1},{title:"\u0110\u0103ng b\u1EDFi",dataIndex:"createdBy",width:140,search:!1},{title:"T\xE1c v\u1EE5",render:function(c,a){return[(0,n.jsx)(k.Z,{title:"Page Builder",children:(0,n.jsx)(d.ZP,{size:"small",icon:(0,n.jsx)(h.Z,{}),hidden:m!==Z.h.DEFAULT&&m!==Z.h.PAGE,onClick:function(){B.history.push("/post/page/".concat(a.id))}})},"build"),(0,n.jsx)(B.Link,{to:"/post/setting/".concat(a.id),hidden:m===Z.h.DEFAULT,children:(0,n.jsx)(d.ZP,{type:"primary",size:"small",icon:(0,n.jsx)(u.Z,{})})},"edit"),(0,n.jsx)(f.Z,{title:"B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a?",onConfirm:function(){return lt(a.id||0)},okText:"Yes",cancelText:"No",children:(0,n.jsx)(d.ZP,{type:"primary",size:"small",danger:!0,icon:(0,n.jsx)(F.Z,{}),hidden:m===Z.h.DEFAULT})},"delete"),(0,n.jsx)(i.Z,{menu:{items:[{label:"Chia s\u1EBB l\xEAn Zalo OA",key:"zalo",icon:(0,n.jsx)(K.Z,{})},{label:"Nh\xE2n b\u1EA3n",key:"copy",icon:(0,n.jsx)(W.Z,{})},{label:"D\u1ECBch sang ng\xF4n ng\u1EEF kh\xE1c",key:"translate",icon:(0,n.jsx)(z.Z,{})}],onClick:function(ft){return dt(ft,a)}},children:(0,n.jsx)(d.ZP,{size:"small",icon:(0,n.jsx)(q.Z,{})})},"more")]},valueType:"option",width:100,align:"center"}];return(0,n.jsxs)(V._z,{extra:(0,n.jsx)(B.Link,{to:"/post/setting",children:(0,n.jsx)(d.ZP,{type:"primary",icon:(0,n.jsx)(H.Z,{}),children:"B\xE0i vi\u1EBFt m\u1EDBi"})}),children:[(0,n.jsx)(X.Z,{actionRef:P,request:function(c){return(0,R.AB)(s()(s()({},c),{},{type:m,language:(0,J.dK)(N.locale),pageIndex:c.current}))},search:{layout:"vertical"},columns:vt,rowKey:"id"}),(0,n.jsx)(rt,{open:O,onOpenChange:A,data:M,actionRef:P,setOpen:A}),(0,n.jsx)(E.Z,{spinning:it,fullscreen:!0})]})},ot=at},97474:function(C,v,t){t.d(v,{Ap:function(){return r},B:function(){return E},IY:function(){return f},Ky:function(){return d},ND:function(){return l},Wt:function(){return i},YS:function(){return g},g_:function(){return y},lq:function(){return s},nt:function(){return o}});var e=t(37090),s=function(u){return(0,e.request)("block/sort-order",{method:"POST",data:u})},r=function(u){return(0,e.request)("block/delete/".concat(u),{method:"POST"})},o=function(u){return(0,e.request)("block/add",{method:"POST",data:u})},l=function(u){return(0,e.request)("block/save-info",{method:"POST",data:u})},y=function(u){return(0,e.request)("block/list/".concat(u))},d=function(u){return(0,e.request)("block/".concat(u))},f=function(u){return(0,e.request)("block/active/".concat(u),{method:"POST"})},i=function(){return(0,e.request)("block/options")},E=function(u,F){return(0,e.request)("block/save/".concat(u),{method:"POST",data:F})},g=function(u){return(0,e.request)("block/copy",{method:"POST",data:u})}},63134:function(C,v,t){t.d(v,{AB:function(){return s},FO:function(){return o},HO:function(){return d},fj:function(){return l},oA:function(){return y},uC:function(){return r}});var e=t(37090),s=function(i){return(0,e.request)("post/get-list",{params:i})},r=function(i){return(0,e.request)("post/get/".concat(i))},o=function(i){return(0,e.request)("post/options",{params:i})},l=function(i){return(0,e.request)("post/page-builder/update",{method:"POST",data:i})},y=function(i){return(0,e.request)("post/zalo/share/".concat(i),{method:"POST"})},d=function(){return(0,e.request)("post/chart-post-created-in-year")}},42389:function(C,v,t){t.d(v,{dK:function(){return s},gB:function(){return r}});function e(o){return o.trim()}function s(o){return o?o==="vi-VN"?1:2:1}function r(o){var l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,y=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,d=l?1e3:1024;if(Math.abs(o)<d)return o+" B";var f=l?["kB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],i=-1,E=Math.pow(10,y);do o/=d,++i;while(Math.round(Math.abs(o)*E)/E>=d&&i<f.length-1);return o.toFixed(y)+" "+f[i]}}}]);
