export interface Product {
  id: string;
  name: string;
  category: string;
  type: string;
  image: string;
}

export const products: Product[] = [
  { id: "p1", name: "Dettol Antiseptic Soap", category: "Soaps", type: "soap", image: "https://api.dicebear.com/9.x/shapes/svg?seed=soap1" },
  { id: "p2", name: "Dove Moisturizing Bar", category: "Soaps", type: "soap", image: "https://api.dicebear.com/9.x/shapes/svg?seed=soap2" },
  { id: "p3", name: "Cetaphil Gentle Cleanser", category: "Face Wash", type: "facewash", image: "https://api.dicebear.com/9.x/shapes/svg?seed=fw1" },
  { id: "p4", name: "Himalaya Neem Face Wash", category: "Face Wash", type: "facewash", image: "https://api.dicebear.com/9.x/shapes/svg?seed=fw2" },
  { id: "p5", name: "CeraVe Moisturizing Cream", category: "Moisturizers", type: "moisturizer", image: "https://api.dicebear.com/9.x/shapes/svg?seed=moist1" },
  { id: "p6", name: "Nivea Soft Cream", category: "Moisturizers", type: "moisturizer", image: "https://api.dicebear.com/9.x/shapes/svg?seed=moist2" },
  { id: "p7", name: "Durex Condoms (Pack of 10)", category: "Condoms", type: "condom", image: "https://api.dicebear.com/9.x/shapes/svg?seed=con1" },
  { id: "p8", name: "Manforce Condoms", category: "Condoms", type: "condom", image: "https://api.dicebear.com/9.x/shapes/svg?seed=con2" },
  { id: "p9", name: "Dabur Chyawanprash", category: "Immunity Boosters", type: "immunity", image: "https://api.dicebear.com/9.x/shapes/svg?seed=imm1" },
  { id: "p10", name: "Zandu Kesari Jivan", category: "Immunity Boosters", type: "immunity", image: "https://api.dicebear.com/9.x/shapes/svg?seed=imm2" },
  { id: "p11", name: "Savlon Hand Sanitizer", category: "Personal Hygiene", type: "hygiene", image: "https://api.dicebear.com/9.x/shapes/svg?seed=hyg1" },
  { id: "p12", name: "Whisper Sanitary Pads", category: "Personal Hygiene", type: "hygiene", image: "https://api.dicebear.com/9.x/shapes/svg?seed=hyg2" },
  { id: "p13", name: "Vaseline Intensive Care Lotion", category: "Moisturizers", type: "moisturizer", image: "https://api.dicebear.com/9.x/shapes/svg?seed=moist3" },
  { id: "p14", name: "Lifebuoy Total 10 Soap", category: "Soaps", type: "soap", image: "https://api.dicebear.com/9.x/shapes/svg?seed=soap3" },
  { id: "p15", name: "Amway Nutrilite Immunity", category: "Immunity Boosters", type: "immunity", image: "https://api.dicebear.com/9.x/shapes/svg?seed=imm3" },
];
