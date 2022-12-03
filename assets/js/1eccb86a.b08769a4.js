"use strict";(self.webpackChunkobsidian_jira_issue=self.webpackChunkobsidian_jira_issue||[]).push([[495],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},l="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,c=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),l=u(n),f=o,d=l["".concat(c,".").concat(f)]||l[f]||m[f]||s;return n?r.createElement(d,i(i({ref:t},p),{},{components:n})):r.createElement(d,i({ref:t},p))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,i=new Array(s);i[0]=f;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a[l]="string"==typeof e?e:o,i[1]=a;for(var u=2;u<s;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},2824:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>l,frontMatter:()=>s,metadata:()=>a,toc:()=>u});var r=n(7462),o=(n(7294),n(3905));const s={sidebar_position:1},i="Jira Issue",a={unversionedId:"components/jira-issue",id:"components/jira-issue",title:"Jira Issue",description:"This fence component allows to insert a section where you can put several issues references.",source:"@site/docs/components/jira-issue.md",sourceDirName:"components",slug:"/components/jira-issue",permalink:"/obsidian-jira-issue/docs/components/jira-issue",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Components",permalink:"/obsidian-jira-issue/docs/category/components"},next:{title:"Jira Search",permalink:"/obsidian-jira-issue/docs/components/jira-search"}},c={},u=[],p={toc:u};function l(e){let{components:t,...s}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,s,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"jira-issue"},"Jira Issue"),(0,o.kt)("p",null,"This fence component allows to insert a section where you can put several issues references."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"jira-issue1",src:n(8483).Z,width:"576",height:"333"})),(0,o.kt)("p",null,"This markdown fence is meant to be used to store many references that may not be related but you want to keep track of them."),(0,o.kt)("p",null,"You can input issues one per line and they can be referenced using the key or the Jira Issue URL.\nYou can also insert comments in this fence in order to give some context to those potentially unrelated issues."),(0,o.kt)("p",null,"Example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"```jira-issue\nAAA-111\nAAA-222\nhttps://my.jira-server.com/browse/BBB-333\n# This is a comment\n```\n")))}l.isMDXComponent=!0},8483:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/jira-issue1-82537daed7f3f35126f5922f0b35fe49.png"}}]);