const cdn = 'https://raw.githubusercontent.com/digitalcollegebr/projeto-digital-store/main/public/';

export const collections = [
  { title: 'Estilo que acompanha', tag: 'Camisetas', image: `${cdn}collection-1.png`, category: 'Roupas' },
  { title: 'O detalhe faz diferença', tag: 'Acessórios', image: `${cdn}collection-2.png`, category: 'Acessórios' },
  { title: 'Para todos os dias', tag: 'Calçados', image: `${cdn}collection-3.png`, category: 'Calçados' }
];

const data = [
  ['Tênis Street Move', 'Calçados', 'Nike', 'Unissex', 299.90, 219.90, 'product-thumb-1.jpeg'],
  ['Tênis Court Classic', 'Calçados', 'Adidas', 'Masculino', 349.90, 289.90, 'product-thumb-2.jpeg'],
  ['Tênis Urban Runner', 'Calçados', 'Puma', 'Feminino', 399.90, 319.90, 'product-thumb-3.jpeg'],
  ['Tênis Casual Canvas', 'Calçados', 'Converse', 'Unissex', 259.90, null, 'product-thumb-4.jpeg'],
  ['Tênis Daily Comfort', 'Calçados', 'Vans', 'Masculino', 329.90, 269.90, 'product-thumb-5.jpeg'],
  ['Camiseta Essential', 'Roupas', 'Nike', 'Feminino', 119.90, 89.90, 'produc-image-1.jpeg'],
  ['Camiseta Sport Line', 'Roupas', 'Adidas', 'Masculino', 139.90, null, 'produc-image-2.jpeg'],
  ['Jaqueta Urban', 'Roupas', 'Puma', 'Unissex', 289.90, 229.90, 'produc-image-3.jpeg'],
  ['Bolsa Everyday', 'Acessórios', 'Vans', 'Feminino', 189.90, 149.90, 'produc-image-4.jpeg'],
  ['Boné Street', 'Acessórios', 'Converse', 'Unissex', 99.90, 79.90, 'produc-image-5.jpeg']
];

export const products = data.map(([name, category, brand, gender, price, priceDiscount, image], index) => ({
  id: index + 1,
  name,
  category,
  brand,
  gender,
  price,
  priceDiscount,
  image: `${cdn}${image}`,
  images: [
    `${cdn}${image}`,
    `${cdn}produc-image-${(index % 5) + 1}.jpeg`,
    `${cdn}product-thumb-${(index % 5) + 1}.jpeg`
  ],
  reference: `DS-${String(index + 1).padStart(4, '0')}`,
  stars: Number((4.2 + (index % 6) * .1).toFixed(1)),
  rating: 42 + index * 11,
  description: `${name} pensado para acompanhar sua rotina com conforto e personalidade. Uma escolha versátil para combinar com o que você já tem no guarda-roupa.`,
  sizes: category === 'Calçados' ? ['37', '38', '39', '40', '41', '42'] : category === 'Roupas' ? ['P', 'M', 'G', 'GG'] : ['Único'],
  colors: ['#262626', '#dad2c8', '#9e6489'],
  featured: index < 8
}));
