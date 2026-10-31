import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductListing from '../components/ProductListing';
import FilterGroup from '../components/FilterGroup';
import Section from '../components/Section';
import { getProducts } from '../lib/catalog';

const categoryOptions = [{text:'Todas',value:''},...['Calçados','Roupas','Acessórios'].map(value=>({text:value,value}))];
const brandOptions = [{text:'Todas',value:''},...['Nike','Adidas','Puma','Vans','Converse'].map(value=>({text:value,value}))];
const genderOptions = [{text:'Todos',value:''},...['Masculino','Feminino','Unissex'].map(value=>({text:value,value}))];
export default function ProductListingPage() {
  const [params,setParams] = useSearchParams();
  const [showFilters,setShowFilters] = useState(false);
  const products = getProducts(Object.fromEntries(params.entries()));
  function change(key,value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key,value); else next.delete(key);
    setParams(next);
  }
  return <div className="container catalog-page">
    <div className="page-heading"><p>Home / Produtos</p><h1>Encontre o seu próximo favorito</h1><span>Escolha entre os itens da nossa coleção.</span></div>
    <div className="catalog-toolbar"><button className="mobile-filter-toggle" onClick={()=>setShowFilters(!showFilters)}><SlidersHorizontal size={19}/> Filtrar produtos</button></div>
    <div className="catalog-layout">
      <aside className={`catalog-sidebar ${showFilters?'visible':''}`}>
        <label className="sort-control"><span>Ordenar por</span><select value={params.get('sort')||''} onChange={e=>change('sort',e.target.value)}><option value="">Destaques</option><option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option></select></label>
        <div className={`filters-panel ${showFilters?'visible':''}`}><div className="filter-top"><h2>Filtrar por</h2><button className="mobile-filter-close" aria-label="Fechar filtros" onClick={()=>setShowFilters(false)}><X/></button></div>
        <FilterGroup title="Categoria" options={categoryOptions} value={params.get('category')||''} onChange={v=>change('category',v)} />
        <FilterGroup title="Marca" options={brandOptions} value={params.get('brand')||''} onChange={v=>change('brand',v)} />
        <FilterGroup title="Gênero" options={genderOptions} value={params.get('gender')||''} onChange={v=>change('gender',v)} />
        <button className="clear-filters" onClick={()=>{setParams({})}}>Limpar filtros</button>
        </div>
      </aside>
      <div className="catalog-results">
        {params.get('filter') && <p className="catalog-query">Busca: “{params.get('filter')}”</p>}
        <Section title={`${products.length} produto${products.length !== 1?'s':''} encontrado${products.length !== 1?'s':''}`} titleAlign="left">
          {!products.length ? <div className="empty-state"><h2>Nenhum produto encontrado</h2><p>Tente buscar por outro termo ou remover os filtros.</p><button onClick={()=>{setParams({})}}>Ver todos os produtos</button></div> : <ProductListing products={products} />}
        </Section>
      </div>
    </div>
  </div>;
}
