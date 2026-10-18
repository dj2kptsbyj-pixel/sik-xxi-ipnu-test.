(function(){
const defaults={nav_position:'side',theme:'light',font:'system',font_size:'16',accent:'#176b45',site_title:'SIK XXI IPNU'};
const fonts={system:'system-ui, sans-serif',arial:'Arial, sans-serif',georgia:'Georgia, serif',verdana:'Verdana, sans-serif'};
const css=document.createElement('style');css.textContent=`
:root{--sik-accent:#176b45;--sik-font:system-ui,sans-serif;--sik-size:16px}
body{font-family:var(--sik-font)!important;font-size:var(--sik-size)!important}
button:not(.ghost),.nav button.active{accent-color:var(--sik-accent)}
#sikMenuToggle{margin-left:10px;padding:8px 12px;border-radius:8px;cursor:pointer}
body.sik-collapse #workspace aside{display:none!important}
body.sik-collapse #workspace main{width:100%;max-width:none}
body.sik-top #workspace.shell{display:block!important}
body.sik-top #workspace aside{width:100%!important;max-width:none!important;position:static!important;height:auto!important}
body.sik-top #nav{display:flex;flex-wrap:wrap;gap:6px}
body.sik-top #workspace main{width:100%!important;max-width:none!important}
body.sik-dark{background:#101c19!important;color:#e7f1ec!important}
body.sik-dark .panel,body.sik-dark .top,body.sik-dark #workspace aside{background:#1a2b25!important;color:#e7f1ec!important}
body.sik-dark input,body.sik-dark select{background:#24372f!important;color:#fff!important}
@media(max-width:760px){#workspace aside{max-width:100%!important}body.sik-collapse #workspace aside{display:none!important}}
`;document.head.append(css);
function validate(raw){const a={...defaults};if(raw&&typeof raw==='object'){
for(const k of ['nav_position','theme','font','font_size','accent','site_title'])if(typeof raw[k]==='string')a[k]=raw[k];}
if(!['side','top'].includes(a.nav_position))a.nav_position='side';if(!['light','dark'].includes(a.theme))a.theme='light';if(!fonts[a.font])a.font='system';if(!['14','16','18'].includes(a.font_size))a.font_size='16';if(!/^#[0-9a-fA-F]{6}$/.test(a.accent))a.accent=defaults.accent;a.site_title=a.site_title.slice(0,80);return a;}
function apply(raw){const a=validate(raw);document.documentElement.style.setProperty('--sik-accent',a.accent);document.documentElement.style.setProperty('--sik-font',fonts[a.font]);document.documentElement.style.setProperty('--sik-size',a.font_size+'px');document.body.classList.toggle('sik-top',a.nav_position==='top');document.body.classList.toggle('sik-dark',a.theme==='dark');const b=document.querySelector('.brand b');if(b)b.textContent=a.site_title;return a;}
async function load(db){let a=defaults;try{const {data,error}=await db.from('site_settings').select('settings').eq('id',1).maybeSingle();if(!error&&data)a=validate(data.settings);}catch(e){}apply(a);return a;}
async function save(db,raw){const a=validate(raw);const {error}=await db.from('site_settings').upsert({id:1,settings:a},{onConflict:'id'});if(error)throw error;apply(a);return a;}
function toggle(){document.body.classList.toggle('sik-collapse');}
document.addEventListener('DOMContentLoaded',()=>{const top=document.querySelector('.topright');if(top){const b=document.createElement('button');b.id='sikMenuToggle';b.className='ghost';b.textContent='☰ Menu';b.setAttribute('aria-label','Buka atau tutup menu');b.addEventListener('click',toggle);top.prepend(b);}});
window.SIKAppearance={load,save,apply};
})();