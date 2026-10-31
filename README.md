# Digital Store

Projeto final de Front-end da Digital College: uma loja virtual demonstrativa de calçados, roupas e acessórios. O catálogo é local e a aplicação não inclui backend, banco de dados, login real ou pagamentos.

## Integrante

- **Edson Monteiro** — proprietário da conta GitHub [@Edsmonteiro](https://github.com/Edsmonteiro)

## Tecnologias

- React 18 e JavaScript
- Vite
- React Router DOM
- CSS
- Lucide React

## Páginas e funcionalidades

- **Home (`/`)**: carrossel, três coleções em destaque e oito produtos em alta.
- **Produtos (`/products` e `/produtos`)**: busca pela query string `?filter=`, filtros de categoria, marca e gênero, ordenação por preço e cartões de produto.
- **Produto (`/product/:id`)**: galeria com setas e miniaturas, avaliações, preços, seleção de tamanho e cor, botão demonstrativo e recomendações.
- Cabeçalho responsivo com navegação, pesquisa e carrinho demonstrativo.
- Carrinho e pedidos simulados no navegador, sem transações ou envio de dados.

## Capturas de tela

Capturas reais das páginas publicadas, em desktop (1440px):

**Home**

![Página inicial da Digital Store](docs/screenshots/home.png)

**Listagem de produtos**

![Listagem de produtos da Digital Store](docs/screenshots/products.png)

**Visualização do produto**

![Detalhes de produto da Digital Store](docs/screenshots/product-view.png)

## Instalação e execução

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Para gerar a versão de produção e executar os testes unitários do catálogo:

```bash
npm run build
npm test
npm run test:e2e
```

## Estrutura do projeto

```text
src/
  components/  componentes reutilizáveis da loja
  context/     estado local do carrinho
  data/        catálogo de demonstração
  lib/         filtros e formatação de preços
  pages/       Home, listagem, produto e páginas auxiliares
  App.jsx      rotas da aplicação
  styles.css   estilos e breakpoints responsivos
tests/         testes do catálogo
```

## Referências

- **Aplicação publicada:** [Digital Store na Vercel](https://digital-store-frontend-iota.vercel.app)
- [Documentação oficial da Digital College](https://github.com/digitalcollegebr/projeto-digital-store)
- [Arquivo de design no Figma](https://www.figma.com/design/nUk0ihM3x4u8JQtxUoAEJf/DRIP-STORE---DIGITAL-COLLEGE--Copy-?node-id=22-30&p=f)
- [Protótipo no Figma](https://www.figma.com/proto/nUk0ihM3x4u8JQtxUoAEJf/DRIP-STORE---DIGITAL-COLLEGE--Copy-?node-id=22-30)

## Auditoria visual pelas referências oficiais

A comparação com os wireframes de `doc/layout` e as capturas atuais confirmou a estrutura das três páginas: header e footer compartilhados; Home com banner, três coleções e oito produtos; listagem com filtros e cartões; produto com galeria, opções, compra demonstrativa e recomendações.

Medidas verificadas na produção e alinhadas às especificações da Digital College:

- Logo: 253 × 44 px; banner da Home: 1440 × 681 px.
- Cartões de produto: 292 × 321 px; Home com oito produtos.
- Ordenação e sidebar da listagem: 308 px de largura; ordenação com 60 px de altura.
- Galeria do produto: 700 × 570 px; miniaturas: 117 × 95 px.
- Links de seção: 18 px; link “Cadastre-se”: 16 px; botão “Entrar”: 114 × 40 px, raio de 4 px.

Foram corrigidos os tamanhos do link de cadastro, do botão de entrada e dos links de seção, além dos gaps da grade para alcançar as dimensões dos cartões e da galeria. As medidas foram conferidas com Playwright na URL publicada.

**Pendente:** o arquivo visual do Figma não pôde ser inspecionado diretamente nesta sessão porque a política de URL bloqueou o navegador local. Os arquivos oficiais `doc/layout` são wireframes estruturais; eles não fornecem métricas completas de tipografia, espaçamento, alinhamento fino ou estados responsivos do Figma. Esses pontos ainda precisam de comparação direta com os frames do Figma, então não afirmo fidelidade pixel a pixel.

## Limitações conhecidas

- O catálogo é estático e as imagens oficiais são servidas pelo repositório público da Digital College; a exibição delas depende de conexão com a internet.
- Conta, pedidos e compra são demonstrações locais. Não há backend, banco de dados, autenticação ou pagamento real.
- A auditoria foi feita contra as referências estruturais do repositório oficial. A comparação detalhada de espaçamentos, tipografia, alinhamentos e recortes com os frames do Figma permanece pendente.

## Testes de navegador

`npm run test:e2e` usa Playwright com o Microsoft Edge instalado na máquina. Os testes cobrem as rotas principais, pesquisa e filtros, navegação da galeria, seleção das opções, carrinho demonstrativo, carregamento das imagens, console e rolagem horizontal nos breakpoints de 1440, 1366, 1024, 768, 390 e 375 pixels.

As rotas `/`, `/products` e `/product/1` também foram abertas diretamente na produção; todas responderam e renderizaram seus conteúdos sem erros de console nem rolagem horizontal em 1440 px.

**Prazo acadêmico:** 20/11/2026.
