"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9229],{86444:function(ie,M,n){var G=n(53939),m=n.n(G),X=n(83134),Z=n.n(X),k=n(4870),h=n(46665),r=n(68136),j=n(44949),z=n(58703),f=n(33130),U=function(E){var O=k.Z.useFormInstance(),S=(0,r.useRef)(null),g=function(){if(S.current){var v;O.setFieldValue(E.name,(v=S.current)===null||v===void 0?void 0:v.getContent())}};return(0,f.jsx)(f.Fragment,{children:(0,f.jsx)(j.M,{onChange:g,onInit:function(v,R){return S.current=R},apiKey:"mn4nbwhddqp9jr1g1c3w17dkdu96ji7lr2fmolsncez1k3ng",init:{plugins:"anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",toolbar:"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",file_picker_types:"file image media",file_picker_callback:function(v,R,b){if(b.filetype=="file"&&v("mypage.html",{text:"My text"}),b.filetype=="image"){var F=document.createElement("input");F.setAttribute("type","file"),F.setAttribute("accept","image/*"),F.addEventListener("change",function(){var p=Z()(m()().mark(function B(J){var A,i,e;return m()().wrap(function(y){for(;;)switch(y.prev=y.next){case 0:return A=J.target.files[0],i=new FormData,i.append("file",A),y.next=5,(0,z.request)("file/image/upload",{data:i,method:"POST"});case 5:e=y.sent,e&&(h.ZP.success("T\u1EA3i l\xEAn th\xE0nh c\xF4ng!"),v(e.url,{alt:"My alt text"}));case 7:case"end":return y.stop()}},B)}));return function(B){return p.apply(this,arguments)}}()),F.click()}b.filetype=="media"&&v("movie.mp4",{source2:"alt.ogg",poster:"image.jpg"})}},initialValue:O.getFieldValue(E.name)})})};M.Z=U},69347:function(ie,M,n){n.r(M),n.d(M,{default:function(){return le}});var G=n(53939),m=n.n(G),X=n(83134),Z=n.n(X),k=n(34827),h=n.n(k),r=n(4870),j=n(46665),z=n(41605),f=n(15621),U=n(30339),_=n(13762),E=n(2537),O=n(88094),S=n(85638),g=n(10483),L=n(24991),v=n(50775),R=n(62960),b=n(2099),F=n(18186),p=n(68136),B=n(49799),J=n(25223),A=n(86444),i=n(58703),e=n(33130),ee=function(K){var x=K.activeTab,Q=K.fetchData,$=r.Z.useForm(),Y=h()($,1),C=Y[0],w=function(){var c=Z()(m()().mark(function T(D){var I;return m()().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return P.next=2,(0,i.request)("department/update-detail",{method:"POST",data:D});case 2:I=P.sent,I.succeeded&&j.ZP.success("Th\xE0nh c\xF4ng!");case 4:case"end":return P.stop()}},T)}));return function(D){return c.apply(this,arguments)}}();(0,p.useEffect)(function(){x&&(0,i.request)("department/detail/content/".concat(x)).then(function(c){c.data&&C.setFields([{name:"id",value:c.data.id},{name:"type",value:c.data.type},{name:"content",value:c.data.content}])})},[]);var W=function(){var c=Z()(m()().mark(function T(){var D;return m()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,l.next=3,(0,i.request)("department/detail/delete/".concat(x),{method:"POST"});case 3:D=l.sent,D.data&&(j.ZP.success("Th\xE0nh c\xF4ng!"),Q()),l.next=9;break;case 7:l.prev=7,l.t0=l.catch(0);case 9:case"end":return l.stop()}},T,null,[[0,7]])}));return function(){return c.apply(this,arguments)}}();return(0,e.jsxs)(r.Z,{form:C,layout:"vertical",onFinish:w,children:[(0,e.jsx)(r.Z.Item,{name:"id",hidden:!0,children:(0,e.jsx)(g.Z,{})}),(0,e.jsx)(r.Z.Item,{name:"type",label:"Ti\xEAu \u0111\u1EC1",required:!0,children:(0,e.jsx)(g.Z,{})}),(0,e.jsx)(r.Z.Item,{name:"content",label:"N\u1ED9i dung",required:!0,children:(0,e.jsx)(A.Z,{name:"content"})}),(0,e.jsxs)("div",{className:"flex justify-end gap-4",children:[(0,e.jsx)(f.ZP,{type:"primary",htmlType:"submit",children:"L\u01B0u l\u1EA1i"}),(0,e.jsx)(U.Z,{title:"X\xE1c nh\u1EADn x\xF3a?",onConfirm:function(){return W()},children:(0,e.jsx)(f.ZP,{type:"primary",danger:!0,children:"X\xF3a"})})]})]})},y=function(){var K=(0,i.useParams)(),x=K.id,Q=(0,p.useState)(!1),$=h()(Q,2),Y=$[0],C=$[1],w=(0,p.useState)([]),W=h()(w,2),c=W[0],T=W[1],D=(0,p.useState)(),I=h()(D,2),l=I[0],P=I[1],oe=r.Z.useForm(),de=h()(oe,1),ne=de[0],me=(0,p.useState)([]),te=h()(me,2),ce=te[0],he=te[1],fe=(0,p.useState)([]),re=h()(fe,2),ve=re[0],pe=re[1],je=(0,p.useState)(),ae=h()(je,2),ge=ae[0],se=ae[1],xe=r.Z.useForm(),Ee=h()(xe,1),H=Ee[0],q=function(){(0,i.request)("department/detail/".concat(x)).then(function(t){T(t),t&&t.length>0&&se(t[0].id)})},N=function(){(0,i.request)("department/users-in-department/".concat(x)).then(function(t){pe(t)})};(0,p.useEffect)(function(){(0,i.request)("department/".concat(x)).then(function(a){P(a)}),q(),(0,i.request)("user/select").then(function(a){he(a)}),N()},[]);var Ze=function(){var a=Z()(m()().mark(function t(s){var o;return m()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:if(s.departmentId=x,!s.id){d.next=4;break}d.next=8;break;case 4:return d.next=6,(0,i.request)("department/add-detail",{method:"POST",data:s});case 6:o=d.sent,o.succeeded&&(j.ZP.success("Th\xE0nh c\xF4ng!"),C(!1),q());case 8:case"end":return d.stop()}},t)}));return function(s){return a.apply(this,arguments)}}(),ye=function(){var a=Z()(m()().mark(function t(s){var o,V;return m()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:if(u.prev=0,s.departmentId=x,!s.id){u.next=9;break}return u.next=5,(0,i.request)("department/update-user",{method:"POST",data:s});case 5:return o=u.sent,o.data&&(j.ZP.success("Th\xE0nh c\xF4ng!"),N()),H.resetFields(),u.abrupt("return");case 9:return u.next=11,(0,i.request)("department/add-user",{method:"POST",data:s});case 11:V=u.sent,V&&(j.ZP.success("Th\xE0nh c\xF4ng!"),N()),H.resetFields(),u.next=20;break;case 16:u.prev=16,u.t0=u.catch(0),console.log(u.t0),j.ZP.error("C\xF3 l\u1ED7i x\u1EA3y ra!");case 20:case"end":return u.stop()}},t,null,[[0,16]])}));return function(s){return a.apply(this,arguments)}}(),Te=function(t,s){var o;return((o=s==null?void 0:s.label)!==null&&o!==void 0?o:"").toLowerCase().includes(t.toLowerCase())},De=function(){var a=Z()(m()().mark(function t(s){var o;return m()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,(0,i.request)("department/remove-user/".concat(s),{method:"POST"});case 2:o=d.sent,o.succeeded&&(j.ZP.success("Th\xE0nh c\xF4ng!"),N());case 4:case"end":return d.stop()}},t)}));return function(s){return a.apply(this,arguments)}}(),Pe=function(t){H.setFields([{name:"id",value:t.id},{name:"userId",value:t.userId},{name:"rank",value:t.rank},{name:"type",value:t.type},{name:"jobTitle",value:t.jobTitle}])},Fe=[{title:"Rank",dataIndex:"rank"},{title:"H\u1ECD v\xE0 t\xEAn",dataIndex:"name"},{title:"Ch\u1EE9c danh",dataIndex:"jobTitle"},{title:"T\xE1c v\u1EE5",render:function(t,s){return(0,e.jsxs)(z.Z,{children:[(0,e.jsx)(f.ZP,{icon:(0,e.jsx)(B.Z,{}),onClick:function(){return Pe(s)}}),(0,e.jsx)(U.Z,{title:"X\xE1c nh\u1EADn x\xF3a?",onConfirm:function(){return De(s.id)},children:(0,e.jsx)(f.ZP,{type:"primary",danger:!0,icon:(0,e.jsx)(J.Z,{})})})]})}}];return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(_.Z,{gutter:16,children:[(0,e.jsx)(E.Z,{span:16,children:(0,e.jsx)(O.Z,{title:l==null?void 0:l.name,extra:(0,e.jsx)(f.ZP,{type:"primary",onClick:function(){ne.resetFields(),C(!0)},children:"Th\xEAm m\u1EDBi"}),children:(0,e.jsx)(S.Z,{type:"card",onChange:function(t){se(t)},items:c==null?void 0:c.map(function(a){return{label:a.type,key:a.id,children:(0,e.jsx)(ee,{activeTab:ge,fetchData:q})}})})})}),(0,e.jsx)(E.Z,{span:8,children:(0,e.jsxs)(O.Z,{title:"C\u01A1 c\u1EA5u t\u1ED5 ch\u1EE9c",children:[(0,e.jsxs)(r.Z,{layout:"vertical",onFinish:ye,form:H,children:[(0,e.jsx)(r.Z.Item,{name:"id",hidden:!0,children:(0,e.jsx)(g.Z,{})}),(0,e.jsx)(r.Z.Item,{name:"userId",label:"Th\xE0nh vi\xEAn",rules:[{required:!0,message:"Vui l\xF2ng ch\u1ECDn th\xE0nh vi\xEAn"}],children:(0,e.jsx)(L.Z,{options:ce,showSearch:!0,filterOption:Te})}),(0,e.jsxs)(_.Z,{gutter:8,children:[(0,e.jsx)(E.Z,{span:6,children:(0,e.jsx)(r.Z.Item,{name:"rank",label:"Rank",children:(0,e.jsx)(v.Z,{className:"w-full"})})}),(0,e.jsx)(E.Z,{span:9,children:(0,e.jsx)(r.Z.Item,{name:"type",required:!0,label:"Nh\xF3m",children:(0,e.jsx)(g.Z,{})})}),(0,e.jsx)(E.Z,{span:9,children:(0,e.jsx)(r.Z.Item,{name:"jobTitle",label:"Ch\u1EE9c danh",children:(0,e.jsx)(g.Z,{})})})]}),(0,e.jsx)(r.Z.Item,{children:(0,e.jsx)(f.ZP,{type:"primary",htmlType:"submit",className:"w-full",children:"L\u01B0u l\u1EA1i"})})]}),(0,e.jsx)(R.Z,{children:"Th\xE0nh vi\xEAn trong Vi\u1EC7n - Khoa"}),(0,e.jsx)(b.Z,{dataSource:ve,rowKey:"id",columns:Fe})]})})]}),(0,e.jsx)(F.Z,{title:"Khoa - Vi\u1EC7n",open:Y,onCancel:function(){C(!1)},footer:!1,children:(0,e.jsxs)(r.Z,{layout:"vertical",onFinish:Ze,form:ne,children:[(0,e.jsx)(r.Z.Item,{name:"id",hidden:!0,children:(0,e.jsx)(g.Z,{})}),(0,e.jsx)(r.Z.Item,{label:"Nh\xF3m",name:"type",rules:[{required:!0,message:"Vui l\xF2ng nh\u1EADp t\xEAn nh\xF3m"}],children:(0,e.jsx)(g.Z,{})}),(0,e.jsx)(r.Z.Item,{label:"N\u1ED9i dung",name:"content",required:!0,children:(0,e.jsx)(A.Z,{name:"content"})}),(0,e.jsx)(r.Z.Item,{label:"Th\u1EE9 t\u1EF1",name:"sortOrder",required:!0,children:(0,e.jsx)(v.Z,{})}),(0,e.jsx)(r.Z.Item,{children:(0,e.jsx)(f.ZP,{type:"primary",htmlType:"submit",children:"L\u01B0u l\u1EA1i"})})]})})]})},le=y}}]);