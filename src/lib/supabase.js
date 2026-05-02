import { createClient } from '@supabase/supabase-js'

// ── Replace these with your real values from supabase.com/dashboard ──
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ── DEFAULT CONTENT ─────────────────────────────────────────────────
// This is the fallback when Supabase isn't connected yet.
// Once connected, the admin can edit all of this from the dashboard.
export const DEFAULT_CONTENT = {
  // ── GLOBAL ──
  global: {
    brandName:    'Frost Production Studio',
    designerName: 'Richard Amune',
    email:        'hello@frostproductionstudio.com',
    location:     'Lagos, Nigeria',
    vimeoUrl:     'https://vimeo.com',
    instagramUrl: 'https://instagram.com',
    linkedinUrl:  'https://linkedin.com',
    behanceUrl:   'https://behance.net',
    showreelUrl:  'https://player.vimeo.com/video/YOUR_VIDEO_ID?autoplay=1',
  },

  // ── HOME PAGE ──
  home: {
    heroEyebrow:  'Motion Designer & Visual Storyteller',
    heroTitle:    'RICHARD',
    heroSubtitle: 'Amune',
    heroBody:     'Frost Production Studio — crafting kinetic narratives that move brands forward. From concept to final frame, every pixel in motion.',
    statsYears:   '8+',
    statsProjects:'200+',
    statsClients: '60+',
    showreelDuration: '4 minutes 32 seconds',
    showreelFeatured: 'Brand Identity · Broadcast · 3D · UI Motion',
    showreelTools:    'After Effects · Cinema 4D · DaVinci',
    aboutQuote:   '"Motion is the language that turns brand stories into felt experiences."',
    aboutBody:    'Based in Lagos and available worldwide, Frost Production Studio crafts motion identities for brands that refuse to stand still. Every project begins with one question: what does this need to feel like?',
    ctaTitle:     "Let's",
    ctaAccent:    'Work',
    marqueeItems: ['Title Sequences','Brand Identity','Visual Effects','Broadcast Design','3D Animation','Frost Production Studio','UI / UX Motion','After Effects'],
  },

  // ── ABOUT PAGE ──
  about: {
    headline:     'Motion designer with an obsession for craft.',
    bio1:         "I'm Richard Amune, founder of Frost Production Studio. My career began in broadcast design, developing a deep respect for the constraints of motion — the discipline of creating something that has to work at 24 frames a second, under any lighting condition, on any screen.",
    bio2:         'Today, Frost Production Studio works at the intersection of brand identity, visual storytelling, and emerging technology. Our clients range from global brands launching new campaigns to independent filmmakers.',
    bio3:         'Every project begins with one question: what does this need to feel like? The motion is always in service of that answer.',
    basedIn:      'Lagos, Nigeria — available worldwide',
    quote:        "Motion is not decoration. It is the moment a brand stops existing on a page and starts living in someone's memory.",
    portraitUrl:  '',
    availability: ['Freelance Projects','Creative Direction','Studio Retainers','Workshops'],
    clients:      ['Nike','BBC','Spotify','Airbnb','Channel 4','Adidas','MTN','Vogue'],
  },

  // ── PROJECTS ──
  projects: [
    { id:1, cat:'branding',  tag:'Brand Identity',    title:'NOVA COLLECTIVE',      year:'2024', desc:'A complete motion identity system for a Berlin-based creative studio — from logo sting to 90-second brand film.', imageUrl:'', grad:'linear-gradient(135deg,#04080f 0%,#0d1a3a 40%,#1e6fff 100%)', link:'/project-nova', featured:true, visible:true },
    { id:2, cat:'broadcast', tag:'Broadcast',          title:'DEEP CURRENT SERIES',  year:'2024', desc:'Title sequence and full broadcast package for an award-winning documentary series on climate and oceans.',        imageUrl:'', grad:'linear-gradient(135deg,#060c18 0%,#0a1830 60%,#4a90d9 100%)', link:'', featured:false, visible:true },
    { id:3, cat:'3d',        tag:'3D Animation',       title:'AURUM FRAGRANCE',      year:'2023', desc:'Photorealistic 3D product animation for a luxury fragrance launch campaign across digital and OOH.',             imageUrl:'', grad:'linear-gradient(135deg,#06101a 0%,#0c2040 60%,#7aa8e8 100%)', link:'', featured:false, visible:true },
    { id:4, cat:'ui',        tag:'UI Motion',           title:'PULSE APP',            year:'2023', desc:'Motion design system for a health-tech startup — micro-interactions, onboarding flows and Lottie animations.',    imageUrl:'', grad:'linear-gradient(135deg,#0a0614 0%,#180a30 60%,#6644cc 100%)', link:'', featured:false, visible:true },
    { id:5, cat:'branding',  tag:'Branding',            title:'VERDANT STUDIOS',      year:'2023', desc:'Brand motion for an independent film production house — identity animations and festival title cards.',           imageUrl:'', grad:'linear-gradient(135deg,#040c18 0%,#081828 60%,#0044cc 100%)', link:'', featured:false, visible:true },
    { id:6, cat:'broadcast', tag:'Title Sequence',     title:'ECHOES',               year:'2022', desc:'Opening title sequence for a multi-part documentary series on African music and cultural identity.',             imageUrl:'', grad:'linear-gradient(160deg,#04080f 0%,#091428 30%,#1e6fff 70%,#7aa8e8 100%)', link:'', featured:false, visible:true },
    { id:7, cat:'3d',        tag:'3D · Broadcast',     title:'ORBIT NETWORK',         year:'2022', desc:'Full broadcast rebrand including idents, stings and transition package for a pan-African news network.',         imageUrl:'', grad:'linear-gradient(135deg,#060814 0%,#0c1430 60%,#2244aa 100%)', link:'', featured:false, visible:true },
    { id:8, cat:'ui',        tag:'UI Motion',           title:'SOLARA DASHBOARD',     year:'2022', desc:'Data visualisation animations and dashboard motion design for a renewable energy monitoring platform.',          imageUrl:'', grad:'linear-gradient(135deg,#080610 0%,#140c28 60%,#4422aa 100%)', link:'', featured:false, visible:true },
    { id:9, cat:'branding',  tag:'Brand Identity',     title:'KANO CREATIVE',        year:'2021', desc:'Full motion identity for a creative agency based in Kano — from concept through to brand film.',                imageUrl:'', grad:'linear-gradient(135deg,#04080f 0%,#0d1a3a 60%,#1e4fcc 100%)', link:'', featured:false, visible:true },
  ],

  // ── PROJECT NOVA CASE STUDY ──
  nova: {
    client:      'Nova Collective GmbH',
    location:    'Berlin-Mitte, Germany',
    deliveredBy: 'Richard Amune — Frost Production Studio',
    tools:       'After Effects · Cinema 4D · DaVinci Resolve',
    budget:      '€ 38,000 — €45,000',
    timeline:    '12 weeks · Jan 8 — Mar 28, 2024',
    format:      'ProRes 4444, H.264 web, After Effects source files',
    brief:       "Nova Collective came to Frost Production Studio in December 2023 with a clear problem: they were a world-class creative studio with a name that promised something special, but their brand moved like it was standing still.",
    brief2:      'The ask was ambitious — build a complete motion identity system that could scale from a 3-second logo sting to a 90-second brand film. Everything needed to feel like it was in conversation: the easing curves, the typographic rhythm, the way colour appeared and disappeared.',
    quote:       "We want people to watch our logo and feel something they can't quite name.",
    quoteAuthor: 'Léa Sørensen, Creative Director, Nova Collective',
    outcome1:    '4.2M', outcome1Label: 'Brand Film Views',
    outcome2:    '+68%', outcome2Label: 'Inbound Inquiries',
    outcome3:    '3',    outcome3Label: 'Industry Awards',
    outcome4:    '28',   outcome4Label: 'Deliverables',
    testimony:   'Working with Richard at Frost Production Studio was the closest thing to having a sixth sense in the room. He understood what we wanted before we could articulate it — and then made something better.',
    testimonyBy: 'Léa Sørensen · Creative Director · Nova Collective',
  },
}
