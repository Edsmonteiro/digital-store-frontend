import { Link } from 'react-router-dom';
import { getCollections, getProducts } from '../lib/catalog';
import Gallery from '../components/Gallery';
import Section from '../components/Section';
import ProductListing from '../components/ProductListing';

const cdn = '/store/';
const slides = [1, 2, 3].map(number => ({src: `${cdn}home-slide-${number}.jpeg`}));

export default function HomePage() {
  const products = getProducts({featured: true}).slice(0, 8);
  const collections = getCollections();
  return <>
    <div className="hero"><Gallery images={slides} width={1440} height={681} alt="Coleção em destaque" />
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
