import {
  Activity,
  CircleUserRound,
  CreditCard,
  Globe,
  Instagram,
  Search,
  ShoppingCart,
} from "lucide-react";

export const revenueData = [
  { name: "Smart Watch S9", revenue: 24800, growth: 18.4 },
  { name: "Running Shoes Pro", revenue: 19200, growth: 11.2 },
  { name: "Wireless Earbuds X2", revenue: 17150, growth: 9.7 },
  { name: "Minimal Backpack", revenue: 13800, growth: 6.1 },
  { name: "Gaming Mouse G5", revenue: 12640, growth: 4.5 },
];

export const performanceData = [
  { month: "Jan", orders: 120, conversion: 2.8, avgOrderValue: 78 },
  { month: "Feb", orders: 146, conversion: 3.1, avgOrderValue: 81 },
  { month: "Mar", orders: 163, conversion: 3.4, avgOrderValue: 86 },
  { month: "Apr", orders: 152, conversion: 3.2, avgOrderValue: 84 },
  { month: "May", orders: 179, conversion: 3.8, avgOrderValue: 89 },
  { month: "Jun", orders: 201, conversion: 4.0, avgOrderValue: 93 },
];

export const userData = [
  {
    id: 1,
    name: "Niloofar Ahmadi",
    email: "niloofar@example.com",
    role: "Admin",
    status: "Active",
    joinedAt: "2025-11-02",
    orders: 42,
  },
  {
    id: 2,
    name: "Ali Hosseini",
    email: "ali.h@example.com",
    role: "Editor",
    status: "Active",
    joinedAt: "2025-09-15",
    orders: 27,
  },
  {
    id: 3,
    name: "Sara Moradi",
    email: "sara.m@example.com",
    role: "Support",
    status: "Pending",
    joinedAt: "2025-12-10",
    orders: 13,
  },
  {
    id: 4,
    name: "Reza Karimi",
    email: "reza.k@example.com",
    role: "Viewer",
    status: "Inactive",
    joinedAt: "2025-07-21",
    orders: 8,
  },
  {
    id: 5,
    name: "Parsa Nadimi",
    email: "parsa.n@example.com",
    role: "Editor",
    status: "Active",
    joinedAt: "2026-01-05",
    orders: 31,
  },
];

export const trafficSources = [
  {
    name: "Organic Search",
    value: 42,
    color: "#22c55e",
    icon: Search,
  },
  {
    name: "Direct",
    value: 24,
    color: "#3b82f6",
    icon: Globe,
  },
  {
    name: "Social Media",
    value: 18,
    color: "#f97316",
    icon: Instagram,
  },
  {
    name: "Referral",
    value: 10,
    color: "#a855f7",
    icon: CircleUserRound,
  },
  {
    name: "Paid Ads",
    value: 6,
    color: "#ef4444",
    icon: Activity,
  },
];

export const liveActivities = [
  {
    id: 1,
    title: "New order placed",
    description: "Order #1042 by Niloofar Ahmadi",
    time: "2 min ago",
    amount: "$189.00",
    icon: ShoppingCart,
    color: "#22c55e",
  },
  {
    id: 2,
    title: "Payment confirmed",
    description: "Invoice #INV-778 paid successfully",
    time: "8 min ago",
    amount: "$420.00",
    icon: CreditCard,
    color: "#3b82f6",
  },
  {
    id: 3,
    title: "Traffic spike",
    description: "Organic visits increased by 14%",
    time: "15 min ago",
    amount: "+14%",
    icon: Search,
    color: "#f59e0b",
  },
  {
    id: 4,
    title: "New user registered",
    description: "Parsa Nadimi joined the platform",
    time: "22 min ago",
    amount: "User +1",
    icon: CircleUserRound,
    color: "#a855f7",
  },
  {
    id: 5,
    title: "Checkout recovered",
    description: "Abandoned cart converted to sale",
    time: "31 min ago",
    amount: "$96.00",
    icon: ShoppingCart,
    color: "#14b8a6",
  },
];
