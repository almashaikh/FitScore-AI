export default function ResumeViewer({ text }){
  return (
    <div className="card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center', marginBottom:12}}>
        <div>
          <div className="h2">Extracted Resume</div>
          <div className="small muted">Parsed text preview (editable feature can be added later)</div>
        </div>
      </div>
      <div className="resume-view">{text || <span className="muted">No parsed text yet.</span>}</div>
    </div>
  );
}
