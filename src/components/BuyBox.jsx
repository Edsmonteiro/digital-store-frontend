import { Star, ShoppingBag } from 'lucide-react';
import { money } from '../lib/money';
export default function BuyBox({product: productProp, name, reference, stars, rating, price, priceDiscount, description, children, onBuy}) {
  const product = productProp ?? {name, reference, stars, rating, price, priceDiscount, description, category: ''};
  return <div className="buy-box">
    <p className="breadcrumbs">Início / Produtos / {product.category}</p>
    <h1>{product.name}</h1>
    <p className="reference">Ref.: {product.reference} | {product.brand}</p>
    <div className="reviews"><span className="stars">{product.stars} <Star size={14} fill="currentColor" /></span><span>({product.rating} avaliações)</span></div>
    <div className="buy-price">{product.priceDiscount ? <><del>{money(product.price)}</del><strong>{money(product.priceDiscount)}</strong></> : <strong>{money(product.price)}</strong>}</div>
    <h2>Descrição do produto</h2><p className="buy-description">{product.description}</p>
    {children}
    <button className="buy-button" onClick={onBuy}><ShoppingBag size={19} /> COMPRAR</button>
    <p className="demo-note">Compra demonstrativa, sem cobrança real.</p>
  </div>;
}
