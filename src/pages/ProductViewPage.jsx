import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Gallery from '../components/Gallery';
import BuyBox from '../components/BuyBox';
import ProductOptions from '../components/ProductOptions';
import Section from '../components/Section';
import ProductListing from '../components/ProductListing';
import { getProduct, getProducts } from '../lib/catalog';
import { useCart } from '../context/CartContext';

export default function ProductViewPage() {
  const {id} = useParams();
  const product = getProduct(id);
  const recommended = getProducts().filter((item) => item.id !== Number(id)).slice(0, 4);
  const [selections, setSelections] = useState({});
  const size = selections[id]?.size ?? product?.sizes[0] ?? '';
  const color = selections[id]?.color ?? product?.colors[0] ?? '';
  const { add } = useCart();
  const setSize = (value) => setSelections((current) => ({...current, [id]: {...current[id], size: value}}));
  const setColor = (value) => setSelections((current) => ({...current, [id]: {...current[id], color: value}}));
  if (!product) return <div className="container not-found"><h1>Produto não encontrado</h1><p>Este item não está disponível no catálogo.</p><Link to="/products">Voltar para produtos</Link></div>;
  return <div className="container product-page">
    <Link className="back-link" to="/products"><ChevronLeft size={17}/> Voltar para produtos</Link>
    <div className="product-details-layout">
      <Gallery key={product.id} images={product.images.map(src=>({src}))} showThumbs width={700} height={570} radius="4px" alt={product.name}/>
      <BuyBox product={product} onBuy={()=>add(product,size,color)}>
        <ProductOptions label="Tamanho" options={product.sizes} value={size} onChange={setSize} shape="square" type="text" radius="4px" />
        <ProductOptions label="Cor" options={product.colors} value={color} onChange={setColor} shape="circle" type="color" />
      </BuyBox>
    </div>
    <Section title="Produtos recomendados" link={{text:'Ver todos',href:'/products'}}><ProductListing products={recommended}/></Section>
  </div>;
}
