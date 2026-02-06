export default function Tag({children, color='default'}){
  const style = { padding:'6px 8px', borderRadius:999, display:'inline-block', fontSize:13 };
  if(color==='bad') style.background='rgba(239,68,68,0.08)', style.color='#dc2626';
  if(color==='good') style.background='rgba(16,185,129,0.08)', style.color='#059669';
  return <span style={style}>{children}</span>
}
