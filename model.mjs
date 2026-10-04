export const SPOTS = [
  {en:"Kokushikan University · Main Gate",areaEn:"University",detailEn:"Right of the main gate, next to the noticeboard",id:'koku',code:'RF-KOKU',name:'国士舘大学 正門',zh:'国士馆大学 · 正门',area:'大学',areaZh:'大学',type:'university',detail:'正門を入って右側、掲示板の隣',detailZh:'进入正门后右侧，公告栏旁',distance:120,walk:2,stock:15,capacity:20,hours:'07:00 – 22:00',x:48,y:44,lat:35.648,lng:139.655},
  {en:"Umegaoka Station · Odakyu Line",areaEn:"Station",detailEn:"Left of the south exit ticket gates",id:'ume',code:'RF-UME',name:'小田急線 梅ヶ丘駅',zh:'小田急线 · 梅丘站',area:'駅',areaZh:'车站',type:'train',detail:'南口改札を出て左側の傘スタンド',detailZh:'南口检票口外左侧的伞架',distance:350,walk:5,stock:8,capacity:16,hours:'05:00 – 24:00',x:70,y:24,lat:35.656,lng:139.654},
  {en:"Setagaya · Convenience Store",areaEn:"Shop",detailEn:"Blue umbrella stand, left of the store entrance",id:'store',code:'RF-STORE',name:'世田谷 コンビニ前',zh:'世田谷 · 便利店门前',area:'お店',areaZh:'商店',type:'store',detail:'店舗入口の左側、青い傘スタンド',detailZh:'店铺入口左侧，蓝色伞架',distance:500,walk:7,stock:12,capacity:18,hours:'24時間',x:25,y:69,lat:35.647,lng:139.653},
  {en:"Gotokuji Station · Odakyu Line",areaEn:"Station",detailEn:"Station square, next to the information board",id:'gotoku',code:'RF-GOTOKU',name:'小田急線 豪徳寺駅',zh:'小田急线 · 豪德寺站',area:'駅',areaZh:'车站',type:'train',detail:'駅前広場、案内板の隣',detailZh:'站前广场，指示牌旁',distance:650,walk:9,stock:0,capacity:14,hours:'05:00 – 24:00',x:19,y:30,lat:35.653,lng:139.647},
  {en:"Neighborhood Café · Setagaya",areaEn:"Shop",detailEn:"Beside the terrace, near the caf\u00e9 entrance",id:'cafe',code:'RF-CAFE',name:'まちのカフェ 世田谷店',zh:'街角咖啡 · 世田谷店',area:'お店',areaZh:'商店',type:'coffee',detail:'テラス席の横、店内入口付近',detailZh:'露台座位旁，店内入口附近',distance:820,walk:11,stock:6,capacity:6,hours:'09:00 – 20:00',x:78,y:73,lat:35.645,lng:139.657}
];
export const STORAGE_KEY='rainflow-as-v1';
export const LOAN_DAYS=7;
export const LOAN_MS=LOAN_DAYS*24*60*60*1000;
export const COMPENSATION_YEN=2000;
export const AUTH_METHODS=['sound-demo','code','qr-demo','qr-camera','qr-link','qr-photo'];
export function freshState(){return {version:3,lang:'ja',profile:{name:'',studentId:'',email:'',kana:'',age:'',address:'',interests:[]},favorites:[],inventory:Object.fromEntries(SPOTS.map(s=>[s.id,s.stock])),quarantine:Object.fromEntries(SPOTS.map(s=>[s.id,0])),active:null,history:[],coupons:[],applications:[],sequence:103};}
export function deadline(rental){return Number.isFinite(rental.dueAt)?rental.dueAt:rental.startedAt+LOAN_MS;}
export function rentalNow(rental,now=Date.now()){return rental?.demoOverdue?Math.max(now,deadline(rental)+3600000):now;}
export function returnSlots(state,id){const s=SPOTS.find(s=>s.id===id);return s?Math.max(0,s.capacity-state.inventory[id]-(state.quarantine?.[id]||0)):0;}
export function compensationFor(rental,now=Date.now()){
 if(!rental)return {amount:0,reasons:[],overdue:false,damaged:false};
 const overdue=rentalNow(rental,now)>deadline(rental),damaged=!!rental.damageReported;
 const reasons=[...(overdue?['overdue']:[]),...(damaged?['damage']:[])];
 return {amount:rental.policyVersion>=2&&reasons.length?COMPENSATION_YEN:0,reasons,overdue,damaged};
}
export function readState(storage){try{
 const s=JSON.parse(storage.getItem(STORAGE_KEY));if(!s||![1,2,3].includes(s.version))return freshState();
 const b=freshState();const inventory=Object.fromEntries(SPOTS.map(p=>[p.id,Number.isInteger(s.inventory?.[p.id])?Math.max(0,Math.min(p.capacity,s.inventory[p.id])):p.stock]));
 const active=s.active&&SPOTS.some(p=>p.id===s.active.from)&&Number.isFinite(s.active.startedAt)?{...s.active,policyVersion:s.active.policyVersion??(s.version===1?1:2),dueAt:deadline(s.active),borrowMethod:s.active.borrowMethod||'legacy',damageReported:!!s.active.damageReported,damageNote:s.active.damageNote||'',demoOverdue:!!s.active.demoOverdue}:null;
 return {...b,...s,version:3,lang:['ja','zh','en'].includes(s.lang)?s.lang:'ja',profile:{...b.profile,...s.profile},favorites:[...new Set((Array.isArray(s.favorites)?s.favorites:[]).filter(id=>SPOTS.some(p=>p.id===id)))].slice(0,2),inventory,quarantine:Object.fromEntries(SPOTS.map(p=>[p.id,Number.isInteger(s.quarantine?.[p.id])?Math.max(0,Math.min(p.capacity-inventory[p.id],s.quarantine[p.id])):0])),history:Array.isArray(s.history)?s.history:[],coupons:Array.isArray(s.coupons)?s.coupons:[],applications:Array.isArray(s.applications)?s.applications:[],active};
}catch{return freshState();}}
export function saveState(storage,state){try{storage.setItem(STORAGE_KEY,JSON.stringify(state));return true;}catch{return false;}}
export function borrow(state,spotId,now=Date.now(),method='code'){
  if(state.active)throw new Error('active');
  const spot=SPOTS.find(s=>s.id===spotId);if(!spot)throw new Error('spot');
  if(state.inventory[spotId]<1)throw new Error('empty');
  if(!AUTH_METHODS.includes(method))throw new Error('method');
  const n=structuredClone(state);const seq=n.sequence++;
  n.active={id:`r-${now}-${seq}`,umbrella:`A-${seq}`,from:spotId,startedAt:now,dueAt:now+LOAN_MS,policyVersion:3,borrowMethod:method,damageReported:false,damageNote:'',demoOverdue:false};n.inventory[spotId]--;return n;
}
export function returnUmbrella(state,spotId,now=Date.now(),method='code'){
  if(!state.active)throw new Error('inactive');
  const spot=SPOTS.find(s=>s.id===spotId);if(!spot)throw new Error('spot');
  if(returnSlots(state,spotId)<1)throw new Error('full');
  if(!AUTH_METHODS.includes(method))throw new Error('method');
  const n=structuredClone(state),endedAt=Math.max(rentalNow(n.active,now),n.active.startedAt),comp=compensationFor(n.active,endedAt);
  if(n.active.damageReported){n.quarantine[spotId]++;}else{n.inventory[spotId]++;}
  n.history.unshift({...n.active,to:spotId,endedAt,returnMethod:method,fee:0,compensation:comp.amount,compensationReasons:comp.reasons,compensationStatus:comp.amount?'demo-unpaid':'none',rating:null,feedback:''});n.active=null;return n;
}
export function reportDamage(state,note='',now=Date.now()){if(!state.active)throw new Error('inactive');const n=structuredClone(state);n.active.damageReported=true;n.active.damageNote=String(note).trim().slice(0,1000);n.active.damageReportedAt=now;return n;}
export function clearDamage(state){if(!state.active)throw new Error('inactive');const n=structuredClone(state);n.active.damageReported=false;n.active.damageNote='';delete n.active.damageReportedAt;return n;}
export function setOverdueDemo(state,enabled){if(!state.active)throw new Error('inactive');const n=structuredClone(state);n.active.demoOverdue=!!enabled;return n;}
export function toggleFavorite(state,id){if(!SPOTS.some(s=>s.id===id))throw new Error('spot');const n=structuredClone(state);if(n.favorites.includes(id)){n.favorites=n.favorites.filter(i=>i!==id);}else{if(n.favorites.length>=2)throw new Error('favorites');n.favorites.push(id);}return n;}
export function rateRental(state,id,rating,feedback){if(!Number.isInteger(rating)||rating<1||rating>5)throw new Error('rating');const n=structuredClone(state);const item=n.history.find(i=>i.id===id);if(!item)throw new Error('history');item.rating=rating;item.feedback=String(feedback||'').slice(0,1000);return n;}
export function matchesCode(spotId,raw){const spot=SPOTS.find(s=>s.id===spotId);return !!spot&&String(raw).trim().toUpperCase()===spot.code;}
export function haversine(a,b){const r=x=>x*Math.PI/180;const dlat=r(b.lat-a.lat),dlng=r(b.lng-a.lng);const h=Math.sin(dlat/2)**2+Math.cos(r(a.lat))*Math.cos(r(b.lat))*Math.sin(dlng/2)**2;return Math.round(6371000*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h)));}

export function localDate(now=Date.now()){const d=new Date(now);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function registrationFields(fields,requireEmail){const studentId=String(fields.studentId||'').trim(),name=String(fields.name||'').trim(),email=String(fields.email||'').trim();if(!studentId||studentId.length>40)throw Error('studentId');if(!name||name.length>80)throw Error('registrationName');if(requireEmail&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw Error('registrationEmail');return {studentId,name,email};}
export function registerLoan(state,id,fields,now=Date.now(),method='qr-demo'){
 const person=registrationFields(fields,true);if(fields.accepted!==true)throw Error('consent');
 const n=borrow(state,id,now,method);n.active.borrowRegistration={...person,date:localDate(now),submittedAt:now,id:`loan-${n.active.id}`,formVersion:3,storage:'local-demo'};n.profile={...n.profile,studentId:person.studentId,name:person.name,email:person.email};return n;
}
export function registerReturn(state,id,fields,now=Date.now(),method='qr-demo'){
 if(!state.active)throw Error('inactive');const person=registrationFields(fields,false);if(fields.accepted!==true)throw Error('consent');
 if(state.active.borrowRegistration?.studentId&&person.studentId!==state.active.borrowRegistration.studentId)throw Error('studentMismatch');
 if(!['normal','damaged'].includes(fields.condition))throw Error('condition');const updated=fields.condition==='damaged'?reportDamage(state,fields.note||state.active.damageNote,now):clearDamage(state);
 const n=returnUmbrella(updated,id,now,method),h=n.history[0];h.returnRegistration={studentId:person.studentId,name:person.name,date:localDate(h.endedAt),condition:fields.condition,submittedAt:h.endedAt,id:`return-${h.id}`,formVersion:3,storage:'local-demo'};return n;
}
export function qrSpotId(raw,origins=[]){const text=String(raw||'').trim();const code=SPOTS.find(s=>s.code===text.toUpperCase());if(code)return code.id;try{const url=new URL(text);if(url.protocol!=='https:'||!origins.includes(url.origin))return null;const id=url.searchParams.get('spot');return SPOTS.some(s=>s.id===id)?id:null;}catch{return null;}}
