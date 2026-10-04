import qrcode from './vendor/qrcode.mjs';
export const SITE_ORIGIN='https://rainflow-as-uetaku.grand-otter-5071.chatgpt.site';
export function stationUrl(id,origin=SITE_ORIGIN){const url=new URL(origin);if(!['https:','http:'].includes(url.protocol))throw Error('url');url.search='';url.hash='';url.searchParams.set('spot',id);return url.href;}
export function qrMatrix(value){const qr=qrcode(0,'M');qr.addData(String(value),'Byte');qr.make();return Array.from({length:qr.getModuleCount()},(_,y)=>Array.from({length:qr.getModuleCount()},(_,x)=>qr.isDark(y,x)));}
export function qrSvg(value){const data=qrMatrix(value),size=data.length+8;let path='';data.forEach((row,y)=>row.forEach((dark,x)=>{if(dark)path+=`M${x+4} ${y+4}h1v1h-1z`;}));return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="800" height="800" role="img" aria-label="QR code" shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="white"/><path d="${path}" fill="#10243b"/></svg>`;}
export function qrPixels(value,scale=12){const data=qrMatrix(value),size=(data.length+8)*scale,rgba=new Uint8ClampedArray(size*size*4);rgba.fill(255);data.forEach((row,y)=>row.forEach((dark,x)=>{if(!dark)return;for(let dy=0;dy<scale;dy++)for(let dx=0;dx<scale;dx++){const i=(((y+4)*scale+dy)*size+(x+4)*scale+dx)*4;rgba[i]=16;rgba[i+1]=36;rgba[i+2]=59;}}));return {data:rgba,width:size,height:size};}
export function downloadQr(id,origin=SITE_ORIGIN,format='png'){
 const url=stationUrl(id,origin),link=document.createElement('a');link.download=`RainFlowAs-${id}-QR.${format}`;
 if(format==='svg'){const blob=new Blob([qrSvg(url)],{type:'image/svg+xml'});link.href=URL.createObjectURL(blob);link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000);return;}
 const pixels=qrPixels(url,20),canvas=document.createElement('canvas');canvas.width=pixels.width;canvas.height=pixels.height;const ctx=canvas.getContext('2d');ctx.putImageData(new ImageData(pixels.data,pixels.width,pixels.height),0,0);link.href=canvas.toDataURL('image/png');link.click();
}
