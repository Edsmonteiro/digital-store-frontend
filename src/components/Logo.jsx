import { Link } from 'react-router-dom';
const url = 'https://raw.githubusercontent.com/digitalcollegebr/projeto-digital-store/main/assets/';
export default function Logo({ light = false }) {
  return <Link to="/" className="brand" aria-label="Drip Store, ir para início">
    <img src={`${url}${light ? 'logo-footer.svg' : 'logo-header.svg'}`} alt="Digital Store" width="253" height="44" />
  </Link>;
}
