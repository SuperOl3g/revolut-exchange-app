(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{143:function(e,n,t){},144:function(e,n,t){"use strict";t.r(n);var r,a=t(0),c=t.n(a),o=t(21),u=t.n(o),i=t(1),s=t(2),l=t(8),p=t(3),d=t(4),f=t(6),h=t(5),v=t(7),m=t(29);!function(e){e[e.Source=0]="Source",e[e.Target=1]="Target"}(r||(r={}));var C={RUB:"\u20bd",USD:"$",EUR:"\u20ac",GBP:"\xa3"},g={"as-is":{maximumFractionDigits:2},always:{minimumFractionDigits:2,maximumFractionDigits:2},none:{maximumFractionDigits:0}},E=function(e,n){var t=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).fractions,r=void 0===t?"as-is":t;return C[n]+e.toLocaleString(void 0,g[r])},y=t(52),b=t.n(y),S=t(22);function O(){var e=Object(i.a)(["\n    background: none;\n    border: none;\n    color: inherit;\n    font-size: inherit;\n    text-align: right;\n    outline: none;\n    min-width: 50px;\n    padding: 0;\n    margin: 0;\n\n    ::-ms-clear {\n      display: none;\n    }\n  "]);return O=function(){return e},e}var R=function(e){return e(O())},A=function(){},x=function(e){function n(){var e,t;Object(p.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(t=Object(f.a)(this,(e=Object(h.a)(n)).call.apply(e,[this].concat(a)))).handleChange=function(e){var n=e.value,r=t.props,a=r.name,c=r.prefix,o="-"===c?n.slice(c.length):n;+o!==t.props.value&&t.props.onChange(null,{value:o,name:a})},t}return Object(v.a)(n,e),Object(d.a)(n,[{key:"render",value:function(){var e=this,n=this.props,t=n.prefix,r=n.name,a=n.value,o=n.getRef;return c.a.createElement(S.a,null,function(n){var u=n.css;return c.a.createElement(b.a,{getInputRef:o,className:R(u),decimalScale:2,allowNegative:!1,maxLength:14,name:r,thousandSeparator:!0,prefix:t,value:a||"",onValueChange:e.handleChange})})}}]),n}(a.PureComponent);x.defaultProps={onChange:A,getRef:A};var j=x,k="rgba(0, 0, 0, 0.25)",U="#3f90ea",w="#337dce",_="#eb008d",T="#d2007e",N="#CA0076",G="#cd0a2c";function B(){var e=Object(i.a)(["\n  margin-top: 10px;\n  font-size: 12px;\n  color: white;\n  opacity: 0.7;\n"]);return B=function(){return e},e}function D(){var e=Object(i.a)(["\n  box-sizing: border-box;\n  padding: 40px 50px 46px;\n  display: flex;\n  flex-wrap: wrap;\n  font-size: 26px;\n  color: white;\n"]);return D=function(){return e},e}function P(){var e=Object(i.a)(["\n  display: flex;\n  width: 100%;\n  justify-content: space-between;\n  align-items: center;\n"]);return P=function(){return e},e}var H=s.a.div(P()),I=s.a.div(D()),Y=s.a.div(function(e){return e.type===r.Source?"\n        background-color: ".concat(U,";\n        position: relative;\n        \n        &:after {\n          content: '';\n          display: block;\n          position: absolute;\n          left: 50%;\n          top: 100%;\n          transform: translate(-50%, -50%) rotate(45deg);\n          width: 20px;\n          height: 20px;\n          background-color: inherit;\n        }\n        "):"\n          background-color: ".concat(w,";\n        ")}),F=s.a.div(B()),z=t(53),M=t.n(z);t(80),t(81),t(82);function Q(){var e=Object(i.a)(["\n  outline: none !important;\n"]);return Q=function(){return e},e}var L=s.a.div(Q()),X=function(e){function n(){var e,t;Object(p.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(t=Object(f.a)(this,(e=Object(h.a)(n)).call.apply(e,[this].concat(a)))).slider=void 0,t.scrollBlock=void 0,t.refSlider=function(e){t.slider=e},t.refScrollBlock=function(e){e&&(t.scrollBlock=e.querySelector(".slick-list"))},t.handleChange=function(e){t.scrollBlock&&(t.scrollBlock.scrollLeft=0),t.props.onSlide(e)},t}return Object(v.a)(n,e),Object(d.a)(n,[{key:"componentDidUpdate",value:function(e){var n=this.props.currentSlide;this.props.currentSlide!==e.currentSlide&&this.slider&&this.slider.slickGoTo(n)}},{key:"render",value:function(){var e=this.props,n=e.currentSlide,t=e.children,r=e.speed;return c.a.createElement("div",{ref:this.refScrollBlock},c.a.createElement(M.a,{ref:this.refSlider,dots:!0,arrows:!0,speed:r,initialSlide:n,infinite:!1,afterChange:this.handleChange},c.a.Children.map(t,function(e){return c.a.createElement(L,null,e)})))}}]),n}(a.PureComponent);X.defaultProps={onSlide:A,currentSlide:0,speed:250};var V=X,J=t(28),q=t.n(J),W="https://api.exchangeratesapi.io",$=["RUB","USD","EUR","GBP"],K=function(e){function n(){var e,t;Object(p.a)(this,n);for(var a=arguments.length,o=new Array(a),u=0;u<a;u++)o[u]=arguments[u];return(t=Object(f.a)(this,(e=Object(h.a)(n)).call.apply(e,[this].concat(o)))).inputRefs={},t.handleSlideClick=function(e){t.focusInput(e.currentTarget.dataset.currency)},t.handleSlide=function(e){var n=t.props.type,r=$[e];t.props.onCurrencyChange(n,r),t.focusInput(r)},t.setInputRef=q()(function(e){return function(n){t.inputRefs[e]=n}},{primitive:!0}),t.renderSlide=function(e){var n=t.props,a=n.pockets,o=n.type,u=n.inputValue,i=n.onAmountChange,s=n.valueFieldName,l=n.extraContent;return c.a.createElement(I,{key:e,"data-currency":e,onClick:t.handleSlideClick},c.a.createElement(H,null,c.a.createElement("div",null,e),c.a.createElement(j,{getRef:t.setInputRef(e),prefix:o===r.Source?"-":"+",name:s,value:u,onChange:i})),c.a.createElement(H,null,c.a.createElement(F,null,"You have\xa0",E(a[e],e,{fractions:"always"})),c.a.createElement(F,null,l)))},t}return Object(v.a)(n,e),Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=this.props,n=e.type,t=e.currency;n===r.Source&&this.focusInput(t)}},{key:"focusInput",value:function(e){var n=this.inputRefs[e];n&&n.focus()}},{key:"render",value:function(){var e=this.props,n=e.currency,t=e.type;return c.a.createElement(Y,{type:t},c.a.createElement(V,{currentSlide:$.indexOf(n),onSlide:this.handleSlide},$.map(this.renderSlide)))}}]),n}(a.PureComponent);K.defaultProps={onCurrencyChange:A};var Z=K;function ee(){var e=Object(i.a)(["\n  margin-top: 8px;\n  min-height: 14px;\n  font-size: 14px;\n  text-align: center;\n  color: ",";\n"]);return ee=function(){return e},e}function ne(){var e=Object(i.a)(["\n  border-radius: 6px;\n  overflow: hidden;\n  box-shadow: 0 24px 32px ",";\n"]);return ne=function(){return e},e}var te=s.a.div(ne(),k),re=s.a.div(ee(),G);function ae(){var e=Object(i.a)(["\n  transition: opacity ","\n    ease-in-out;\n  transition-delay: ",";\n  opacity: ",";\n"]);return ae=function(){return e},e}function ce(){var e=Object(i.a)(["\n  width: 24px;\n  height: 24px;\n  stroke: currentColor;\n  fill: currentColor;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transition: all 0.225s ease-in-out;\n  transform: translate(-50%, -50%) scale(",");\n  transition-delay: ",";\n  opacity: ",";\n"]);return ce=function(){return e},e}function oe(){var e=Object(i.a)(["\n  margin: 20px auto 0;\n  display: block;\n  border-radius: 40px;\n  height: 46px;\n  width: 160px;\n  font-size: 18px;\n  border: none;\n  text-align: center;\n  background-color: ",";\n  color: white;\n  transition: all 0.25s ease;\n  cursor: pointer;\n  outline: none;\n  position: relative;\n\n  :disabled {\n    opacity: ",";\n    pointer-events: none;\n  }\n\n  :hover {\n    background-color: ",";\n  }\n\n  :active {\n    background-color: ",";\n  }\n"]);return oe=function(){return e},e}var ue=s.a.button(oe(),_,function(e){return e.success?1:.25},T,N),ie=s.a.svg(ce(),function(e){return e.success?1:0},function(e){return e.success?"0.1s":0},function(e){return e.success?1:0}),se=s.a.span(ae(),function(e){return e.success?".15s":"0.3s"},function(e){return e.success?0:"0.28s"},function(e){return e.success?0:1}),le=function(e){function n(){var e,t;Object(p.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(t=Object(f.a)(this,(e=Object(h.a)(n)).call.apply(e,[this].concat(a)))).state={success:!1},t.timer=void 0,t.handleClick=function(e){clearTimeout(t.timer),t.setState({success:!0}),t.timer=window.setTimeout(function(){t.setState({success:!1})},800),t.props.onClick(e)},t}return Object(v.a)(n,e),Object(d.a)(n,[{key:"render",value:function(){var e=this.props,n=e.disabled,t=e.children,r=this.state.success;return c.a.createElement(ue,{success:r,disabled:n,onClick:this.handleClick},c.a.createElement(se,{success:r},t),c.a.createElement(ie,{success:r,viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})))}}]),n}(a.PureComponent);le.defaultProps={onClick:A};var pe,de=le,fe=function(e){function n(){return Object(p.a)(this,n),Object(f.a)(this,Object(h.a)(n).apply(this,arguments))}return Object(v.a)(n,e),Object(d.a)(n,[{key:"render",value:function(){var e=this.props,n=e.pockets,t=e.sourceCurrency,a=e.targetCurrency,o=e.sourceAmount,u=e.targetAmount,i=e.rate,s=e.onCurrencyChange,l=e.onAmountChange,p=e.onExchange,d=e.valid,f=e.errorMsg;return c.a.createElement("div",null,c.a.createElement(te,null,c.a.createElement(Z,{valueFieldName:"sourceAmount",type:r.Source,pockets:n,currency:t,inputValue:o,onCurrencyChange:s,onAmountChange:l}),c.a.createElement(Z,{valueFieldName:"targetAmount",type:r.Target,pockets:n,currency:a,inputValue:u,onCurrencyChange:s,onAmountChange:l,extraContent:!!i&&"".concat(E(1,a)," = ").concat(E(1/i,t))})),c.a.createElement(de,{disabled:!d,onClick:p},"Exchange"),c.a.createElement(re,null,f))}}]),n}(c.a.PureComponent);function he(){return function(e,n){var t=n().exchange.sourceCurrency;return e({type:pe.RATES_REQUEST,payload:{baseCurrency:t}}),fetch("".concat(W,"/latest?base=").concat(t)).then(function(e){return e.json()}).then(function(e){var n=e.rates,t=void 0===n?{}:n;return{RUB:t.RUB,EUR:t.EUR,USD:t.USD,GBP:t.GBP}}).then(function(n){return e({type:pe.RATES_REQUEST_SUCCESS,payload:{rates:n,baseCurrency:t}})})}}function ve(e){return $[($.indexOf(e)+1)%$.length]}!function(e){e.RATES_REQUEST="RATES_REQUEST",e.RATES_REQUEST_SUCCESS="RATES_REQUEST_SUCCESS",e.SOURCE_CURRENCY_CHANGE="SOURCE_CURRENCY_CHANGE",e.TARGET_CURRENCY_CHANGE="TARGET_CURRENCY_CHANGE",e.EXCHANGE="EXCHANGE"}(pe||(pe={}));var me=function(e,n){for(var t=e,r=0;r<n.length;){if(null==t)return;t=t[n[r]],r+=1}return t};var Ce=function(e){return"targetAmount"===e?"sourceAmount":"targetAmount"},ge=function(e){function n(){var e,t;Object(p.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(t=Object(f.a)(this,(e=Object(h.a)(n)).call.apply(e,[this].concat(a)))).updateTimer=void 0,t.state={},t.handleAmountChange=function(e,n){var r,a=n.value,c=n.name;c&&t.setState((r={},Object(l.a)(r,c,a.length?+a:void 0),Object(l.a)(r,"lastUpdatedField",c),r),function(){t.calcAmount(Ce(c))})},t.handleExchange=function(){var e=t.state,n=e.sourceAmount,r=e.targetAmount,a=t.props,c=a.sourceCurrency,o=a.targetCurrency;t.props.onExchange(c,n||0,o,r||0),t.setState({sourceAmount:null,targetAmount:null})},t.validate=q()(function(e,n,t,r){return t&&r?t>n[e]?{valid:!1,errorMsg:"Not enough money"}:{valid:!0}:{valid:!1}},{max:1}),t}return Object(v.a)(n,e),Object(d.a)(n,[{key:"componentDidMount",value:function(){this.props.updateRates(),this.updateTimer=window.setInterval(this.props.updateRates,1e4)}},{key:"componentWillUnmount",value:function(){clearInterval(this.updateTimer)}},{key:"componentDidUpdate",value:function(e){var n=this.state.lastUpdatedField;this.props.rate!==e.rate&&n&&this.calcAmount(Ce(n))}},{key:"calcAmount",value:function(e){var n=this.props.rate,t=this.state[Ce(e)];if(n){var r="sourceAmount"===e?1/n:n,a=t?Math.round(t*r*100)/100:null;this.setState(Object(l.a)({},e,a))}}},{key:"render",value:function(){var e=this.props,n=e.sourceCurrency,t=e.pockets,r=this.state,a=r.sourceAmount,o=r.targetAmount;return c.a.createElement(fe,Object.assign({},this.props,this.validate(n,t,a,o),{sourceAmount:this.state.sourceAmount,targetAmount:this.state.targetAmount,onAmountChange:this.handleAmountChange,onExchange:this.handleExchange}))}}]),n}(a.Component),Ee=Object(m.b)(function(e){var n=e.pockets,t=e.exchange;return{pockets:n,rate:me(e,["rates",t.sourceCurrency,t.targetCurrency]),sourceCurrency:t.sourceCurrency,targetCurrency:t.targetCurrency}},function(e){return{onExchange:function(n,t,r,a){return e(function(e,n,t,r){return function(a){a({type:pe.EXCHANGE,payload:{sourceCurrency:e,sourceAmount:n,targetCurrency:t,targetAmount:r}})}}(n,t,r,a))},onCurrencyChange:function(n,t){e(function(e,n){return function(t,a){t({type:e===r.Source?pe.SOURCE_CURRENCY_CHANGE:pe.TARGET_CURRENCY_CHANGE,payload:{currency:n}}),t(he());var c=a().exchange[e===r.Source?"targetCurrency":"sourceCurrency"];c===n&&t({type:e===r.Source?pe.TARGET_CURRENCY_CHANGE:pe.SOURCE_CURRENCY_CHANGE,payload:{currency:ve(c)}})}}(n,t))},updateRates:function(){return e(he())}}})(ge),ye=t(13),be=t(54),Se=t(18),Oe={};var Re=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Oe,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case pe.RATES_REQUEST_SUCCESS:var t=n.payload,r=t.rates,a=t.baseCurrency;return Object(Se.a)({},e,Object(l.a)({},a,r));default:return e}},Ae={RUB:1000500.34,USD:800.7,EUR:600,GBP:70.5};var xe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ae,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case pe.EXCHANGE:var t,r=n.payload,a=r.sourceCurrency,c=r.sourceAmount,o=r.targetCurrency,u=r.targetAmount;return Object(Se.a)({},e,(t={},Object(l.a)(t,a,e[a]-c),Object(l.a)(t,o,e[o]+u),t));default:return e}},je={sourceCurrency:"RUB",targetCurrency:"EUR"};var ke=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:je,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case pe.SOURCE_CURRENCY_CHANGE:return Object(Se.a)({},e,{sourceCurrency:n.payload.currency});case pe.TARGET_CURRENCY_CHANGE:return Object(Se.a)({},e,{targetCurrency:n.payload.currency});default:return e}},Ue=Object(ye.c)({rates:Re,pockets:xe,exchange:ke}),we=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||ye.d,_e=Object(ye.e)(Ue,we(Object(ye.a)(be.a)));function Te(){var e=Object(i.a)(["\n  max-width: 440px;\n  width: 100%;\n"]);return Te=function(){return e},e}function Ne(){var e=Object(i.a)(["\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 6px;\n"]);return Ne=function(){return e},e}var Ge=s.a.div(Ne()),Be=s.a.div(Te()),De=function(){return c.a.createElement(m.a,{store:_e},c.a.createElement(Ge,null,c.a.createElement(Be,null,c.a.createElement(Ee,null))))};t(142),t(143);u.a.render(c.a.createElement(De,null),document.getElementById("root"))},55:function(e,n,t){e.exports=t(144)},82:function(e,n,t){}},[[55,1,2]]]);
//# sourceMappingURL=main.4c07b90c.chunk.js.map