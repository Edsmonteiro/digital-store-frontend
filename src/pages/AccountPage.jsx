import { Link, useSearchParams } from 'react-router-dom';
export default function AccountPage() {
 const [params]=useSearchParams(); const isRegister=params.get('mode')==='register';
 return <div className="container account-page"><div className="account-card"><p className="eyebrow">Drip Store</p><h1>{isRegister?'Crie sua conta':'Bem-vindo de volta'}</h1><p>Esta é uma versão acadêmica da loja. O catálogo e o pedido demonstrativo funcionam sem necessidade de cadastro.</p><Link className="primary-button" to="/products">Conhecer os produtos</Link></div></div>;
}
