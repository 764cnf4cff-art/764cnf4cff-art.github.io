const paths={
 mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8"/>',
 sound:'<path d="m3 9 4 0 5-5v16l-5-5H3Zm13-2a7 7 0 0 1 0 10m3-13a11 11 0 0 1 0 16"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M7 2v6m10-6v6M8 15h3m3 0h2m-8 3h3"/>',
 alert:'<path d="m12 3 10 18H2Z"/><path d="M12 9v5m0 3h.01"/>',
 umbrella:'<path d="M2 12a10 10 0 0 1 20 0c-2-2-4-2-6 0-2-2-4-2-6 0-3-2-5-2-8 0Z"/><path d="M12 2v17a3 3 0 0 0 6 0"/>',
 home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
 pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
 qr:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M7 7h3v3H7zm7 0h3v3h-3zM7 14h3v3H7zm7 0h3v3h-3z"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
 gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13m0-13C3 10 4 1 8 3c2 0 4 5 4 5Zm0 0c9 2 8-7 4-5-2 0-4 5-4 5Z"/>',
 arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',chevron:'<path d="m9 5 7 7-7 7"/>',back:'<path d="m14 5-7 7 7 7"/>',
 heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 rain:'<path d="M6 16H5a4 4 0 0 1 0-8 7 7 0 0 1 13-1 4.5 4.5 0 0 1 1 9h-1M8 18l-1 3m6-3-1 3m6-3-1 3"/>',
 search:'<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',locate:'<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>',
 help:'<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 4m0 3h.01"/>',
 check:'<path d="m5 12 4 4L19 6"/>',x:'<path d="m6 6 12 12M6 18 18 6"/>',
 university:'<path d="m3 9 9-6 9 6M4 10h16M5 10v10m5-10v10m4-10v10m5-10v10M3 21h18"/>',
 train:'<rect x="5" y="3" width="14" height="15" rx="4"/><path d="M5 11h14m-7-8v8m-5 9-2 2m10-2 2 2M8 15h1m6 0h1"/>',
 store:'<path d="M3 9h18l-2-6H5Zm1 0v12h16V9M9 21v-7h6v7"/><path d="M3 9c0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0"/>',
 coffee:'<path d="M4 8h13v8a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Zm13 1h2a3 3 0 0 1 0 6h-2M7 3v2m4-3v3m4-2v2"/>',
 leaf:'<path d="M20 3c-13-1-20 12-11 16C18 23 21 13 20 3ZM4 22 16 9"/>',
 chart:'<path d="M3 3v18h18M7 15l4-5 4 3 6-7"/>',settings:'<path d="M3 7h18M3 17h18"/><circle cx="8" cy="7" r="3" fill="currentColor"/><circle cx="16" cy="17" r="3" fill="currentColor"/>',
 shield:'<path d="m12 2 8 4v6c0 6-8 10-8 10S4 18 4 12V6Z"/><path d="m8 12 3 3 5-5"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4"/>',
 star:'<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z"/>',
 logout:'<path d="M9 4H4v16h5m6-13 5 5-5 5m-7-5h12"/>',camera:'<path d="M4 6h4l2-3h4l2 3h4v15H4Z"/><circle cx="12" cy="13" r="4"/>',
 plus:'<path d="M12 4v16M4 12h16"/>',download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
 bell:'<path d="M6 8a6 6 0 0 1 12 0v6l2 3H4l2-3Zm4 12h4"/>',map:'<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2Zm6-2v16m6-14v16"/>'
};
export const icon=(name,cls='')=>`<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.umbrella}</svg>`;
export function umbrellaArt(){return `<svg class="umbrella-art" viewBox="0 0 400 300" fill="none" aria-hidden="true"><ellipse cx="210" cy="257" rx="102" ry="12" fill="#728FD2" opacity=".12"/><g transform="rotate(17 225 140)"><path d="M230 55v167c0 29 37 31 37 7" stroke="#183B76" stroke-width="9" stroke-linecap="round"/><path d="M106 139c5-129 243-131 248 0-31-18-49-18-72 0-40-23-62-23-94 0-31-18-55-18-82 0Z" fill="#367BF6"/><path d="M230 42c-35 6-55 47-42 97 34-23 58-23 94 0-5-64-19-95-52-97Z" fill="#8FB4FF"/><path d="M230 42c45-2 107 25 124 97-30-18-49-18-72 0-3-51-21-87-52-97Z" fill="#1E57D0"/><path d="M230 32v10" stroke="#183B76" stroke-width="6" stroke-linecap="round"/><path d="M185 64c-17 9-32 22-42 42" stroke="#BED4FF" stroke-width="5" stroke-linecap="round"/></g><g stroke="#81A6EA" stroke-width="3" stroke-linecap="round" opacity=".6"><path d="m85 65-6 12m53-51-5 10m214 136-5 10M103 196l-5 10m239-173-6 12m-177 168-5 10"/></g><circle cx="104" cy="147" r="4" fill="#BED3FC"/><circle cx="338" cy="232" r="5" fill="#BED3FC"/></svg>`;}
export function stationArt(){return `<svg viewBox="0 0 520 220" class="station-art" aria-hidden="true"><rect width="520" height="220" fill="#eaf0fa"/><path d="M0 167H520V220H0Z" fill="#dce6f3"/><rect x="37" y="28" width="136" height="140" rx="3" fill="#f8fbff"/><path d="M47 47h115M47 75h115M47 103h115M47 130h115" stroke="#dce5f1" stroke-width="9"/><rect x="322" y="14" width="165" height="154" fill="#f5f8fc"/><g fill="#cfdcec"><path d="M338 29h25v26h-25zm44 0h25v26h-25zm44 0h25v26h-25zM338 75h25v26h-25zm44 0h25v26h-25zm44 0h25v26h-25z"/></g><ellipse cx="265" cy="193" rx="100" ry="12" fill="#bccce2" opacity=".6"/><rect x="191" y="61" width="137" height="127" rx="7" fill="#235ed8"/><rect x="183" y="48" width="153" height="31" rx="6" fill="#367cf5"/><text x="259" y="69" fill="white" font-size="12" text-anchor="middle" font-family="sans-serif" letter-spacing="2">RAIN FLOW AS</text><rect x="205" y="91" width="109" height="77" rx="4" fill="#143778"/><g stroke="#9ec2ff" stroke-width="5" stroke-linecap="round"><path d="M219 108v45m19-45v45m19-45v45m19-45v45m19-45v45"/></g><g stroke="#f7fbff" stroke-width="3" fill="none"><path d="M219 108v-9c0-9 8-9 8 0m11 9v-9c0-9 8-9 8 0m11 9v-9c0-9 8-9 8 0m11 9v-9c0-9 8-9 8 0m11 9v-9c0-9 8-9 8 0"/></g><rect x="313" y="98" width="11" height="15" fill="white"/><path d="M196 188v10m126-10v10" stroke="#143778" stroke-width="6"/><path d="M103 173v-54m310 58v-55" stroke="#879d9b" stroke-width="8"/><g fill="#94b8a8"><circle cx="103" cy="113" r="32"/><circle cx="84" cy="139" r="22"/><circle cx="123" cy="139" r="23"/><circle cx="413" cy="112" r="32"/><circle cx="393" cy="134" r="23"/><circle cx="435" cy="136" r="24"/></g></svg>`;}
