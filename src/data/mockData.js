/** Shared Indian household amounts (4 roommates) */
export const RENT_PER_PERSON = 8000
export const RENT_TOTAL = 32000
export const ELECTRICITY_BILL = 1800
export const WIFI_BILL = 999
export const WATER_BILL = 600

export const currentUser = {
  id: 'u1',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@gmail.com',
  avatar: 'RS',
  houseId: 'h1',
}

export const house = {
  id: 'h1',
  name: 'Sunshine Flat',
  code: 'SFL-4829',
  address: '12 MG Road, Indore, MP',
  members: [
    { id: 'u1', name: 'Rahul Sharma', avatar: 'RS', role: 'admin', balance: -850 },
    { id: 'u2', name: 'Arjun Verma', avatar: 'AV', role: 'member', balance: 320 },
    { id: 'u3', name: 'Priya Singh', avatar: 'PS', role: 'member', balance: 180 },
    { id: 'u4', name: 'Karan Mehta', avatar: 'KM', role: 'member', balance: 0 },
  ],
}

export const dashboardStats = {
  totalOwed: 850,
  yourBalance: -850,
  pendingChores: 3,
  groceriesNeeded: 5,
  rentDueIn: 12,
  monthlySpend: 35399,
  monthlyBudget: 40000,
}

export const recentActivity = [
  { id: 1, type: 'expense', title: 'Electric bill split', user: 'Arjun Verma', amount: 450, time: '2h ago' },
  { id: 2, type: 'chore', title: 'Kitchen cleaned', user: 'Priya Singh', amount: null, time: '5h ago' },
  { id: 3, type: 'grocery', title: 'Milk & eggs added', user: 'Karan Mehta', amount: 320, time: 'Yesterday' },
  { id: 4, type: 'rent', title: 'May rent recorded', user: 'Rahul Sharma', amount: RENT_TOTAL, time: '2 days ago' },
  { id: 5, type: 'expense', title: 'Internet subscription', user: 'Rahul Sharma', amount: WIFI_BILL, time: '3 days ago' },
]

export const expenses = [
  { id: 'e1', title: 'Electric Bill', category: 'Utilities', amount: ELECTRICITY_BILL, paidBy: 'Arjun Verma', date: '2026-05-20', split: 'equal', status: 'settled' },
  { id: 'e2', title: 'Internet', category: 'Utilities', amount: WIFI_BILL, paidBy: 'Rahul Sharma', date: '2026-05-18', split: 'equal', status: 'pending' },
  { id: 'e3', title: 'Cleaning supplies', category: 'Household', amount: 280, paidBy: 'Priya Singh', date: '2026-05-15', split: 'equal', status: 'pending' },
  { id: 'e4', title: 'Pizza night', category: 'Food', amount: 650, paidBy: 'Karan Mehta', date: '2026-05-12', split: 'equal', status: 'settled' },
  { id: 'e5', title: 'Water bill', category: 'Utilities', amount: WATER_BILL, paidBy: 'Rahul Sharma', date: '2026-05-10', split: 'equal', status: 'settled' },
  { id: 'e6', title: 'Furniture repair', category: 'Maintenance', amount: 1200, paidBy: 'Arjun Verma', date: '2026-05-08', split: 'custom', status: 'pending' },
]

export const groceries = [
  { id: 'g1', item: 'Whole milk', quantity: '1 L', addedBy: 'Karan Mehta', priority: 'high', checked: false },
  { id: 'g2', item: 'Free-range eggs', quantity: '12 pcs', addedBy: 'Rahul Sharma', priority: 'high', checked: false },
  { id: 'g3', item: 'Brown bread', quantity: '1 loaf', addedBy: 'Priya Singh', priority: 'medium', checked: false },
  { id: 'g4', item: 'Greek yogurt', quantity: '400 g', addedBy: 'Arjun Verma', priority: 'low', checked: true },
  { id: 'g5', item: 'Bananas', quantity: '6', addedBy: 'Karan Mehta', priority: 'medium', checked: false },
  { id: 'g6', item: 'Olive oil', quantity: '500 ml', addedBy: 'Rahul Sharma', priority: 'low', checked: false },
  { id: 'g7', item: 'Paper towels', quantity: '2 rolls', addedBy: 'Priya Singh', priority: 'high', checked: false },
  { id: 'g8', item: 'Coffee beans', quantity: '250 g', addedBy: 'Arjun Verma', priority: 'medium', checked: true },
]

export const chores = [
  { id: 'c1', title: 'Kitchen deep clean', assignee: 'Rahul Sharma', dueDate: '2026-05-24', frequency: 'Weekly', status: 'overdue', points: 15 },
  { id: 'c2', title: 'Take out trash', assignee: 'Arjun Verma', dueDate: '2026-05-25', frequency: 'Weekly', status: 'pending', points: 5 },
  { id: 'c3', title: 'Vacuum living room', assignee: 'Priya Singh', dueDate: '2026-05-26', frequency: 'Bi-weekly', status: 'pending', points: 10 },
  { id: 'c4', title: 'Clean bathroom', assignee: 'Karan Mehta', dueDate: '2026-05-27', frequency: 'Weekly', status: 'pending', points: 12 },
  { id: 'c5', title: 'Water plants', assignee: 'Rahul Sharma', dueDate: '2026-05-28', frequency: 'Weekly', status: 'completed', points: 5 },
  { id: 'c6', title: 'Mop kitchen floor', assignee: 'Arjun Verma', dueDate: '2026-05-22', frequency: 'Weekly', status: 'completed', points: 8 },
]

export const rentHistory = [
  { id: 'r1', month: 'May 2026', amount: RENT_TOTAL, dueDate: '2026-05-01', status: 'paid', paidBy: 'Rahul Sharma', perPerson: RENT_PER_PERSON },
  { id: 'r2', month: 'April 2026', amount: RENT_TOTAL, dueDate: '2026-04-01', status: 'paid', paidBy: 'Arjun Verma', perPerson: RENT_PER_PERSON },
  { id: 'r3', month: 'March 2026', amount: RENT_TOTAL, dueDate: '2026-03-01', status: 'paid', paidBy: 'Priya Singh', perPerson: RENT_PER_PERSON },
  { id: 'r4', month: 'June 2026', amount: RENT_TOTAL, dueDate: '2026-06-01', status: 'upcoming', paidBy: null, perPerson: RENT_PER_PERSON },
]

export const notifications = [
  { id: 'n1', type: 'expense', title: 'New expense added', message: 'Arjun added Electric Bill (₹1,800)', time: '2h ago', read: false },
  { id: 'n2', type: 'chore', title: 'Chore overdue', message: 'Kitchen deep clean is overdue', time: '5h ago', read: false },
  { id: 'n3', type: 'rent', title: 'Rent reminder', message: 'June rent due in 12 days — ₹8,000 your share', time: '1d ago', read: false },
  { id: 'n4', type: 'grocery', title: 'Grocery list updated', message: 'Karan added 2 items', time: '1d ago', read: true },
  { id: 'n5', type: 'member', title: 'Balance settled', message: 'Priya paid you ₹180', time: '2d ago', read: true },
  { id: 'n6', type: 'system', title: 'Welcome to Sunshine Flat', message: 'Your house was created successfully', time: '1w ago', read: true },
]

export const expenseCategories = ['All', 'Utilities', 'Food', 'Household', 'Maintenance', 'Other']
