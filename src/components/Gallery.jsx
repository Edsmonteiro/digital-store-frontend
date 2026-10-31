import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
export default function Gallery({images, showThumbs = false, width, height, radius = '4px', alt = 'Produto', className = ''}) {
  const [selected,setSelected] = useState(0);
  useEffect(() => setSelected(0), [images?.[0]?.src]);
  if (!images?.length) return null;
  const previous = () => setSelected((index) => Math.max(0,index-1));
  const next = () => setSelected((index) => Math.min(images.length-1,index+1));
  return <div className={`gallery ${showThumbs ? 'gallery-product' : 'gallery-banner'} ${className}`} style={{'--gallery-width': width ? `${width}px` : '100%', '--gallery-height': height ? `${height}px` : 'auto', '--gallery-radius': radius}}>
    <div className="gallery-stage"><img src={images[selected].src} alt={`${alt}, imagem ${selected + 1} de ${images.length}`} />
      <button type="button" className="gallery-prev" onClick={previous} disabled={selected === 0} aria-label="Imagem anterior"><ChevronLeft /></button>
      <button type="button" className="gallery-next" onClick={next} disabled={selected === images.length - 1} aria-label="Próxima imagem"><ChevronRight /></button>
    </div>
    {showThumbs ? <div className="gallery-thumbs">{images.map((img,index) => <button type="button" key={`${img.src}-${index}`} className={selected === index ? 'selected' : ''} onClick={() => setSelected(index)} aria-label={`Mostrar imagem ${index+1}`}><img src={img.src} alt="" /></button>)}</div> : <div className="gallery-dots">{images.map((_,index) => <button key={index} className={selected===index?'selected':''} onClick={()=>setSelected(index)} aria-label={`Ir para slide ${index + 1}`}/>)}</div>}
  </div>;
}
