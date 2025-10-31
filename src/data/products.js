// Central catalog for Shop + Product pages.
// Slugs must be unique and match /product/:productId

export const products = [
    {
      id: '10-mini-pancakes',
      name: '10 ct Mini Pancakes',
      price: 8.0,
      image: 'https://cdn.loveandlemons.com/wp-content/uploads/2025/01/pancake-recipe.jpg',
      badges: [],
      options: [
        { label: 'No toppings', priceDelta: 0 },
        { label: 'Strawberries', priceDelta: 1 },
        { label: 'Nutella drizzle', priceDelta: 1 },
      ],
    },
    {
      id: 'lotus-energy-drinks',
      name: 'Lotus Energy Drinks',
      // Show a range on the shop card
      priceMin: 6.0,
      priceMax: 7.0,
      basePrice: 6.0,
      image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800',
      options: [
        { label: '16 oz', priceDelta: 0 },
        { label: '32 oz upgrade', priceDelta: 1 },
        { label: 'Strawberry popping boba', priceDelta: 1 },
        { label: 'Edible glitter', priceDelta: 1 },
        { label: 'Extra power shot (+80mg)', priceDelta: 1 },
      ],
    },
    {
      id: 'dubai-mini-pancakes',
      name: 'Dubai Mini Pancakes',
      price: 10.0,
      image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800',
      options: [{ label: 'Pistachio + strawberry', priceDelta: 0 }],
    },
    {
      id: 'shakeups',
      name: 'Regular or Single flavor Shakeups',
      priceMin: 7.0,
      priceMax: 9.0,
      basePrice: 7.0,
      image: 'https://www.midwestliving.com/thmb/pGD2O1YV4J8Y8e3gGhJbJJgYEC0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/36648_7-41f5397ea19d4c348b3a95d21cf5dc89.jpg',
      options: [
        { label: '16 oz', priceDelta: 0 },
        { label: '32 oz upgrade', priceDelta: 2 },
      ],
    },
    {
      id: 'dirty-soda',
      name: 'Dirty Soda',
      price: 4.0,
      image: 'https://iamafoodblog.b-cdn.net/wp-content/uploads/2022/05/dirty-soda-2823w.jpg',
      options: [
        { label: 'Vanilla', priceDelta: 0 },
        { label: 'Coconut', priceDelta: 0 },
      ],
    },
    {
      id: 'reg-cc-tub',
      name: 'Reg C.C. Tub',
      price: 6.0,
      image: 'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2022-05/cookies-and-cream-ice-cream_0422.jpg?itok=-gxLG1uG',
      options: [{ label: 'Standard', priceDelta: 0 }],
    },
    {
      id: '5-mini-pancakes',
      name: '5 ct Mini Pancakes',
      price: 5.0,
      image: 'https://mojo.generalmills.com/api/public/content/CXD30M2MjU-untv0g-CkiA_gmi_hi_res_jpeg.jpeg?v=130763d5&t=bc0cec1fd4bc4c35b967df95af8c1fcc',
      options: [{ label: 'Powdered sugar', priceDelta: 0 }],
    },
    {
      id: 'organic-cc-tub',
      name: 'Organic C.C. Tub',
      price: 6.0,
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg',
      options: [{ label: 'Standard', priceDelta: 0 }],
    },
  ];
  
  export function displayPrice(p) {
    if (p.priceMin != null && p.priceMax != null) return `$${p.priceMin.toFixed(2)} - $${p.priceMax.toFixed(2)}`;
    if (p.price != null) return `$${p.price.toFixed(2)}`;
    return '$—';
  }
  
  export function basePrice(p) {
    if (p.basePrice != null) return p.basePrice;
    if (p.price != null) return p.price;
    if (p.priceMin != null) return p.priceMin;
    return 0;
  }
  