import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import './styles.css'

const projects = [
  { title:'WAN Infrastructure & Network Security Lab', type:'Cybersecurity', tags:['GNS3','Cisco IOS','eBGP','GRE','ACL'], desc:'Multi-router enterprise WAN lab integrating routing, VPNs, NAT/PAT, ACLs and centralized services.', detail:'Configured Frame Relay PVC/DLCI mappings, GRE VPN tunnels, eBGP routing, NAT/PAT, Cisco ACLs, DHCP, DNS and NTP.' },
  { title:'Hierarchical Campus LAN', type:'Networking', tags:['GNS3','EIGRP','OSPF','GLBP','VLSM'], desc:'Redundant multi-tier campus design connecting six buildings and a data center to dual ISP edge routers.', detail:'Implemented EIGRP and OSPF routing domains, redistribution, GLBP gateway failover and a 39-subnet VLSM plan.' },
  { title:'BigBackCooks', type:'Development', tags:['Flask','PostgreSQL','JWT','CI/CD'], desc:'Full-stack kitchen inventory and recipe platform with authentication, REST APIs and deployment automation.', detail:'Built Flask APIs with PostgreSQL, JWT authentication, GitHub Actions CI/CD and production deployment.' },
  { title:'HouseGlimpse', type:'Cloud', tags:['Firebase','Auth','Deployment','UI'], desc:'Real-estate listing platform with authentication, live database functionality and production deployment.', detail:'Built an end-to-end property browsing experience with controlled access, Firebase integration and deployment.' }
]

const skills = ['Network Security','GNS3 / Cisco IOS','TCP/IP · VLAN · VLSM','ACL · NAT/PAT · VPN','EIGRP · OSPF · eBGP','AWS Security','Microsoft Azure','Python · Flask','PostgreSQL · SQL','GitHub Actions · CI/CD']

function ThemeToggle({dark, setDark}) {
  return <button className="theme-toggle" onClick={()=>setDark(!dark)} aria-label="Toggle theme">
    <span className={dark?'active':''}>☾</span><span className={!dark?'active':''}>☀</span><i style={{transform:`translateX(${dark?28:0}px)`}}/></button>
}

function Magnetic({children, className=''}) {
  const x=useMotionValue(0), y=useMotionValue(0)
  const sx=useSpring(x,{stiffness:220,damping:18}), sy=useSpring(y,{stiffness:220,damping:18})
  return <motion.div className={className} style={{x:sx,y:sy}} onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();x.set((e.clientX-r.left-r.width/2)*.12);y.set((e.clientY-r.top-r.height/2)*.12)}} onPointerLeave={()=>{x.set(0);y.set(0)}}>{children}</motion.div>
}

function App(){
  const [dark,setDark]=useState(()=>localStorage.getItem('theme')!=='light')
  const [filter,setFilter]=useState('All')
  const [menu,setMenu]=useState(false)
  const [selected,setSelected]=useState(null)
  useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'light';localStorage.setItem('theme',dark?'dark':'light')},[dark])
  const visible=useMemo(()=>filter==='All'?projects:projects.filter(p=>p.type===filter),[filter])

  return <div className="app">
    <div className="noise"/><div className="grid-bg"/>
    <header className="nav">
      <a className="logo" href="#home"><span>RS</span><b>Renuah Samuel</b><small>SOC · NETWORK SECURITY</small></a>
      <button className="menu-btn" onClick={()=>setMenu(!menu)} aria-label="Open navigation">☰</button>
      <nav className={menu?'open':''}>{['About','Projects','Experience','Skills','Contact'].map(x=><a key={x} href={'#'+x.toLowerCase()} onClick={()=>setMenu(false)}>{x}</a>)}<a href="./resume.html">Resume</a><ThemeToggle dark={dark} setDark={setDark}/></nav>
    </header>

    <main>
      <section id="home" className="hero wrap">
        <motion.div className="hero-copy" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
          <div className="status"><span/> AVAILABLE FOR SOC / CYBERSECURITY OPPORTUNITIES</div>
          <p className="kicker">01 / SECURITY OPERATIONS</p>
          <h1>I look for <em>what doesn't fit.</em></h1>
          <p className="hero-lead">Final-year Computer Science student building toward SOC and network security roles, backed by six years of transaction monitoring, investigation and escalation experience.</p>
          <div className="actions"><Magnetic><a className="btn primary" href="#projects">Explore my work <span>↗</span></a></Magnetic><Magnetic><a className="btn ghost" href="./assets/documents/Renuah-Samuel-Resume.pdf">Download resume</a></Magnetic></div>
          <div className="social"><a href="https://linkedin.com/in/renuah-samuel-245890173" target="_blank">LinkedIn ↗</a><a href="https://github.com/renuah1142" target="_blank">GitHub ↗</a></div>
        </motion.div>
        <div className="hero-orbit" aria-label="Security operations network visualization">
          <div className="orbit o1"/><div className="orbit o2"/><div className="orbit o3"/>
          <motion.div className="core" animate={{scale:[1,1.04,1]}} transition={{duration:2.8,repeat:Infinity}}><span>24/7</span><small>MONITOR</small></motion.div>
          {['SIEM','NETWORK','FIREWALL','CLOUD','SOC'].map((x,i)=><motion.div key={x} className={'orbit-node n'+i} animate={{y:[0,-7,0]}} transition={{duration:2.4+i*.25,repeat:Infinity,ease:'easeInOut'}}>{x}</motion.div>)}
          <div className="scanline"/>
        </div>
      </section>

      <section id="about" className="section wrap">
        <div className="section-head"><p className="kicker">02 / THE STORY</p><h2>Different background.<br/><em>Same instinct.</em></h2></div>
        <div className="about-grid"><div className="story"><p>Before cybersecurity, I spent six years as a Senior Proof Officer at the Bank of Saint Vincent and the Grenadines.</p><p>I monitored high-volume transaction batches, investigated discrepancies, identified anomalies and escalated issues before they became audit findings. Now I'm applying that same discipline to networks: <strong>monitor → investigate → document → escalate.</strong></p><p>My security foundation comes from enterprise-style GNS3 labs, networking projects, application development and ongoing AWS and Azure security training.</p></div><div className="stats">{[['06','years monitoring'],['02','GNS3 network projects'],['06','campus buildings'],['39','VLSM subnets'],['35','students led'],['03','apps shipped']].map(([n,l])=><motion.div className="stat" key={l} whileHover={{y:-5}}><strong>{n}</strong><span>{l}</span></motion.div>)}</div></div>
      </section>

      <section id="projects" className="section projects-section"><div className="wrap"><div className="section-head"><p className="kicker">03 / SELECTED WORK</p><h2>Built in the lab.<br/><em>Tested by doing.</em></h2></div><div className="filters">{['All','Cybersecurity','Networking','Cloud','Development'].map(f=><button className={filter===f?'active':''} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div><div className="project-grid"><AnimatePresence mode="popLayout">{visible.map((p,i)=><motion.article className="project" key={p.title} layout initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.96}} transition={{delay:i*.05}} whileHover={{y:-8}}><div className="project-top"><span>{p.type}</span><small>0{i+1}</small></div><h3>{p.title}</h3><p>{p.desc}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><button onClick={()=>setSelected(p)}>View case study <b>↗</b></button></motion.article>)}</AnimatePresence></div></div></section>

      <section id="experience" className="section wrap"><div className="section-head"><p className="kicker">04 / EXPERIENCE</p><h2>Operational discipline<br/><em>meets technical growth.</em></h2></div><div className="timeline"><article><span>2017 — 2023</span><div><h3>Senior Proof Officer</h3><p>Bank of Saint Vincent and the Grenadines</p><ul><li>Monitored high-volume financial transaction operations.</li><li>Investigated discrepancies and identified deviations.</li><li>Escalated anomalies before they became audit findings.</li><li>Maintained accuracy under strict operational controls.</li></ul></div></article><article><span>2024 — 2025</span><div><h3>President</h3><p>Vincentian Student Association, St. Augustine</p><ul><li>Led a 35-member student organization.</li><li>Coordinated events and operating processes.</li><li>Liaised with university and industry stakeholders.</li></ul></div></article></div></section>

      <section id="skills" className="section skills-section"><div className="wrap"><div className="section-head"><p className="kicker">05 / TOOLKIT</p><h2>Tools for the<br/><em>next alert.</em></h2></div><div className="skill-cloud">{skills.map((s,i)=><motion.div key={s} initial={{opacity:0,x:-15}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.05}} whileHover={{scale:1.03}}><span>+</span>{s}</motion.div>)}</div><div className="learning"><span className="pulse"/> CURRENTLY LEARNING <b>AWS SECURITY</b><b>AZURE FUNDAMENTALS</b><b>ISC2 CC</b><b>FORTINET NSE 1/2</b></div></div></section>

      <section id="contact" className="contact wrap"><div className="contact-card"><p className="kicker">06 / CONTACT</p><h2>Let's build a safer<br/><em>network.</em></h2><p>Open to SOC operations, cybersecurity, network security, cloud security and graduate/junior opportunities.</p><div className="actions"><Magnetic><a className="btn primary" href="mailto:Renuah1142@gmail.com">Start a conversation ↗</a></Magnetic><a className="btn ghost" href="https://linkedin.com/in/renuah-samuel-245890173" target="_blank">LinkedIn</a></div></div></section>
    </main>
    <footer><span>© 2026 Renuah Samuel</span><span>SOC · CYBERSECURITY · NETWORK SECURITY</span><a href="#home">BACK TO TOP ↑</a></footer>

    <AnimatePresence>{selected&&<motion.div className="modal-wrap" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}><motion.div className="case-modal" initial={{y:30,scale:.98}} animate={{y:0,scale:1}} exit={{y:20}} onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}>×</button><p className="kicker">CASE STUDY / {selected.type.toUpperCase()}</p><h2>{selected.title}</h2><p>{selected.detail}</p><div className="tags">{selected.tags.map(t=><span key={t}>{t}</span>)}</div><a className="btn primary" href="https://github.com/renuah1142" target="_blank">More on GitHub ↗</a></motion.div></motion.div>}</AnimatePresence>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
