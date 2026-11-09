import { Link } from 'react-router-dom';
import Logo from './Logo';
const socials = '/store/';
const groups = [
  { title: 'Informações', links: [{text:'Sobre a Drip Store',to:'/account'},{text:'Produtos',to:'/products'},{text:'Categorias',to:'/products?category=Calçados'}] },
  { title: 'Navegação', links: [{text:'Página inicial',to:'/'},{text:'Meus pedidos',to:'/orders'},{text:'Ver coleção',to:'/products'}] }
];
function FooterInfo({title,informations}) { return <div className="footer-links"><h3>{title}</h3>{informations.map(info=><Link key={info.text} to={info.link}>{info.text}</Link>)}</div> }
export default function Footer() {
  return <footer className="site-footer">
    <div className="container footer-columns">
      <div className="footer-about"><Logo light /><p>Uma loja de exemplo com tênis, roupas e acessórios, criada para o projeto de Front-end da Digital College.</p><div className="social-links">
        {['facebook','instagram','twitter'].map((social) => <a key={social} href={`https://${social}.com`} aria-label={`Abrir ${social}`} target="_blank" rel="noreferrer"><img src={`${socials}${social}.svg`} alt="" width="20" height="20" /></a>)}
      </div></div>
      {groups.map((group) => <FooterInfo key={group.title} title={group.title} informations={group.links.map(({text,to})=>({text,link:to}))} />)}
      <div className="footer-links"><h3>Contato</h3><p>Fortaleza, CE</p><p>Projeto desenvolvido para a Digital College.</p></div>
    </div>
    <div className="container"><hr className="footer-divider" /><div className="footer-bottom">© {new Date().getFullYear()} Digital Store</div></div>
  </footer>;
}
