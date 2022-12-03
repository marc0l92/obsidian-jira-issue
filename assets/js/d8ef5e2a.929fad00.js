"use strict";(self.webpackChunkobsidian_jira_issue=self.webpackChunkobsidian_jira_issue||[]).push([[770],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,l=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=p(n),m=a,f=c["".concat(l,".").concat(m)]||c[m]||d[m]||s;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,i=new Array(s);i[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[c]="string"==typeof e?e:a,i[1]=o;for(var p=2;p<s;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6205:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>s,metadata:()=>o,toc:()=>p});var r=n(7462),a=(n(7294),n(3905));const s={sidebar_position:2},i="Jira Search",o={unversionedId:"components/jira-search",id:"components/jira-search",title:"Jira Search",description:"This fence component allows to insert a table that displays the results of a Jira query.",source:"@site/docs/components/jira-search.md",sourceDirName:"components",slug:"/components/jira-search",permalink:"/obsidian-jira-issue/docs/components/jira-search",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Jira Issue",permalink:"/obsidian-jira-issue/docs/components/jira-issue"},next:{title:"Jira Count",permalink:"/obsidian-jira-issue/docs/components/jira-count"}},l={},p=[{value:"Basic usage",id:"basic-usage",level:2},{value:"Advanced usage",id:"advanced-usage",level:2},{value:"Standard fields",id:"standard-fields",level:2},{value:"Custom fields",id:"custom-fields",level:2},{value:"Link to notes",id:"link-to-notes",level:2},{value:"Frontmatter",id:"frontmatter",level:3}],u={toc:p};function c(e){let{components:t,...s}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,s,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"jira-search"},"Jira Search"),(0,a.kt)("p",null,"This fence component allows to insert a table that displays the results of a Jira query.\nThe syntax to write the query is described in the official JQL Documentation."),(0,a.kt)("h2",{id:"basic-usage"},"Basic usage"),(0,a.kt)("p",null,"The basic usage of this block is to put the query directly in the fence. Example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"```jira-search\nresolution = Unresolved AND assignee = currentUser() AND status = 'In Progress' order by priority DESC\n```\n")),(0,a.kt)("p",null,"The columns displayed in the table can be configured in the settings. ",(0,a.kt)("a",{parentName:"p",href:"/docs/configuration/search-default-columns"},"See more")),(0,a.kt)("h2",{id:"advanced-usage"},"Advanced usage"),(0,a.kt)("p",null,"It is possible to describe in each jira-search fence how the search results are rendered using the following keyworkds:"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Keyword"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Description"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Values"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"type")),(0,a.kt)("td",{parentName:"tr",align:"left"},"Rendering mode of the search results"),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"TABLE")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"TABLE")," or ",(0,a.kt)("inlineCode",{parentName:"td"},"LIST"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"query")),(0,a.kt)("td",{parentName:"tr",align:"left"},"Query to use with Jira to retrieve the results"),(0,a.kt)("td",{parentName:"tr",align:"left"}),(0,a.kt)("td",{parentName:"tr",align:"left"})),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"limit")),(0,a.kt)("td",{parentName:"tr",align:"left"},"Maximum number of items to display"),(0,a.kt)("td",{parentName:"tr",align:"left"},"Use value from settings"),(0,a.kt)("td",{parentName:"tr",align:"left"},"Integer number")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"columns")),(0,a.kt)("td",{parentName:"tr",align:"left"},"List of columns to render (",(0,a.kt)("a",{parentName:"td",href:"#standard-columns"},"Available columns"),")"),(0,a.kt)("td",{parentName:"tr",align:"left"},"Use value from settings"),(0,a.kt)("td",{parentName:"tr",align:"left"},"Comma separated list")))),(0,a.kt)("p",null,"Example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"```jira-search\ntype: TABLE\nquery: status = 'In Progress' order by priority DESC\nlimit: 15\ncolumns: KEY, SUMMARY, -ASSIGNEE, -REPORTER, STATUS\n```\n")),(0,a.kt)("h2",{id:"standard-fields"},"Standard fields"),(0,a.kt)("p",null,"The plugin is able to render as columns the following Jira standard fields:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"KEY, SUMMARY, DESCRIPTION, TYPE, CREATED, UPDATED, REPORTER, ASSIGNEE, PRIORITY, STATUS, DUE_DATE,\nRESOLUTION, RESOLUTION_DATE, PROJECT, ENVIRONMENT, LABELS, FIX_VERSIONS, COMPONENTS,\nAGGREGATE_TIME_ESTIMATE, AGGREGATE_TIME_ORIGINAL_ESTIMATE, AGGREGATE_TIME_SPENT,\nTIME_ESTIMATE, TIME_ORIGINAL_ESTIMATE, TIME_SPENT, AGGREGATE_PROGRESS, PROGRESS, LAST_VIEWED\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Columns names are case insensitive"),(0,a.kt)("li",{parentName:"ul"},"If the column starts with ",(0,a.kt)("inlineCode",{parentName:"li"},"-"),", the compact mode is used")),(0,a.kt)("p",null,"Example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"```jira-search\nquery: status = 'In Progress' order by priority DESC\ncolumns: key, -key, type, -type, reporter, -reporter, created, -created\n```\n")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Compact Columns",src:n(7275).Z,width:"700",height:"100"})),(0,a.kt)("h2",{id:"custom-fields"},"Custom fields"),(0,a.kt)("p",null,"Jira non standard fields (a.k.a. custom fields) can be inserted using the ",(0,a.kt)("inlineCode",{parentName:"p"},"$")," symbol."),(0,a.kt)("p",null,"Example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"```jira-search\nquery: status = 'In Progress' order by priority DESC\ncolumns: key, summary, $Epic Link, $Global Rank, $12313422, -$12313499\n```\n")),(0,a.kt)("p",null,"It is possible to provide the ID number of the custom field or its name."),(0,a.kt)("h2",{id:"link-to-notes"},"Link to notes"),(0,a.kt)("p",null,"The special column ",(0,a.kt)("inlineCode",{parentName:"p"},"NOTES")," can be used with ",(0,a.kt)("inlineCode",{parentName:"p"},"jira-search")," tables to create a column that shows all the notes that start with the issue key."),(0,a.kt)("p",null,"Example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"```jira-search\nquery: status = 'In Progress' order by priority DESC\ncolumns: key, summary, status, notes\n```\n")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Notes Column",src:n(7348).Z,width:"691",height:"264"})),(0,a.kt)("p",null,"This column is useful to connect the issues with your notes about them. The note title must start with the issue key but it can also contains other letters after that.\nExamples:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"AAA-123\nAAA-123 User story summary\nAAA-123 Custom string\n")),(0,a.kt)("p",null,"If no notes are found, a ",(0,a.kt)("inlineCode",{parentName:"p"},"\u2795")," button will be shown in order to allow the creation of a new note directly from this table."),(0,a.kt)("h3",{id:"frontmatter"},"Frontmatter"),(0,a.kt)("p",null,"You can also access the frontmatter section of the linked notes using the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/dchester/jsonpath"},"jsonpath")," syntax after the column ",(0,a.kt)("inlineCode",{parentName:"p"},"NOTES"),". Example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jira-search"},"query: status = 'In Progress' order by priority DESC\ncolumns: key, notes, notes.title, notes.status, notes.tags, notes.tags[0], notes..book[?(@.price<30 && @.category==\"fiction\")]\n")))}c.isMDXComponent=!0},7275:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/compactColumns-5f97f6f49b80ce66ae63fb89e321aa40.png"},7348:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/notesColumn-346b369190fa770027364a0804774c0e.png"}}]);