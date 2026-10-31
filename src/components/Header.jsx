import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useCart } from '../context/CartContext';

export default function Header() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const location = useLocation();
  const [term, setTerm] = useState(params.get('filter') || '');
  const [mobileMenu, setMobileMenu] = useState(false);
  const { count, setOpen } = useCart();
  useEffect(() => setTerm(params.get('filter') || ''), [location.search, params]);
  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/products', label: 'Produtos' },
    { to: '/products?category=Calçados', label: 'Categorias' },
    { to: '/orders', label: 'Meus pedidos' }
  ];
  function submit(event) {
    event.preventDefault();
    navigate(`/products${term.trim() ? `?filter=${encodeURIComponent(term.trim())}` : ''}`);
    setMobileMenu(false);
  }
  return <header className="site-header">
    <div className="header-top container">
      <Logo />
      <form className="search-form" onSubmit={submit} role="search">
        <input aria-label="Buscar produtos" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Pesquisar produto..." />
        <button type="submit" aria-label="Pesquisar"><Search size={20} /></button>
      </form>
      <div className="header-actions">
        <Link className="register-link" to="/account?mode=register">Cadastre-se</Link>
        <Link className="login-link" to="/account?mode=login">Entrar</Link>
        <button className="cart-trigger" onClick={() => setOpen(true)} aria-label={`Abrir carrinho com ${count} itens`}>
          <ShoppingCart size={25} strokeWidth={1.9} />{count > 0 && <span className="cart-count">{count}</span>}
        </button>
        <button className="menu-button" aria-label={mobileMenu ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
      </div>
    </div>
    <nav className={`main-nav container ${mobileMenu ? 'is-open' : ''}`} aria-label="Navegação principal">
      {links.map(({to,label,end}) => <NavLink key={label} to={to} end={end} onClick={() => setMobileMenu(false)} className={({isActive}) => {
        const active = label === 'Categorias'
          ? isActive && location.search.includes('category=')
          : label === 'Produtos'
            ? isActive && !location.search.includes('category=')
            : isActive;
        return active ? 'active' : undefined;
      }}>{label}</NavLink>)}
    </nav>
  </header>;
}
