// src/data/products.js

// Helper to show price text under each card
export function displayPrice(product) {
  if (product.variants && product.variants.length) {
    const prices = product.variants
      .map((v) => v.price)
      .filter((p) => typeof p === 'number');

    if (prices.length) {
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      if (min === max) return `$${min.toFixed(2)}`;
      return `$${min.toFixed(2)} - $${max.toFixed(2)}`;
    }
  }

  if (typeof product.price === 'number') {
    return `$${product.price.toFixed(2)}`;
  }

  if (
    typeof product.priceMin === 'number' &&
    typeof product.priceMax === 'number'
  ) {
    if (product.priceMin === product.priceMax) {
      return `$${product.priceMin.toFixed(2)}`;
    }
      return `$${product.priceMin.toFixed(
        2
      )} - $${product.priceMax.toFixed(2)}`;
  }

  if (typeof product.priceMin === 'number') {
    return `From $${product.priceMin.toFixed(2)}`;
  }

  return 'Contact for pricing';
}

/**
 * IMAGE CONSTANTS
 * Feel free to replace any of these URLs with ones you prefer.
 * Just keep the constant names the same.
 */

const IMG_10_MINI_PANCAKES =
  'https://www.acouplecooks.com/wp-content/uploads/2023/07/Mini-Pancakes-003.jpg';

const IMG_LOTUS_ENERGY_DRINKS =
  'https://www.webstaurantstore.com/images/products/large/731518/2849592.jpg';

const IMG_DUBAI_MINI_PANCAKES =
  'https://recipesblob.oetker.co.uk/assets/92a20e656d104712b3442951dda56e04/1272x764/dubai-chocolate-pancakes.jpg';

const IMG_SHAKEUPS =
  'https://thebigmansworld.com/wp-content/uploads/2024/09/protein-shakes.jpg';

const IMG_DIRTY_SODA =
  'https://iamafoodblog.b-cdn.net/wp-content/uploads/2022/05/dirty-soda-2823w.jpg';

const IMG_REG_CC_TUB =
  'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2022-05/cookies-and-cream-ice-cream_0422.jpg?itok=-gxLG1uG';

const IMG_CHURRO_BITES =
  'https://cdnimg.webstaurantstore.com/images/products/large/764281/2627551.jpg';

const IMG_CHOCOLATE_COVERED_STRAWBERRIES =
  'https://www.allrecipes.com/thmb/v9ncEt1CoTDG6lJwt1_CBl8syr8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21712-chocolate-covered-strawberries-ddmfs-3X4-1770-d4b548d24adf4a348f47310dfda96e63.jpg';

const IMG_GOURMET_PRETZEL_RODS =
  'https://houseofnasheats.com/wp-content/uploads/2017/12/Chocolate-Covered-Pretzel-Rods-Square-1.jpg';

const IMG_CANDY_KABOBS =
  'https://www.sugarhighllc.com/uploads/1/2/7/0/12705531/s582655245895946062_p274_i11_w430.jpeg';

const IMG_LOADED_NACHOS_BAR =
  'https://www.seriouseats.com/thmb/ps9BzTDAJ6tXywJw_eSZxvV_xhE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20250430-SEA-UltimateSmokedNachos-LorenaMasso-Beauty1-35-a0d81f942b394edf9137f9b2f09269a4.jpg';

const IMG_MINI_CHEESECAKE_CUPS =
  'https://www.californiastrawberries.com/wp-content/uploads/2022/05/Mini-Strawberry-Cheesecakes.jpg';

const IMG_COOKIE_DOUGH_SHOTS =
  'https://images.ricardocuisine.com/services/recipes/7849.jpg';

const IMG_ICE_CREAM_SANDWICH_BAR =
  'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2022-06/Chocolate-Chip-Ice-Cream-bars_0241.jpg?itok=WnARwqVX';

const IMG_GOURMET_POPCORN_TRIO =
  'https://www.foodandwine.com/thmb/-DMuQSJPIuV2xjL0yr0CvuRslbg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/popcorn-taste-test-FT-BLOG1219-2-5ceb8a9b4b5c4c52ac438f375cc9562f.jpg';

const IMG_MACARON_SAMPLER =
  'https://images.uncommongoods.com/images/items/59900/59952_5_640px.jpg';

const IMG_ICED_COFFEE_FLIGHT =
  'https://6348e864a0d43f4e2f3c.cdn6.editmysite.com/uploads/b/6348e864a0d43f4e2f3cce078ba7e2450658898261ec8661e4756c2244e56e46/flights_01_1637763204.jpg?width=2400&optimize=medium';

const IMG_BROWNIE_BITES_TRAY =
  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/11/11/REE_DRUMMOND_DARK_CHOCOLATE_BROWNIE_BITES_H.jpg.rend.hgtvcom.1280.1280.suffix/1636679032846.webp';

const IMG_FRUIT_PARFAIT_CUPS =
  'https://tatyanaseverydayfood.com/wp-content/uploads/2021/06/Easy-Fruit-Granola-Parfaits.jpg';

const IMG_SMORES_DIP_KIT =
  'https://bakingamoment.com/wp-content/uploads/2020/07/IMG_8998-smores-dip.jpg';

const IMG_MINI_SLIDER_PLATTER =
  'https://www.tasteofhome.com/wp-content/uploads/2018/01/Bacon-Cheeseburger-Slider-Bake_EXPS_GBBZ19_197428_E11_29_2b.jpg?fit=1024,1024';

/**
 * PRODUCT DATA
 */

export const products = [
  // --------- Core items ----------
  {
    id: '10-mini-pancakes',
    name: '10 ct Mini Pancakes',
    image: IMG_10_MINI_PANCAKES,
    description:
      'Fresh, fluffy bite-sized pancakes served with butter and syrup.',
    category: 'Prepackaged Treats',
    variantLabel: 'Count',
    variants: [
      { id: 'pancakes-10', name: '10 count', price: 8 },
      { id: 'pancakes-20', name: '20 count', price: 15 },
      { id: 'pancakes-40', name: '40 count party tray', price: 28 },
    ],
  },
  {
    id: 'lotus-energy-drinks',
    name: 'Lotus Energy Drinks',
    image: IMG_LOTUS_ENERGY_DRINKS,
    description:
      'Bright, refreshing Lotus energy drinks with fruity flavors.',
    category: 'Drinks',
    variantLabel: 'Size & Flavor',
    variants: [
      { id: 'lotus-16-blue', name: '16 oz • Blue Lotus', price: 6 },
      { id: 'lotus-16-pink', name: '16 oz • Pink Lotus', price: 6 },
      { id: 'lotus-24-blue', name: '24 oz • Blue Lotus', price: 7 },
      { id: 'lotus-24-pink', name: '24 oz • Pink Lotus', price: 7 },
    ],
  },
  {
    id: 'dubai-mini-pancakes',
    name: 'Dubai Mini Pancakes',
    image: IMG_DUBAI_MINI_PANCAKES,
    description:
      'Mini pancakes topped with Lotus Biscoff, Nutella, and crushed nuts.',
    category: 'Prepackaged Treats',
    variantLabel: 'Topping',
    variants: [
      { id: 'dubai-lotus', name: 'Lotus Biscoff & caramel drizzle', price: 10 },
      { id: 'dubai-nutella', name: 'Nutella & hazelnut crumble', price: 10 },
      {
        id: 'dubai-mixed',
        name: 'Half Lotus, half Nutella assortment',
        price: 11,
      },
    ],
  },
  {
    id: 'shakeups',
    name: 'Regular or Single Flavor Shakeups',
    image: IMG_SHAKEUPS,
    description:
      'Hand-shaken lemonades with fresh citrus and fun flavor add-ins.',
    category: 'Drinks',
    variantLabel: 'Size & Flavor',
    variants: [
      { id: 'shk-16-reg', name: '16 oz • Classic lemonade', price: 7 },
      { id: 'shk-16-straw', name: '16 oz • Strawberry lemonade', price: 8 },
      { id: 'shk-24-reg', name: '24 oz • Classic lemonade', price: 8 },
      { id: 'shk-24-mango', name: '24 oz • Mango lemonade', price: 9 },
    ],
  },
  {
    id: 'dirty-soda',
    name: 'Dirty Soda',
    image: IMG_DIRTY_SODA,
    description:
      'Soda mixed with cream and flavored syrups for a sweet, fizzy treat.',
    category: 'Drinks',
    variantLabel: 'Flavor',
    variants: [
      { id: 'dirty-coconut-lime', name: 'Coconut & fresh lime', price: 4 },
      { id: 'dirty-vanilla-cream', name: 'Vanilla cream', price: 4 },
      { id: 'dirty-cherry', name: 'Cherry & cream', price: 4.5 },
    ],
  },
  {
    id: 'reg-cc-tub',
    name: 'Cookies & Cream Ice Cream',
    image: IMG_REG_CC_TUB,
    description:
      'Creamy cookies & cream dessert served in a ready-to-enjoy tub.',
    category: 'Frozen Treats',
    variantLabel: 'Size',
    variants: [
      { id: 'cc-8oz', name: '8 oz individual tub', price: 6 },
      { id: 'cc-16oz', name: '16 oz shareable tub', price: 10 },
    ],
  },

  // ---------- Extra sweets / treats ----------
  {
    id: 'churro-bites',
    name: 'Cinnamon Sugar Churro Bites',
    image: IMG_CHURRO_BITES,
    description:
      'Warm, crispy churro bites rolled in cinnamon sugar with dipping sauces.',
    category: 'Prepackaged Treats',
    variantLabel: 'Tray size',
    variants: [
      { id: 'churro-small', name: 'Small tray • serves 6–8', price: 7 },
      { id: 'churro-medium', name: 'Medium tray • serves 10–12', price: 9 },
      { id: 'churro-large', name: 'Large tray • serves 16+', price: 11 },
    ],
  },
  {
    id: 'chocolate-covered-strawberries',
    name: 'Chocolate-Covered Strawberries',
    image: IMG_CHOCOLATE_COVERED_STRAWBERRIES,
    description:
      'Fresh strawberries dipped in milk or white chocolate with drizzle.',
    category: 'Prepackaged Treats',
    variantLabel: 'Chocolate & Count',
    variants: [
      { id: 'straw-milk-6', name: '6 count • milk chocolate', price: 9 },
      { id: 'straw-milk-12', name: '12 count • milk chocolate', price: 15 },
      {
        id: 'straw-mixed-12',
        name: '12 count • milk & white mix',
        price: 16,
      },
    ],
  },
  {
    id: 'gourmet-pretzel-rods',
    name: 'Gourmet Pretzel Rods',
    image: IMG_GOURMET_PRETZEL_RODS,
    description:
      'Crunchy pretzel rods dipped in chocolate and rolled in candy pieces.',
    category: 'Prepackaged Treats',
    variantLabel: 'Pack & Flavor',
    variants: [
      {
        id: 'pretzel-6-choc',
        name: '6 pack • milk chocolate & sprinkles',
        price: 8,
      },
      {
        id: 'pretzel-6-caramel',
        name: '6 pack • caramel drizzle',
        price: 9,
      },
      {
        id: 'pretzel-12-mixed',
        name: '12 pack • assorted flavors',
        price: 12,
      },
    ],
  },
  {
    id: 'candy-kabobs',
    name: 'Candy Kabobs',
    image: IMG_CANDY_KABOBS,
    description:
      'Colorful gummy candy skewers that make perfect party favors.',
    category: 'Prepackaged Treats',
    variantLabel: 'Theme',
    variants: [
      { id: 'kabob-rainbow', name: 'Rainbow mix • per kabob', price: 2.5 },
      { id: 'kabob-pastel', name: 'Pastel party mix • per kabob', price: 3 },
      { id: 'kabob-custom', name: 'Custom color theme • per kabob', price: 3.5 },
    ],
  },
  {
    id: 'loaded-nachos-bar',
    name: 'Loaded Nachos Bar',
    image: IMG_LOADED_NACHOS_BAR,
    description:
      'Build-your-own nachos with queso, seasoned meat, salsa, and toppings.',
    category: 'Savory',
    variantLabel: 'Package',
    variants: [
      { id: 'nacho-small', name: 'Small • serves 8–10', price: 25 },
      { id: 'nacho-medium', name: 'Medium • serves 12–15', price: 32 },
      { id: 'nacho-large', name: 'Large • serves 18–22', price: 40 },
    ],
  },
  {
    id: 'mini-cheesecake-cups',
    name: 'Mini Cheesecake Cups',
    image: IMG_MINI_CHEESECAKE_CUPS,
    description:
      'Individual cheesecake cups with fruit, chocolate, or caramel toppings.',
    category: 'Prepackaged Treats',
    variantLabel: 'Flavor & Pack',
    variants: [
      {
        id: 'cheese-fruit-6',
        name: '6 pack • mixed fruit toppings',
        price: 12,
      },
      {
        id: 'cheese-choc-6',
        name: '6 pack • chocolate & caramel',
        price: 13,
      },
      {
        id: 'cheese-assorted-12',
        name: '12 pack • assorted flavors',
        price: 20,
      },
    ],
  },
  {
    id: 'cookie-dough-shots',
    name: 'Edible Cookie Dough Shots',
    image: IMG_COOKIE_DOUGH_SHOTS,
    description:
      'Safe-to-eat cookie dough served in mini cups with tasting spoons.',
    category: 'Prepackaged Treats',
    variantLabel: 'Flavor & Pack',
    variants: [
      { id: 'dough-choc-6', name: '6 shots • chocolate chip', price: 8 },
      { id: 'dough-bday-6', name: '6 shots • birthday cake', price: 9 },
      {
        id: 'dough-mixed-12',
        name: '12 shots • assorted flavors',
        price: 14,
      },
    ],
  },
  {
    id: 'ice-cream-sandwich-bar',
    name: 'Ice Cream Sandwich Bar',
    image: IMG_ICE_CREAM_SANDWICH_BAR,
    description:
      'Guests mix and match cookies, ice cream, and toppings for sandwiches.',
    category: 'Frozen Treats',
    variantLabel: 'Package',
    variants: [
      { id: 'ics-small', name: 'Small party • up to 15 sandwiches', price: 30 },
      { id: 'ics-medium', name: 'Medium party • up to 25 sandwiches', price: 38 },
      { id: 'ics-large', name: 'Large party • up to 40 sandwiches', price: 45 },
    ],
  },
  {
    id: 'gourmet-popcorn-trio',
    name: 'Gourmet Popcorn Trio',
    image: IMG_GOURMET_POPCORN_TRIO,
    description:
      'Three flavors of gourmet popcorn: sweet, salty, and savory.',
    category: 'Prepackaged Treats',
    variantLabel: 'Tin size',
    variants: [
      { id: 'pop-small', name: 'Small tin', price: 10 },
      { id: 'pop-medium', name: 'Medium tin', price: 13 },
      { id: 'pop-large', name: 'Large tin', price: 16 },
    ],
  },
  {
    id: 'macaron-sampler',
    name: 'Macaron Sampler Box',
    image: IMG_MACARON_SAMPLER,
    description: 'Assorted French macarons in seasonal flavors and colors.',
    category: 'Prepackaged Treats',
    variantLabel: 'Pack size',
    variants: [
      { id: 'mac-8', name: '8 count box', price: 14 },
      { id: 'mac-16', name: '16 count box', price: 24 },
    ],
  },

  // ---------- Drinks / extras ----------
  {
    id: 'iced-coffee-flight',
    name: 'Iced Coffee Flight',
    image: IMG_ICED_COFFEE_FLIGHT,
    description:
      'Three mini iced coffees so guests can sample different flavors.',
    category: 'Drinks',
    variantLabel: 'Flight style',
    variants: [
      {
        id: 'coffee-classic',
        name: 'Classic (vanilla, caramel, mocha)',
        price: 9,
      },
      {
        id: 'coffee-seasonal',
        name: 'Seasonal (pumpkin, peppermint, hazelnut)',
        price: 10,
      },
    ],
  },
  {
    id: 'brownie-bites-tray',
    name: 'Fudge Brownie Bites Tray',
    image: IMG_BROWNIE_BITES_TRAY,
    description:
      'Rich fudge brownie squares topped with powdered sugar or ganache.',
    category: 'Prepackaged Treats',
    variantLabel: 'Tray size',
    variants: [
      { id: 'brownie-small', name: 'Small tray • 16 bites', price: 12 },
      { id: 'brownie-medium', name: 'Medium tray • 30 bites', price: 18 },
      { id: 'brownie-large', name: 'Large tray • 48 bites', price: 25 },
    ],
  },
  {
    id: 'fruit-parfait-cups',
    name: 'Fresh Fruit Parfait Cups',
    image: IMG_FRUIT_PARFAIT_CUPS,
    description:
      'Layers of vanilla yogurt, granola, and fresh seasonal fruit.',
    category: 'Prepackaged Treats',
    variantLabel: 'Size',
    variants: [
      { id: 'parfait-8oz', name: '8 oz cup', price: 5.5 },
      { id: 'parfait-12oz', name: '12 oz cup', price: 7 },
    ],
  },
  {
    id: 'smores-dip-kit',
    name: "S'mores Dip Party Kit",
    image: IMG_SMORES_DIP_KIT,
    description:
      'Oven-friendly s’mores dip with graham cracker dippers for parties.',
    category: 'Prepackaged Treats',
    variantLabel: 'Pan size',
    variants: [
      { id: 'smores-8x8', name: '8×8 pan • serves 6–8', price: 14 },
      { id: 'smores-9x13', name: '9×13 pan • serves 12–16', price: 22 },
    ],
  },

  // ---------- #21 item ----------
  {
    id: 'mini-slider-platter',
    name: 'Mini Slider Sandwich Platter',
    image: IMG_MINI_SLIDER_PLATTER,
    description:
      'Assorted mini sliders with classic, BBQ, and chicken options.',
    category: 'Savory',
    variantLabel: 'Slider mix',
    variants: [
      {
        id: 'sliders-classic',
        name: 'Classic beef & cheese • dozen',
        price: 22,
      },
      {
        id: 'sliders-mixed',
        name: 'Mixed beef, BBQ, and chicken • dozen',
        price: 24,
      },
    ],
  },
];
