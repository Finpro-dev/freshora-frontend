import {
  DietType,
  Product,
  ProductGrade,
  Unit,
} from "@/shared/types/product-type";

export const productGridStatic: Product[] = [
  {
    serialNumber: "FS-FRT-004",
    name: "Blueberry",
    slug: "blueberry",
    productCategoryId: "category-fruit",
    price: 35000,
    description:
      "Fresh blueberry with a fresh after taste, rich in healthy vitamins and nutrients.",
    weightPerGram: 500,
    unit: Unit.PACK,
    productPhotos: [
      {
        photoUrl:
          "https://i.pinimg.com/736x/f6/b9/89/f6b9890ed8f7d9e9b11d8875151c9b9c.jpg",
      },
    ],
    storageInstructions:
      "Store at room temperature until ripe, then refrigerate.",
    grade: ProductGrade.A,
    dietType: DietType.VEGAN,
    discount: {
      discountAmount: null,
    },
    stocks: {
      quantity: 15,
    },
  },
  {
    serialNumber: "FS-FRT-005",
    name: "Strawberry",
    slug: "strawberry",
    productCategoryId: "category-fruit",
    price: 45000,
    description:
      "Sweet and juicy strawberries packed with vitamin C and antioxidants.",
    weightPerGram: 250,
    unit: Unit.PACK,
    productPhotos: [
      {
        photoUrl:
          "https://i.pinimg.com/736x/1d/00/66/1d006662ba61d4eda66429dcc79624a9.jpg",
      },
    ],
    storageInstructions: "Keep refrigerated and consume within a few days.",
    grade: ProductGrade.A,
    dietType: DietType.VEGAN,
    discount: {
      discountAmount: 50,
    },
    stocks: {
      quantity: 20,
    },
  },
  {
    serialNumber: "FS-HRB-001",
    name: "Dill",
    slug: "dill",
    productCategoryId: "category-herb",
    price: 18000,
    description:
      "Fresh dill herb with a delicate flavor, perfect for seafood and salads.",
    weightPerGram: 50,
    unit: Unit.PACK,
    productPhotos: [
      {
        photoUrl:
          "https://i.pinimg.com/736x/e1/f4/b4/e1f4b428ba5c9065649f469f83b219e8.jpg",
      },
    ],
    storageInstructions:
      "Keep refrigerated in a sealed container for freshness.",
    grade: ProductGrade.A,
    dietType: DietType.VEGAN,
    discount: {
      discountAmount: null,
    },
    stocks: {
      quantity: 12,
    },
  },
  {
    serialNumber: "FS-VEG-005",
    name: "Mustard Greens",
    slug: "mustard-greens",
    productCategoryId: "category-vegetable",
    price: 12000,
    description:
      "Fresh mustard greens with a crisp texture and mild peppery flavor.",
    weightPerGram: 300,
    unit: Unit.PACK,
    productPhotos: [
      {
        photoUrl:
          "https://i.pinimg.com/1200x/79/cf/8f/79cf8f92d185ab12dac3261b10d3f770.jpg",
      },
    ],
    storageInstructions: "Store in the refrigerator and use promptly.",
    grade: ProductGrade.A,
    dietType: DietType.VEGAN,
    discount: {
      discountAmount: null,
    },
    stocks: {
      quantity: 18,
    },
  },
  {
    serialNumber: "FS-VEG-006",
    name: "Purple Cabbage",
    slug: "purple-cabbage",
    productCategoryId: "category-vegetable",
    price: 25000,
    description:
      "Crunchy purple cabbage rich in antioxidants and dietary fiber.",
    weightPerGram: 1000,
    unit: Unit.KG,
    productPhotos: [
      {
        photoUrl:
          "https://i.pinimg.com/736x/a7/8c/f2/a78cf21bb164cefd42bab5f3f8a44734.jpg",
      },
    ],
    storageInstructions: "Store in the refrigerator to maintain freshness.",
    grade: ProductGrade.A,
    dietType: DietType.VEGAN,
    discount: {
      discountAmount: 30,
    },
    stocks: {
      quantity: 8,
    },
  },
  {
    serialNumber: "FS-FRT-006",
    name: "Manalagi Grapes",
    slug: "manalagi-grapes",
    productCategoryId: "category-fruit",
    price: 55000,
    description:
      "Sweet and refreshing Manalagi grapes, perfect for healthy snacking.",
    weightPerGram: 500,
    unit: Unit.PACK,
    productPhotos: [
      {
        photoUrl:
          "https://i.pinimg.com/736x/9e/24/b9/9e24b90e7da4d81737d1f4caf80457fc.jpg",
      },
    ],
    storageInstructions: "Keep refrigerated before serving.",
    grade: ProductGrade.A,
    dietType: DietType.VEGAN,
    discount: {
      discountAmount: null,
    },
    stocks: {
      quantity: 10,
    },
  },
  {
    serialNumber: "FS-BAK-001",
    name: "Baguette",
    slug: "baguette",
    productCategoryId: "category-bakery",
    price: 28000,
    description:
      "Traditional French baguette with a crispy crust and soft interior.",
    weightPerGram: 300,
    unit: Unit.PCS,
    productPhotos: [
      {
        photoUrl:
          "https://i.pinimg.com/736x/13/e3/b1/13e3b103e835b2e9ca67330f9ce4af6a.jpg",
      },
    ],
    storageInstructions: "Store at room temperature and consume within 2 days.",
    grade: ProductGrade.A,
    dietType: DietType.VEGETARIAN,
    discount: {
      discountAmount: null,
    },
    stocks: {
      quantity: 25,
    },
  },
  {
    serialNumber: "FS-SFD-001",
    name: "Squid",
    slug: "squid",
    productCategoryId: "category-seafood",
    price: 65000,
    description:
      "Fresh squid with a tender texture, ideal for grilling, frying, or stir-frying.",
    weightPerGram: 500,
    unit: Unit.PACK,
    productPhotos: [
      {
        photoUrl:
          "https://i.pinimg.com/736x/f3/b2/d8/f3b2d86d71ed6ab3b729aef16fe80b37.jpg",
      },
    ],
    storageInstructions:
      "Keep frozen or refrigerated and consume promptly after thawing.",
    grade: ProductGrade.A,
    dietType: DietType.HALAL,
    discount: {
      discountAmount: 10,
    },
    stocks: {
      quantity: 7,
    },
  },
];
