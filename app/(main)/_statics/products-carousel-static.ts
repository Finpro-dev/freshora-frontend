import {
  DietType,
  Product,
  ProductGrade,
  Unit,
} from "@/shared/types/product-type";

export const productsCarouselStatic: Product[] = [
  {
    serialNumber: "FS-FRT-002",
    name: "Lime",
    slug: "lime",
    productCategoryId: "category-fruit",
    price: 15000,
    description: "Fresh limes with a refreshing citrus aroma and tangy flavor.",
    weightPerGram: 250,
    unit: Unit.PACK,
    productPhotos: [
      {
        photoUrl:
          "https://i.pinimg.com/736x/47/eb/90/47eb909cf0996a4293a663232ce46b6b.jpg",
      },
    ],
    storageInstructions: "Keep refrigerated for longer freshness.",
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
    serialNumber: "FS-FRT-003",
    name: "Papaya",
    slug: "papaya",
    productCategoryId: "category-fruit",
    price: 28000,
    description: "Sweet ripe papaya, rich in fiber and essential nutrients.",
    weightPerGram: 1500,
    unit: Unit.KG,
    productPhotos: [
      {
        photoUrl:
          "https://i.pinimg.com/736x/bd/85/5c/bd855cd97cc0e8e5896cce06bf8a4343.jpg",
      },
    ],
    storageInstructions: "Store at room temperature until fully ripe.",
    grade: ProductGrade.A,
    dietType: DietType.VEGAN,
    discount: {
      discountAmount: null,
    },
    stocks: {
      quantity: 0,
    },
  },
  {
    serialNumber: "FS-EGG-001",
    name: "Chicken Eggs",
    slug: "chicken-eggs",
    productCategoryId: "category-egg",
    price: 32000,
    description: "Fresh selected chicken eggs, an excellent source of protein.",
    weightPerGram: 1000,
    unit: Unit.PACK,
    productPhotos: [
      {
        photoUrl:
          "https://i.pinimg.com/736x/9f/4a/9f/9f4a9f43f90b11d8746a6a5ffd98c4c1.jpg",
      },
    ],
    storageInstructions: "Keep refrigerated.",
    grade: ProductGrade.A,
    dietType: DietType.HALAL,
    discount: {
      discountAmount: 12.5,
    },
    stocks: {
      quantity: 10,
    },
  },
  {
    serialNumber: "FS-VEG-004",
    name: "Spinach",
    slug: "spinach",
    productCategoryId: "category-vegetable",
    price: 12000,
    description: "Fresh spinach rich in iron, vitamins, and antioxidants.",
    weightPerGram: 250,
    unit: Unit.PACK,
    productPhotos: [
      {
        photoUrl:
          "https://i.pinimg.com/736x/db/15/53/db155376ffaab24aa480e4522b5774f7.jpg",
      },
    ],
    storageInstructions: "Keep refrigerated and consume as soon as possible.",
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
    serialNumber: "FS-FSH-001",
    name: "Salmon",
    slug: "salmon",
    productCategoryId: "category-fish",
    price: 125000,
    description:
      "Fresh premium salmon, rich in protein and omega-3 fatty acids.",
    weightPerGram: 500,
    unit: Unit.PACK,
    productPhotos: [
      {
        photoUrl:
          "https://i.pinimg.com/736x/99/66/fd/9966fd3a7e1e949c3804438b6b4aaa83.jpg",
      },
    ],
    storageInstructions: "Store in the freezer or refrigerator as needed.",
    grade: ProductGrade.A,
    dietType: DietType.HALAL,
    discount: {
      discountAmount: 12.5,
    },
    stocks: {
      quantity: 10,
    },
  },
  {
    serialNumber: "FS-VEG-001",
    name: "Garlic",
    slug: "garlic",
    productCategoryId: "category-vegetable",
    price: 18000,
    description:
      "Fresh selected garlic suitable for a variety of cooking needs.",
    weightPerGram: 250,
    unit: Unit.PACK,
    productPhotos: [
      {
        photoUrl:
          "https://i.pinimg.com/736x/9d/2d/92/9d2d927328ca0707e354b98bdb300434.jpg",
      },
    ],
    storageInstructions: "Store in a cool and dry place.",
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
    serialNumber: "FS-SPC-001",
    name: "Dried Chili",
    slug: "dried-chili",
    productCategoryId: "category-spice",
    price: 22000,
    description:
      "High-quality dried chili peppers to enhance the flavor of your dishes.",
    weightPerGram: 100,
    unit: Unit.PACK,
    productPhotos: [
      {
        photoUrl:
          "https://i.pinimg.com/736x/21/35/90/2135901f4a05e7558700cbd7d53620c6.jpg",
      },
    ],
    storageInstructions: "Store in an airtight container.",
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
    serialNumber: "FS-VEG-002",
    name: "Large Red Chili",
    slug: "large-red-chili",
    productCategoryId: "category-vegetable",
    price: 25000,
    description:
      "Fresh large red chili peppers with a distinctive spicy flavor.",
    weightPerGram: 250,
    unit: Unit.PACK,
    productPhotos: [
      {
        photoUrl:
          "https://i.pinimg.com/736x/cc/90/33/cc903353027d2684a5febaab2ddc0d69.jpg",
      },
    ],
    storageInstructions: "Store in the refrigerator.",
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
    serialNumber: "FS-FRT-001",
    name: "Orange",
    slug: "orange",
    productCategoryId: "category-fruit",
    price: 30000,
    description:
      "Fresh oranges rich in vitamin C with a naturally sweet taste.",
    weightPerGram: 1000,
    unit: Unit.KG,
    productPhotos: [
      {
        photoUrl:
          "https://i.pinimg.com/736x/1f/14/30/1f1430faf44415229395ddc7a939f3b7.jpg",
      },
    ],
    storageInstructions: "Store in a cool place or refrigerate.",
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
    serialNumber: "FS-VEG-003",
    name: "Tomato",
    slug: "tomato",
    productCategoryId: "category-vegetable",
    price: 18000,
    description: "Fresh high-quality tomatoes, perfect for salads and cooking.",
    weightPerGram: 500,
    unit: Unit.PACK,
    productPhotos: [
      {
        photoUrl:
          "https://i.pinimg.com/736x/de/4b/95/de4b959b7a005c7d50a603be3303d06c.jpg",
      },
    ],
    storageInstructions: "Store in a cool and dry place.",
    grade: ProductGrade.A,
    dietType: DietType.VEGAN,
    discount: {
      discountAmount: 10,
    },
    stocks: {
      quantity: 10,
    },
  },
];
