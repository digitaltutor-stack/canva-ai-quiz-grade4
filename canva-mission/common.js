export const demo = new URLSearchParams(location.search).get('demo') === '1';
export const samples = [
{id:'sample1',name:'도전! 캔바 마스터 레벨 1',url:'',published:true,order:0},
{id:'sample2',name:'나만의 소개 카드 만들기',url:'',published:true,order:1},
{id:'sample3',name:'상상 가득 포스터 만들기',url:'',published:true,order:2}];
export function validURL(value){try{const u=new URL(value);return u.protocol==='https:' && u.hostname==='www.canva.com' && !u.username && !u.password && u.pathname.startsWith('/design/');}catch{return false;}}
export function ordered(items){return [...items].sort((a,b)=>a.order-b.order || a.id.localeCompare(b.id));}
export async function connect(){
 const {firebaseConfig}=await import('./firebase-config.js');
 if(!['apiKey','authDomain','projectId','appId'].every(k=>firebaseConfig[k])) throw new Error('Firebase 설정이 필요합니다. README의 안내에 따라 이 앱 전용 새 프로젝트를 연결해 주세요.');
 const [app,db,auth]=await Promise.all([import('https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js'),import('https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js'),import('https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js')]);
 const instance=app.initializeApp(firebaseConfig);return {db,auth,store:db.getFirestore(instance),session:auth.getAuth(instance)};
}
export const demoKey='canva-mission-demo-v1';
export function demoData(){try{return JSON.parse(localStorage.getItem(demoKey)) || structuredClone(samples);}catch{return structuredClone(samples);}}
export function errorMessage(e){return e.code ? '연결 또는 권한을 확인해 주세요. ('+e.code+')' : e.message;}
