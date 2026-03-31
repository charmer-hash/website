"use client";

import { Safari } from "@/components/ui/safari";

const safariScreen = encodeURIComponent(`
  <svg width="1600" height="933" viewBox="0 0 1600 933" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="1600" height="933" fill="#F8FBFF"/>
    <rect width="1600" height="933" fill="url(#bg)"/>
    <circle cx="1220" cy="120" r="240" fill="url(#glowA)"/>
    <circle cx="250" cy="760" r="210" fill="url(#glowB)"/>

    <rect x="72" y="64" width="1456" height="805" rx="40" fill="rgba(255,255,255,0.72)" stroke="rgba(226,232,240,0.88)"/>

    <rect x="116" y="108" width="420" height="154" rx="28" fill="rgba(255,255,255,0.92)" stroke="#E2E8F0"/>
    <text x="326" y="156" text-anchor="middle" fill="#0F172A" font-size="20" font-family="Arial, sans-serif" font-weight="700" letter-spacing="2">PERSONAL AI WEBSITE</text>
    <text x="326" y="204" text-anchor="middle" fill="#0F172A" font-size="48" font-family="Arial, sans-serif" font-weight="700">AI Product Notes</text>
    <text x="326" y="238" text-anchor="middle" fill="#64748B" font-size="20" font-family="Arial, sans-serif">Designing useful systems for real workflows</text>

    <rect x="116" y="296" width="286" height="493" rx="30" fill="rgba(255,255,255,0.96)" stroke="#E2E8F0"/>
    <text x="152" y="350" fill="#0F172A" font-size="18" font-family="Arial, sans-serif" font-weight="700" letter-spacing="2">OVERVIEW</text>
    <rect x="152" y="388" width="214" height="88" rx="24" fill="#EFF6FF" stroke="#BFDBFE"/>
    <text x="182" y="437" fill="#0369A1" font-size="24" font-family="Arial, sans-serif" font-weight="700">Context</text>
    <rect x="182" y="453" width="108" height="8" rx="4" fill="#7DD3FC"/>
    <rect x="152" y="496" width="214" height="88" rx="24" fill="#F8FAFC" stroke="#E2E8F0"/>
    <text x="182" y="545" fill="#334155" font-size="24" font-family="Arial, sans-serif" font-weight="700">Tools</text>
    <rect x="182" y="561" width="120" height="8" rx="4" fill="#CBD5E1"/>
    <rect x="152" y="604" width="214" height="126" rx="24" fill="#FFFFFF" stroke="#E2E8F0"/>
    <text x="182" y="650" fill="#0F172A" font-size="24" font-family="Arial, sans-serif" font-weight="700">Feedback loop</text>
    <rect x="182" y="670" width="142" height="8" rx="4" fill="#DBEAFE"/>
    <rect x="182" y="694" width="114" height="8" rx="4" fill="#E2E8F0"/>

    <rect x="432" y="296" width="1052" height="493" rx="30" fill="rgba(255,255,255,0.96)" stroke="#E2E8F0"/>
    <rect x="476" y="340" width="430" height="405" rx="28" fill="url(#panel)" stroke="#BFDBFE"/>
    <rect x="510" y="374" width="362" height="337" rx="24" fill="rgba(255,255,255,0.26)"/>
    <circle cx="691" cy="542" r="96" fill="rgba(255,255,255,0.72)"/>
    <circle cx="691" cy="542" r="54" fill="rgba(255,255,255,0.76)"/>
    <path d="M668 495L748 542L668 589V495Z" fill="#0EA5E9"/>

    <g transform="translate(960 376)">
      <text x="262" y="0" text-anchor="middle" fill="#0F172A" font-size="48" font-family="Arial, sans-serif" font-weight="700">Personal AI Interface</text>
      <text x="262" y="44" text-anchor="middle" fill="#475569" font-size="22" font-family="Arial, sans-serif">Observation, orchestration,</text>
      <text x="262" y="76" text-anchor="middle" fill="#475569" font-size="22" font-family="Arial, sans-serif">guardrails and usable feedback.</text>
      <rect x="52" y="118" width="420" height="10" rx="5" fill="#E2E8F0"/>
      <rect x="82" y="144" width="360" height="10" rx="5" fill="#E2E8F0"/>

      <rect x="86" y="194" width="170" height="54" rx="27" fill="#0F172A"/>
      <text x="171" y="228" text-anchor="middle" fill="#FFFFFF" font-size="20" font-family="Arial, sans-serif" font-weight="700">Watch demo</text>
      <rect x="274" y="194" width="186" height="54" rx="27" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="367" y="228" text-anchor="middle" fill="#334155" font-size="20" font-family="Arial, sans-serif" font-weight="700">Open notes</text>

      <rect x="64" y="290" width="128" height="72" rx="20" fill="#F8FAFC" stroke="#E2E8F0"/>
      <rect x="198" y="290" width="128" height="72" rx="20" fill="#F0FDF4" stroke="#BBF7D0"/>
      <rect x="332" y="290" width="128" height="72" rx="20" fill="#FAF5FF" stroke="#DDD6FE"/>
      <text x="128" y="332" text-anchor="middle" fill="#0F172A" font-size="20" font-family="Arial, sans-serif" font-weight="700">Agents</text>
      <text x="262" y="332" text-anchor="middle" fill="#166534" font-size="20" font-family="Arial, sans-serif" font-weight="700">Eval</text>
      <text x="396" y="332" text-anchor="middle" fill="#6D28D9" font-size="20" font-family="Arial, sans-serif" font-weight="700">Memory</text>
    </g>

    <defs>
      <linearGradient id="bg" x1="800" y1="0" x2="800" y2="933" gradientUnits="userSpaceOnUse">
        <stop stop-color="#F8FBFF"/>
        <stop offset="1" stop-color="#ECF5FF"/>
      </linearGradient>
      <linearGradient id="panel" x1="488" y1="338" x2="872" y2="638" gradientUnits="userSpaceOnUse">
        <stop stop-color="#DFF4FF"/>
        <stop offset="1" stop-color="#DCEAFE"/>
      </linearGradient>
      <radialGradient id="glowA" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1220 120) rotate(90) scale(240)">
        <stop stop-color="#CFFAFE" stop-opacity="0.95"/>
        <stop offset="1" stop-color="#CFFAFE" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glowB" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(250 760) rotate(90) scale(210)">
        <stop stop-color="#DBEAFE" stop-opacity="0.92"/>
        <stop offset="1" stop-color="#DBEAFE" stop-opacity="0"/>
      </radialGradient>
    </defs>
  </svg>
`);

const screenSrc = `data:image/svg+xml;charset=UTF-8,${safariScreen}`;

export function HeroOrbScene() {
  return (
    <Safari
      url="whiteinte.com"
      imageSrc={screenSrc}
      className="block w-full max-w-full overflow-hidden rounded-[1.75rem] shadow-[0_30px_80px_rgba(148,163,184,0.16)]"
    />
  );
}
