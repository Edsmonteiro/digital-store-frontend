import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCollections, getProducts } from '../lib/catalog';
import Gallery from '../components/Gallery';
import Section from '../components/Section';
import ProductListing from '../components/ProductListing';

const cdn = 'https://raw.githubusercontent.com/digitalcollegebr/projeto-digital-store/main/public/';
const slides = [1, 2, 3].map(number => ({src: `${cdn}home-slide-${number}.jpeg`}));

export default function HomePage() {
  const products = getProducts({featured: true}).slice(0, 8);
  const collections = getCollections();
  return <>
    <div className="hero"><Gallery images={slides} width={1440} height={681} alt="Coleção em destaque" />
      <div className="container hero-content"><p className="hero-eyebrow">Na Digital Store</p><h1>Tênis, roupas e <span>acessórios.</span></h1><p>Tem modelos casuais, peças básicas e ofertas no catálogo. Dá uma olhada e escolha o que gostar.</p><Link to="/products" className="primary-button">Ver produtos <ArrowRight size={18}/></Link></div>
    </div>
    <div className="container home-content">
      <Section title="Coleções em destaque" titleAlign="center" className="collections-section">
        <div className="collections-grid">{collections.map((collection) => <Link key={collection.title} to={`/products?category=${encodeURIComponent(collection.category)}`} className="collection-card"><img src={collection.image} alt={collection.title} /></Link>)}</div>
      </Section>
      <Section title="Produtos em alta" titleAlign="left" link={{text:'Ver todos',href:'/products'}}>
        <ProductListing products={products} />
      </Section>
    </div>
  </>;
}
