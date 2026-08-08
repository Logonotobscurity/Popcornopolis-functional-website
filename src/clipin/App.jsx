import React, { useMemo, useState } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import './clipin.css';

const tools = [
  { group: 'Repurpose', title: 'Short clip maker', path: '/app/clipmaker', description: 'Turn long-form videos into ready-to-publish shorts.' },
  { group: 'Ideate', title: 'Unlimited video ideas', path: '/app/ideate', description: 'Generate fresh video concepts around any topic.' },
  { group: 'Scripting', title: 'Script writer', path: '/app/script/write', description: 'Create complete scripts from a topic or source.' },
  { group: 'Scripting', title: 'Script outline', path: '/app/script/outline', description: 'Turn an idea into a structured outline.' },
  { group: 'Scripting', title: 'Rewrite script of any video', path: '/app/script/rewrite', description: 'Rewrite source material into a new script.' },
  { group: 'Upload and optimize', title: 'Video title', path: '/app/optimise/title', description: 'Generate stronger titles for your videos.' },
  { group: 'Upload and optimize', title: 'Video description', path: '/app/optimise/description', description: 'Create optimized descriptions in seconds.' },
  { group: 'Upload and optimize', title: 'Video chapters', path: '/app/optimise/chapters', description: 'Create clean chapters from your video.' },
  { group: 'Upload and optimize', title: 'Video tags', path: '/app/optimise/tags', description: 'Generate relevant discoverability tags.' },
];

const featureItems = [
  ['Center stage facial tracking', 'Ensure your active speakers never miss their spotlight. Our AI uses facial tracking technology to automatically keep them at the center of the screen.'],
  ['One-click animated subtitles', 'Increase viewer engagement and watch time effortlessly. With a single click, add animated subtitles that breathe life into your content.'],
  ['Unlimited high-quality exports', 'Say goodbye to watermarks and hello to 1080p quality. Enjoy unlimited, high-resolution exports that make your content stand out.'],
  ['Versatile aspect ratios', 'Reach your audience on every platform. Support for vertical, square, and horizontal aspect ratios lets you create perfect shorts for any platform.'],
  ['Advanced editing tools', 'Achieve your vision with our advanced editing and cropping options. They provide added flexibility when automatic face tracking is not enough.'],
  ['Brand presets', 'Make every video uniquely yours. Add brand logos and overlays to your exported videos for a distinct and visually appealing brand presence.'],
];

function App() {
  return <BrowserRouter><Shell /></BrowserRouter>;
}

function Shell() {
  const location = useLocation();
  const isPublic = ['/onboarding', '/login', '/signup'].includes(location.pathname);
  return <div className="clipin-app">
    {!isPublic && <Header />}
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/login" element={<Auth mode="login" />} />
      <Route path="/signup" element={<Auth mode="signup" />} />
      <Route path="/" element={<Hub />} />
      <Route path="/app/clipmaker" element={<ClipMaker />} />
      <Route path="/app/clipmaker/results" element={<ClipResults />} />
      <Route path="/app/ideate" element={<Generator title="Unlimited video ideas" action="Generate ideas" resultLabel="Video ideas" />} />
      <Route path="/app/hooks" element={<Generator title="Hook generator" action="Generate hooks" resultLabel="Hooks" />} />
      <Route path="/app/script/write" element={<Generator title="Script writer" action="Write script" resultLabel="Generated script" />} />
      <Route path="/app/script/outline" element={<Generator title="Script outline" action="Create outline" resultLabel="Script outline" />} />
      <Route path="/app/script/rewrite" element={<Generator title="Rewrite script of any video" action="Rewrite script" resultLabel="Rewritten script" />} />
      <Route path="/app/optimise/:kind" element={<Optimise />} />
      <Route path="/app/monetise" element={<Calculator />} />
      <Route path="/app/deals" element={<Calculator deals />} />
      <Route path="/app/schedule" element={<Schedule />} />
      <Route path="/app/history" element={<History />} />
      <Route path="/app/analytics" element={<Analytics />} />
      <Route path="/app/more" element={<More />} />
    </Routes>
  </div>;
}

function Header() {
  return <header className="topbar">
    <Link className="brand" to="/">CLIPIN<span>.</span></Link>
    <nav className="topnav">
      <NavLink to="/">Create</NavLink><NavLink to="/app/clipmaker">Clips</NavLink><NavLink to="/app/schedule">Schedule</NavLink><NavLink to="/app/analytics">Stats</NavLink>
    </nav>
    <div className="top-actions"><Link to="/app/history" className="icon-button" aria-label="History">↺</Link><Link to="/app/more" className="avatar">C</Link></div>
  </header>;
}

function Page({ eyebrow, title, intro, children }) {
  return <main className="page"><div className="page-head"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{intro && <p>{intro}</p>}</div>{children}</main>;
}

function Hub() {
  const groups = useMemo(() => [...new Set(tools.map(t => t.group))], []);
  return <Page eyebrow="CLIPIN CREATOR WORKSPACE" title="Hey, what will you create today?" intro="Explore our cutting-edge tools and start creating">
    <section className="history-strip"><div><span className="eyebrow">Recent history</span><h2>Your latest work</h2></div><Link to="/app/history" className="text-link">View all →</Link></section>
    <div className="tool-groups">{groups.map(group => <section className="tool-group" key={group}><div className="section-label">{group}</div><div className="tool-grid">{tools.filter(t => t.group === group).map(tool => <ToolCard key={tool.path} {...tool} />)}</div></section>)}</div>
    <FeatureGrid />
  </Page>;
}

function ToolCard({ title, path, description }) { return <Link to={path} className="tool-card"><span className="tool-arrow">↗</span><h3>{title}</h3><p>{description}</p></Link>; }

function FeatureGrid() { return <section className="feature-section"><div className="eyebrow">POWERFUL SHORT-FORM WORKFLOW</div><h2>Everything you need to make better clips.</h2><div className="feature-grid">{featureItems.map(([title, body]) => <article className="feature-card" key={title}><div className="feature-number">0{featureItems.findIndex(x => x[0] === title) + 1}</div><h3>{title}</h3><p>{body}</p></article>)}</div></section>; }

function Onboarding() { return <main className="auth-page"><div className="auth-mark">CLIPIN<span>.</span></div><div className="onboarding"><div className="eyebrow">01 / CREATE</div><h1>One video.<br />Infinite clips.</h1><p>Upload once. Turn long-form content into daily clips built for every platform.</p><div className="onboarding-actions"><Link to="/signup" className="button primary">Get started</Link><Link to="/login" className="button ghost">Log in</Link></div><div className="feature-mini"><span>01</span> Center stage facial tracking</div><div className="feature-mini"><span>02</span> One-click animated subtitles</div><div className="feature-mini"><span>03</span> Unlimited high-quality exports</div></div></main>; }

function Auth({ mode }) { return <main className="auth-page"><Link to="/" className="auth-mark">CLIPIN<span>.</span></Link><div className="auth-card"><div className="eyebrow">{mode === 'login' ? 'WELCOME BACK' : 'CREATE YOUR WORKSPACE'}</div><h1>{mode === 'login' ? 'Log in' : 'Create your account'}</h1><label>Email<input type="email" placeholder="you@example.com" /></label><label>Password<input type="password" placeholder="••••••••" /></label><button className="button primary">{mode === 'login' ? 'Log in' : 'Create account'}</button><Link className="text-link center" to={mode === 'login' ? '/signup' : '/login'}>{mode === 'login' ? 'New to CLIPIN? Create an account' : 'Already have an account? Log in'}</Link></div></main>; }

function ClipMaker() { const [url, setUrl] = useState(''); const [context, setContext] = useState(''); const navigate = useNavigate(); const submit = e => { e.preventDefault(); localStorage.setItem('clipin:lastVideo', JSON.stringify({ url, context, createdAt: Date.now() })); navigate('/app/clipmaker/results'); }; return <Page eyebrow="REPURPOSE" title="Ready to create shorts in seconds?" intro="Start by pasting your YouTube, TikTok, Instagram, or Google Drive link below."><form className="creator-form" onSubmit={submit}><label>Video link<div className="input-with-action"><input required value={url} onChange={e => setUrl(e.target.value)} placeholder="Drop a video link" /><span>AUTO</span></div></label><div className="form-section"><div className="section-label">Give us more context</div><label>Inspiration channel or creator handle<input value={context} onChange={e => setContext(e.target.value)} placeholder="@creator" /></label><label>Trending in country<select defaultValue="Global"><option>Global</option><option>Nigeria</option><option>United States</option><option>United Kingdom</option></select></label><label>Add more context (optional)<textarea placeholder="Tell CLIPIN what moments, tone, or audience to prioritize." /></label></div><button className="button primary wide">Generate clips ↗</button></form><FeatureGrid /></Page>; }

function ClipResults() { const data = JSON.parse(localStorage.getItem('clipin:lastVideo') || '{}'); const clips = ['Brutal truth about the project', 'The moment everything changed', 'What creators get wrong', 'The strongest answer in the interview', 'A lesson worth remembering']; return <Page eyebrow="CLIP RESULTS" title="Here are your clips" intro={`We found ${clips.length} viral moments in your video.`}><div className="result-meta">{data.url || 'Your uploaded video'} <span>AI ANALYSIS COMPLETE</span></div><div className="clip-list">{clips.map((clip, i) => <article className="clip-card" key={clip}><div className="clip-index">#{i + 1}</div><div className="clip-placeholder"><span>CLIP PREVIEW</span></div><div className="clip-copy"><h3>{clip}</h3><p>“A concise transcript preview generated from the selected moment...”</p><span className="duration">{12 + i * 13}s</span><Link to="/app/schedule" className="button small">Schedule</Link></div></article>)}</div></Page>; }

function Generator({ title, action, resultLabel }) { const [input, setInput] = useState(''); const [result, setResult] = useState(''); return <Page eyebrow="AI CREATION" title={title} intro="Give CLIPIN a topic, video, or context and generate a ready-to-use result."><div className="generator"><label>Source or topic<input value={input} onChange={e => setInput(e.target.value)} placeholder="Paste a video URL or describe your idea" /></label><label>Additional context<textarea placeholder="Audience, tone, key points, or constraints (optional)" /></label><button className="button primary" onClick={() => setResult(`Generated ${resultLabel.toLowerCase()} based on: ${input || 'your request'}.`)}>{action} ↗</button>{result && <div className="output"><div className="section-label">{resultLabel}</div><div className="output-body">{result}<br /><br />Add your production details here, then copy or export the final result.</div><div><button className="button secondary" onClick={() => navigator.clipboard?.writeText(result)}>Copy</button></div></div>}</div></Page>; }

function Optimise() { const { kind } = useParams(); const names = { title: 'Video title', description: 'Video description', chapters: 'Video chapters', tags: 'Video tags' }; return <Generator title={names[kind] || 'Video optimizer'} action={`Generate ${names[kind] || 'result'}`} resultLabel={names[kind] || 'Optimized result'} />; }

function Calculator({ deals }) { return <Page eyebrow="MONETISE" title={deals ? 'Brand deal estimator' : 'Earnings calculator'} intro="Build a practical projection from your audience, content volume, and platform reach."><div className="calculator"><label>Platform<select><option>YouTube Shorts</option><option>TikTok</option><option>Instagram Reels</option><option>YouTube Long-form</option></select></label><label>Expected views / month<input type="number" placeholder="100000" /></label><label>Followers<input type="number" placeholder="10000" /></label><label>Niche<input placeholder="Your niche" /></label><button className="button primary">Calculate ↗</button><div className="estimate"><span>Estimated monthly range</span><strong>$0 – $0</strong><p>These are projections, not guaranteed earnings. Actual results vary by audience, engagement, geography, niche, and deal availability.</p></div></div></Page>; }

function Schedule() { return <Page eyebrow="PUBLISHING HUB" title="Schedule your content" intro="Prepare clips for TikTok, Instagram, and YouTube from one workspace."><div className="schedule-form"><label>Select clip<select><option>Choose a clip</option><option>Clip #1 — Brutal truth</option><option>Clip #2 — The moment everything changed</option></select></label><div className="platform-row"><button className="pill active">TikTok</button><button className="pill">Instagram</button><button className="pill">YouTube</button></div><label>Caption<textarea placeholder="Write a caption..." /></label><div className="two-col"><label>Publish date<input type="date" /></label><label>Publish time<input type="time" /></label></div><button className="button primary">Schedule ↗</button></div></Page>; }

function History() { const item = JSON.parse(localStorage.getItem('clipin:lastVideo') || 'null'); return <Page eyebrow="WORKSPACE" title="History" intro="Your recent CLIPIN activity."><div className="history-list">{item ? <div className="history-row"><strong>{item.url}</strong><span>Clip generation</span><time>{new Date(item.createdAt).toLocaleString()}</time></div> : <div className="empty">No activity yet. Generate your first clips to see them here.</div>}</div></Page>; }
function Analytics() { return <Page eyebrow="STATS" title="Content analytics" intro="Track your creation output and publishing activity."><div className="stats-grid"><div><span>Clips created</span><strong>0</strong></div><div><span>Exports</span><strong>0</strong></div><div><span>Scheduled</span><strong>0</strong></div><div><span>Avg. clip length</span><strong>0s</strong></div></div></Page>; }
function More() { return <Page eyebrow="ACCOUNT" title="More" intro="Workspace settings and account tools."><div className="settings-list"><Link to="/app/history">History <span>→</span></Link><Link to="/app/analytics">Analytics <span>→</span></Link><Link to="/app/deals">Brand deal estimator <span>→</span></Link><Link to="/login">Sign out <span>→</span></Link></div></Page>; }

export default App;
