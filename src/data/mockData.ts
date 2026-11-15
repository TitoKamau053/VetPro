export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  description: string;
  unitType: string;
  buyingPrice: number;
  sellingPrice: number;
  quantity: number;
  expiryDate: string;
  supplier: string;
  image: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface Sale {
  id: string;
  transactionNumber: string;
  date: string;
  products: { productId: string; name: string; quantity: number; price: number }[];
  totalAmount: number;
  staff: string;
}

export interface Message {
  id: string;
  farmerName: string;
  phoneNumber: string;
  message: string;
  date: string;
  status: 'Unread' | 'Read' | 'Replied' | 'Archived';
  replies?: { from: string; text: string; date: string }[];
}

export interface StockMovement {
  id: string;
  date: string;
  productId: string;
  productName: string;
  quantity: number;
  actionType: 'Stock In' | 'Stock Out' | 'Adjustment';
  user: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Antibiotics for Livestock',
    category: 'Medicines',
    sku: 'MED-001',
    description: 'Broad-spectrum antibiotics for cattle and goats. Effective against bacterial infections.',
    unitType: 'Bottle 500ml',
    buyingPrice: 2500,
    sellingPrice: 3500,
    quantity: 45,
    expiryDate: '2027-06-15',
    supplier: 'VetPharma Ltd',
    image: 'https://cdn.pixabay.com/photo/2014/03/05/16/11/veterinary-280175_640.jpg',
    status: 'In Stock'
  },
  {
    id: '2',
    name: 'Dewormer Tablets',
    category: 'Medicines',
    sku: 'MED-002',
    description: 'Oral dewormer for poultry and small animals. Safe and effective.',
    unitType: 'Pack of 100',
    buyingPrice: 800,
    sellingPrice: 1200,
    quantity: 12,
    expiryDate: '2026-12-01',
    supplier: 'AgriVet Supplies',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    status: 'Low Stock'
  },
  {
    id: '3',
    name: 'Mineral Supplements',
    category: 'Supplements',
    sku: 'SUP-001',
    description: 'Essential minerals for dairy cows to improve milk production.',
    unitType: 'Bag 5kg',
    buyingPrice: 1800,
    sellingPrice: 2500,
    quantity: 0,
    expiryDate: '2028-03-20',
    supplier: 'FarmNutri',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    status: 'Out of Stock'
  },
  {
    id: '4',
    name: 'Vaccine for Newcastle Disease',
    category: 'Vaccines',
    sku: 'VAC-001',
    description: 'Live vaccine for poultry against Newcastle disease.',
    unitType: 'Vial 100 doses',
    buyingPrice: 3200,
    sellingPrice: 4500,
    quantity: 28,
    expiryDate: '2026-09-10',
    supplier: 'BioVet',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
    status: 'In Stock'
  },
  {
    id: '5',
    name: 'Wound Spray',
    category: 'Topicals',
    sku: 'TOP-001',
    description: 'Antiseptic wound spray for animals. Promotes healing.',
    unitType: 'Bottle 250ml',
    buyingPrice: 900,
    sellingPrice: 1400,
    quantity: 8,
    expiryDate: '2027-01-30',
    supplier: 'VetCare',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
    status: 'Low Stock'
  }
];

export const mockSales: Sale[] = [
  {
    id: 's1',
    transactionNumber: 'TXN-20261115-001',
    date: '2026-11-15',
    products: [
      { productId: '1', name: 'Antibiotics for Livestock', quantity: 2, price: 3500 },
      { productId: '2', name: 'Dewormer Tablets', quantity: 5, price: 1200 }
    ],
    totalAmount: 13000,
    staff: 'Retail Staff'
  },
  {
    id: 's2',
    transactionNumber: 'TXN-20261114-002',
    date: '2026-11-14',
    products: [
      { productId: '4', name: 'Vaccine for Newcastle Disease', quantity: 1, price: 4500 }
    ],
    totalAmount: 4500,
    staff: 'Retail Staff'
  }
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    farmerName: 'John Mwangi',
    phoneNumber: '+254712345678',
    message: 'Hello, do you have antibiotics for my cows? They have foot rot.',
    date: '2026-11-15T10:30:00',
    status: 'Unread'
  },
  {
    id: 'm2',
    farmerName: 'Mary Akinyi',
    phoneNumber: '+254723456789',
    message: 'My chickens are showing signs of Newcastle. Is the vaccine available?',
    date: '2026-11-14T14:20:00',
    status: 'Read',
    replies: [
      { from: 'Admin', text: 'Yes, we have the vaccine in stock. Come by the shop.', date: '2026-11-14T15:00:00' }
    ]
  },
  {
    id: 'm3',
    farmerName: 'Peter Ochieng',
    phoneNumber: '+254734567890',
    message: 'Need dewormer for goats urgently.',
    date: '2026-11-13T09:15:00',
    status: 'Replied'
  }
];

export const mockStockMovements: StockMovement[] = [
  {
    id: 'sm1',
    date: '2026-11-15',
    productId: '1',
    productName: 'Antibiotics for Livestock',
    quantity: 20,
    actionType: 'Stock In',
    user: 'Retail Staff'
  },
  {
    id: 'sm2',
    date: '2026-11-14',
    productId: '2',
    productName: 'Dewormer Tablets',
    quantity: 5,
    actionType: 'Stock Out',
    user: 'Retail Staff'
  }
];

export const categories = ['Medicines', 'Vaccines', 'Supplements', 'Topicals', 'Equipment'];
