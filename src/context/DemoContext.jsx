import { createContext, useContext, useState, useCallback } from 'react'

const DemoContext = createContext(null)

// Demo user shown in TopBar / Dashboard
export const DEMO_USER = {
  _id: 'demo',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@demo.com',
  avatar: 'RS',
  currentHouse: 'demo-house',
}

export const DEMO_HOUSE = {
  _id: 'demo-house',
  name: 'Sunshine Flat',
  inviteCode: 'SFL-4829',
  address: '12 MG Road, Indore, MP',
  monthlyRent: 32000,
  rentDueDay: 1,
  currency: 'INR',
  admin: 'demo',
}

export const DEMO_MEMBERS = [
  { _id: 'demo',  user: { _id: 'demo',  name: 'Rahul Sharma', avatar: 'RS', email: 'rahul.sharma@demo.com' }, role: 'admin',  balance: -850 },
  { _id: 'u2',    user: { _id: 'u2',    name: 'Arjun Verma',  avatar: 'AV', email: 'arjun@demo.com'        }, role: 'member', balance:  320 },
  { _id: 'u3',    user: { _id: 'u3',    name: 'Priya Singh',  avatar: 'PS', email: 'priya@demo.com'         }, role: 'member', balance:  180 },
  { _id: 'u4',    user: { _id: 'u4',    name: 'Karan Mehta',  avatar: 'KM', email: 'karan@demo.com'         }, role: 'member', balance:    0 },
]

export const DEMO_STATS = {
  totalOwed: 850,
  yourBalance: -850,
  pendingChores: 3,
  groceriesNeeded: 5,
  rentDueIn: 12,
  monthlySpend: 35399,
  monthlyBudget: 40000,
}

export const DEMO_ACTIVITY = [
  { id: 1, type: 'expense', title: 'Electric bill split',   user: 'Arjun Verma',  amount: 450,   time: '2h ago'    },
  { id: 2, type: 'chore',   title: 'Kitchen cleaned',       user: 'Priya Singh',  amount: null,  time: '5h ago'    },
  { id: 3, type: 'grocery', title: 'Milk & eggs added',     user: 'Karan Mehta',  amount: 320,   time: 'Yesterday' },
  { id: 4, type: 'rent',    title: 'May rent recorded',     user: 'Rahul Sharma', amount: 32000, time: '2 days ago'},
  { id: 5, type: 'expense', title: 'Internet subscription', user: 'Rahul Sharma', amount: 999,   time: '3 days ago'},
]

export const DEMO_EXPENSES = [
  { _id: 'e1', title: 'Electric Bill',      category: 'utilities', amount: 1800, paidBy: { name: 'Arjun Verma',  avatar: 'AV' }, date: '2026-05-20', splitType: 'equal', isSettled: true  },
  { _id: 'e2', title: 'Internet',           category: 'utilities', amount:  999, paidBy: { name: 'Rahul Sharma', avatar: 'RS' }, date: '2026-05-18', splitType: 'equal', isSettled: false },
  { _id: 'e3', title: 'Cleaning supplies',  category: 'other',     amount:  280, paidBy: { name: 'Priya Singh',  avatar: 'PS' }, date: '2026-05-15', splitType: 'equal', isSettled: false },
  { _id: 'e4', title: 'Pizza night',        category: 'food',      amount:  650, paidBy: { name: 'Karan Mehta',  avatar: 'KM' }, date: '2026-05-12', splitType: 'equal', isSettled: true  },
  { _id: 'e5', title: 'Water bill',         category: 'utilities', amount:  600, paidBy: { name: 'Rahul Sharma', avatar: 'RS' }, date: '2026-05-10', splitType: 'equal', isSettled: true  },
  { _id: 'e6', title: 'Furniture repair',   category: 'maintenance',amount:1200, paidBy: { name: 'Arjun Verma',  avatar: 'AV' }, date: '2026-05-08', splitType: 'custom',isSettled: false },
]

export const DEMO_GROCERIES = [
  { _id: 'g1', name: 'Whole milk',    quantity: '1',  unit: 'l',    category: 'dairy',    priority: 'high',   isBought: false, addedBy: { name: 'Karan Mehta',  avatar: 'KM' } },
  { _id: 'g2', name: 'Free-range eggs',quantity:'12', unit: 'pcs',  category: 'dairy',    priority: 'high',   isBought: false, addedBy: { name: 'Rahul Sharma', avatar: 'RS' } },
  { _id: 'g3', name: 'Brown bread',   quantity: '1',  unit: 'pack', category: 'grains',   priority: 'medium', isBought: false, addedBy: { name: 'Priya Singh',  avatar: 'PS' } },
  { _id: 'g4', name: 'Greek yogurt',  quantity: '400',unit: 'g',    category: 'dairy',    priority: 'low',    isBought: true,  addedBy: { name: 'Arjun Verma',  avatar: 'AV' } },
  { _id: 'g5', name: 'Bananas',       quantity: '6',  unit: 'pcs',  category: 'fruits',   priority: 'medium', isBought: false, addedBy: { name: 'Karan Mehta',  avatar: 'KM' } },
  { _id: 'g6', name: 'Olive oil',     quantity: '500',unit: 'ml',   category: 'other',    priority: 'low',    isBought: false, addedBy: { name: 'Rahul Sharma', avatar: 'RS' } },
  { _id: 'g7', name: 'Paper towels',  quantity: '2',  unit: 'pack', category: 'cleaning', priority: 'high',   isBought: false, addedBy: { name: 'Priya Singh',  avatar: 'PS' } },
  { _id: 'g8', name: 'Coffee beans',  quantity: '250',unit: 'g',    category: 'other',    priority: 'medium', isBought: true,  addedBy: { name: 'Arjun Verma',  avatar: 'AV' } },
]

export const DEMO_CHORES = [
  { _id: 'c1', title: 'Kitchen deep clean',   assignedTo: { name: 'Rahul Sharma', avatar: 'RS' }, dueDate: '2026-05-24', status: 'overdue',  points: 15, category: 'cleaning' },
  { _id: 'c2', title: 'Take out trash',        assignedTo: { name: 'Arjun Verma',  avatar: 'AV' }, dueDate: '2026-05-25', status: 'pending',  points:  5, category: 'trash'    },
  { _id: 'c3', title: 'Vacuum living room',    assignedTo: { name: 'Priya Singh',  avatar: 'PS' }, dueDate: '2026-05-26', status: 'pending',  points: 10, category: 'cleaning' },
  { _id: 'c4', title: 'Clean bathroom',        assignedTo: { name: 'Karan Mehta',  avatar: 'KM' }, dueDate: '2026-05-27', status: 'pending',  points: 12, category: 'cleaning' },
  { _id: 'c5', title: 'Water plants',          assignedTo: { name: 'Rahul Sharma', avatar: 'RS' }, dueDate: '2026-05-28', status: 'done',     points:  5, category: 'other'    },
  { _id: 'c6', title: 'Mop kitchen floor',     assignedTo: { name: 'Arjun Verma',  avatar: 'AV' }, dueDate: '2026-05-22', status: 'done',     points:  8, category: 'cleaning' },
]

export const DEMO_RENT = [
  { _id: 'r1', month: 5, year: 2026, amount: 8000, status: 'paid',     user: { name: 'Rahul Sharma', avatar: 'RS' }, dueDate: '2026-05-01', paidAt: '2026-05-01' },
  { _id: 'r2', month: 5, year: 2026, amount: 8000, status: 'paid',     user: { name: 'Arjun Verma',  avatar: 'AV' }, dueDate: '2026-05-01', paidAt: '2026-05-02' },
  { _id: 'r3', month: 5, year: 2026, amount: 8000, status: 'pending',  user: { name: 'Priya Singh',  avatar: 'PS' }, dueDate: '2026-05-01', paidAt: null },
  { _id: 'r4', month: 5, year: 2026, amount: 8000, status: 'pending',  user: { name: 'Karan Mehta',  avatar: 'KM' }, dueDate: '2026-05-01', paidAt: null },
]

export const DEMO_NOTIFICATIONS = [
  { _id: 'n1', type: 'expense_split', title: 'New expense added',    message: 'Arjun added Electric Bill (₹1,800)', createdAt: new Date(Date.now() - 2*3600000).toISOString(), isRead: false },
  { _id: 'n2', type: 'chore_assigned',title: 'Chore overdue',        message: 'Kitchen deep clean is overdue!',       createdAt: new Date(Date.now() - 5*3600000).toISOString(), isRead: false },
  { _id: 'n3', type: 'rent_due',      title: 'Rent reminder',        message: 'June rent due in 12 days — ₹8,000 your share', createdAt: new Date(Date.now() - 86400000).toISOString(), isRead: false },
  { _id: 'n4', type: 'grocery_added', title: 'Grocery list updated', message: 'Karan added 2 items to the list',      createdAt: new Date(Date.now() - 86400000*2).toISOString(), isRead: true  },
  { _id: 'n5', type: 'expense_paid',  title: 'Balance settled',      message: 'Priya paid you ₹180',                  createdAt: new Date(Date.now() - 86400000*3).toISOString(), isRead: true  },
  { _id: 'n6', type: 'general',       title: 'Welcome to Sunshine Flat', message: 'Your house was created successfully', createdAt: new Date(Date.now() - 86400000*7).toISOString(), isRead: true  },
]

export const DEMO_WALLET = {
  balance: 15000,
  totalDeposited: 45000,
  totalSpent: 30000,
  currency: 'INR',
}

export const DEMO_TRANSACTIONS = [
  { _id: 't1', type: 'deposit',      amount: 8000, description: 'Monthly contribution by Rahul',    user: { name: 'Rahul Sharma', avatar: 'RS' }, balanceBefore: 7000,  balanceAfter: 15000, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { _id: 't2', type: 'payment',      amount: 1800, description: 'Electric bill payment',             user: { name: 'Arjun Verma',  avatar: 'AV' }, balanceBefore: 8800,  balanceAfter: 7000,  createdAt: new Date(Date.now() - 86400000*3).toISOString() },
  { _id: 't3', type: 'deposit',      amount: 8000, description: 'Monthly contribution by Arjun',    user: { name: 'Arjun Verma',  avatar: 'AV' }, balanceBefore: 800,   balanceAfter: 8800,  createdAt: new Date(Date.now() - 86400000*5).toISOString() },
  { _id: 't4', type: 'rent_payment', amount: 8000, description: 'May rent — Priya Singh',           user: { name: 'Priya Singh',  avatar: 'PS' }, balanceBefore: 8800,  balanceAfter: 800,   createdAt: new Date(Date.now() - 86400000*7).toISOString() },
  { _id: 't5', type: 'deposit',      amount: 8000, description: 'Monthly contribution by Priya',    user: { name: 'Priya Singh',  avatar: 'PS' }, balanceBefore: 800,   balanceAfter: 8800,  createdAt: new Date(Date.now() - 86400000*9).toISOString() },
]

// ─── Provider ────────────────────────────────────────────────────────────────
export function DemoProvider({ children }) {
  const [isDemo, setIsDemo] = useState(
    () => localStorage.getItem('demo_mode') === 'true'
  )

  const enterDemo = useCallback(() => {
    localStorage.setItem('demo_mode', 'true')
    setIsDemo(true)
  }, [])

  const exitDemo = useCallback(() => {
    localStorage.removeItem('demo_mode')
    setIsDemo(false)
  }, [])

  return (
    <DemoContext.Provider value={{ isDemo, enterDemo, exitDemo }}>
      {children}
    </DemoContext.Provider>
  )
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export const useDemo = () => {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo must be used within <DemoProvider>')
  return ctx
}

export default DemoContext
