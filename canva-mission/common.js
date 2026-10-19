export const demo = new URLSearchParams(location.search).get('demo') === '1';
export const teacherPIN = '4826'; // 화면 진입용 번호입니다. 소스에서 확인 가능하며 서버 인증이 아닙니다.
export const samples = [
{id:'sample1',name:'나를 소개해요',description:'캔바로 소개 카드 만들기',url:'',published:true,order:0},
{id:'sample2',name:'책 읽고 생각 나누기',description:'읽은 책의 느낌을 적어 보세요',url:'',published:true,order:1},
{id:'sample3',name:'수학 퀴즈',description:'배운 내용을 퀴즈로 확인해요',url:'',published:true,order:2},
{id:'sample4',name:'영상 보고 탐구하기',description:'영상을 보고 질문에 답해요',url:'',published:true,order:3},
{id:'sample5',name:'자유롭게 표현해요',description:'나만의 그림과 작품 만들기',url:'',published:true,order:4},
{id:'sample6',name:'추가 도전',description:'새로운 활동에 도전해 보세요',url:'',published:true,order:5}];
export function validURL(value){try{const u=new URL(value);return u.protocol==='https:' && !!u.hostname && !u.username && !u.password;}catch{return false;}}
export function ordered(items){return [...items].sort((a,b)=>a.order-b.order || a.id.localeCompare(b.id));}
export const demoKey='canva-mission-simple-draft-v1';
export function demoData(){try{return JSON.parse(localStorage.getItem(demoKey)) || structuredClone(samples);}catch{return structuredClone(samples);}}
export function errorMessage(e){return e.message;}
export function validate(items){if(!Array.isArray(items))throw new Error('도전 데이터 형식이 올바르지 않습니다.');const ids=new Set();for(const m of items){if(!m || typeof m.id!=='string' || ids.has(m.id) || typeof m.name!=='string' || !m.name.trim() || m.name.length>100 || typeof m.url!=='string' || (m.url!==''&&!validURL(m.url)) || typeof m.published!=='boolean' || !Number.isInteger(m.order))throw new Error('도전 데이터 형식이 올바르지 않습니다.');ids.add(m.id);}return items;}
export async function sharedData(){const r=await fetch('./missions.json',{cache:'no-store'});if(!r.ok)throw new Error('공유 미션 파일을 불러오지 못했어요. 잠시 후 새로고침해 주세요.');return validate(await r.json());}

let connection;
export async function connect(){if(!connection)connection=(async()=>{
const [{initializeApp},db]=await Promise.all([import('https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js'),import('https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js')]);
const app=initializeApp({apiKey:'AIzaSyBNXNJ9y_WZbDgAcCVrhlAMkk8GhHxnEW0',authDomain:'canva-mission-room.firebaseapp.com',projectId:'canva-mission-room',appId:'1:928334352040:web:dd18ad40d2c7260fa27c9d'});
return {db,store:db.getFirestore(app)};})();return connection;}
export function documentData(m,index){return {name:m.name.trim(),description:(m.description||'').trim(),url:m.url.trim(),published:m.published,deleted:false,order:index,pin:teacherPIN};}
