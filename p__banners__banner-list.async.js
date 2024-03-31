"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2574],{49799:function(b,h,e){e.d(h,{Z:function(){return i}});var x=e(52643),s=e(68136),j={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]},name:"edit",theme:"outlined"},r=j,u=e(91471),c=function(m,O){return s.createElement(u.Z,(0,x.Z)({},m,{ref:O,icon:r}))},i=s.forwardRef(c)},63687:function(b,h,e){e.d(h,{Z:function(){return i}});var x=e(52643),s=e(68136),j={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"}}]},name:"upload",theme:"outlined"},r=j,u=e(91471),c=function(m,O){return s.createElement(u.Z,(0,x.Z)({},m,{ref:O,icon:r}))},i=s.forwardRef(c)},54532:function(b,h,e){e.r(h),e.d(h,{default:function(){return te}});var x=e(78095),s=e.n(x),j=e(34827),r=e.n(j),u=e(24991),c=e(4870),i=e(46665),y=e(13762),m=e(2537),O=e(30339),$=e(24657),W=e(78491),C=e(10483),K=e(41605),Q=e(18801),P=e(15621),X=e(88821),R=e(49799),Y=e(25223),E=e(63687),w=e(55772),v=e(68136),f=function(o){return o[o.DEFAULT=0]="DEFAULT",o[o.SLIDE=1]="SLIDE",o[o.POST=2]="POST",o[o.PHOTO=3]="PHOTO",o}(f||{}),k=[{id:f.DEFAULT,name:"Default"},{id:f.SLIDE,name:"Slide"},{id:f.POST,name:"Post"},{id:f.PHOTO,name:"Photo"}],q=e(50369),g=e(58703),_=e(81068),F=e(64235),n=e(33130),ee=u.Z.Option,ne=function(){var ae=(0,v.useState)(!1),V=r()(ae,2),le=V[0],S=V[1],se=(0,v.useState)(),H=r()(se,2),l=H[0],Z=H[1],re=(0,v.useState)(),I=r()(re,2),z=I[0],oe=I[1],ie=(0,v.useState)(f.PHOTO),A=r()(ie,2),L=A[0],B=A[1],de=(0,v.useState)(!1),M=r()(de,2),ue=M[0],T=M[1],ce=c.Z.useForm(),ve=r()(ce,1),U=ve[0],G=k.map(function(t){return(0,n.jsx)(ee,{value:t.id,children:t.name},t.id)}),p=(0,v.useCallback)(function(){(0,g.request)("banner/get-list?type=".concat(L)).then(function(t){oe(t)})},[L]);(0,v.useEffect)(function(){p()},[p]);var J=function(a){B(a.type||f.PHOTO),Z(a),S(!0)},fe=function(){S(!1)},he=function(){l.image=U.getFieldValue("image"),l.id?(0,g.request)("banner/update",{method:"POST",data:l}).then(function(a){a.succeeded&&(p(),i.ZP.success("succeeded!"),S(!1))}):(0,g.request)("banner/add",{method:"POST",data:l}).then(function(a){a.succeeded&&(p(),i.ZP.success("succeeded!"),S(!1))})};function me(t){(0,g.request)("banner/delete/".concat(t),{method:"POST"}).then(function(a){a.succeeded&&(p(),i.ZP.success("succeeded!"))})}function xe(t){me(t)}var je=function(){T(!0)},Oe=function(){T(!1)},ge=function(a){return a.startsWith("http")?a:"https://dhhp.edu.vn".concat(a)};return(0,n.jsxs)(_._z,{children:[(0,n.jsx)("div",{className:"mb-4",children:(0,n.jsx)(u.Z,{defaultValue:L,style:{width:120},onChange:function(a){return B(a)},children:G})}),(0,n.jsxs)(y.Z,{gutter:16,children:[(0,n.jsx)(m.Z,{span:6,children:(0,n.jsx)(F.Z,{className:"h-full flex items-center justify-center mb-4",onClick:function(){return J({})},children:(0,n.jsx)(X.Z,{})})}),z&&z.map(function(t){return(0,n.jsx)(m.Z,{span:6,children:(0,n.jsx)(F.Z,{className:"mb-4",actions:[(0,n.jsx)(R.Z,{onClick:function(){return J(t)}},"edit"),(0,n.jsx)(O.Z,{title:"Are you sure to delete?",okText:"Yes",cancelText:"No",onConfirm:function(){return xe(t.id)},children:(0,n.jsx)(Y.Z,{})},"delete")],children:(0,n.jsx)("div",{className:"relative w-full bg-white border border-dashed border-gray-500 flex justify-center items-center hover:border-blue-600 hover:text-blue-600",children:(0,n.jsx)($.Z,{src:ge(t.image),alt:t.name,height:200,wrapperClassName:"w-full",style:{objectFit:"cover"}})})})},t.id)})]}),(0,n.jsx)(W.Z,{title:"Banner",placement:"right",closable:!1,onClose:fe,visible:le,width:700,children:(0,n.jsxs)(c.Z,{form:U,layout:"vertical",children:[(0,n.jsx)("div",{children:"Name"}),(0,n.jsx)(C.Z,{className:"mb-2",value:l==null?void 0:l.name,onChange:function(a){return Z(function(d){return s()(s()({},d),{},{name:a.target.value})})}}),(0,n.jsx)("div",{className:"flex mb-2",children:(0,n.jsxs)(K.Z,{children:[(0,n.jsx)(c.Z.Item,{name:"image",label:"Image",children:(0,n.jsx)(C.Z,{})}),(0,n.jsx)(Q.Z,{beforeUpload:function(a){var d=a.type==="image/jpeg"||a.type==="image/png";if(d){var N=new FormData;return N.append("file",a),(0,g.request)("file/upload",{method:"POST",data:N}).then(function(D){if(!D.succeeded)return i.ZP.error(D.message),!1;U.setFieldValue("image",D.url)}),!1}else return i.ZP.error("You can only upload JPG or PNG file!"),!1},maxCount:1,showUploadList:!1,children:(0,n.jsx)(P.ZP,{icon:(0,n.jsx)(E.Z,{}),children:"T\u1EA3i l\xEAn"})}),(0,n.jsx)(P.ZP,{icon:(0,n.jsx)(E.Z,{}),onClick:je,children:"Duy\u1EC7t"})]})}),(0,n.jsx)("div",{children:"Url"}),(0,n.jsx)(C.Z,{className:"mb-2",value:l==null?void 0:l.url,onChange:function(a){return Z(function(d){return s()(s()({},d),{},{url:a.target.value})})}}),(0,n.jsx)("div",{children:"Display On"}),(0,n.jsx)(C.Z,{className:"mb-2",value:l==null?void 0:l.displayOn,onChange:function(a){return Z(function(d){return s()(s()({},d),{},{displayOn:Number(a.target.value)})})}}),(0,n.jsx)("div",{children:"Type"}),(0,n.jsx)(u.Z,{defaultValue:l==null?void 0:l.type,style:{width:"100%"},onChange:function(a){return Z(function(d){return s()(s()({},d),{},{type:a})})},className:"mb-3",children:G}),(0,n.jsx)(P.ZP,{type:"primary",icon:(0,n.jsx)(w.Z,{}),onClick:he,children:"L\u01B0u"})]})}),(0,n.jsx)(q.default,{visible:ue,onOk:Oe,onCancel:function(){return T(!1)}})]})},te=ne}}]);
