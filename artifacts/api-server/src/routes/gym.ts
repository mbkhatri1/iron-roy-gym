import { Router, type IRouter } from "express";
import {
  CheckInMemberBody,
  CreateExpenseBody,
  CreateMemberBody,
  CreatePaymentBody,
  GetAttendanceQueryParams,
  GetMembersQueryParams,
  GetPaymentsQueryParams,
  UpdateMemberBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

type Member = {
  id: number;
  memberId: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string | null;
  gender: string | null;
  address: string | null;
  emergencyContact: string | null;
  planName: string;
  membershipStatus: "active" | "expiring" | "expired" | "suspended" | "cancelled";
  expiryDate: string;
  joinDate: string;
  trainerName: string | null;
  avatarUrl: string | null;
  initials: string;
  notes: string | null;
};

const firstNames = [
  "Maya", "Ethan", "Sofia", "Noah", "Amelia", "Lucas", "Isla", "Oliver",
  "Freya", "Leo", "Ava", "Theo", "Mia", "James", "Lily", "Jack",
  "Ella", "Henry", "Grace", "Charlie", "Emily", "Oscar", "Ruby", "George",
  "Sophia", "Arthur", "Poppy", "Harry", "Evie", "Archie", "Isabelle", "Thomas",
  "Florence", "William", "Daisy", "Finley",
];
const lastNames = [
  "Morgan", "Patel", "Walker", "Bennett", "Reed", "Thompson", "Wright", "Davies",
  "Carter", "Hughes", "Mitchell", "Evans",
];
const plans = ["Annual", "6 Months", "Monthly", "3 Months"];
const trainers = ["Jordan Blake", "Priya Shah", "Marcus Green", "Sofia Rossi", null];

function isoDate(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

function dateValue(value: string | Date | null | undefined) {
  if (!value) return null;
  return value instanceof Date ? value.toISOString().slice(0, 10) : value;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const members: Member[] = firstNames.map((first, index) => {
  const name = `${first} ${lastNames[index % lastNames.length]}`;
  const expiryOffset = index % 9 === 0 ? -8 : index % 5 === 0 ? 5 : 40 + (index % 70);
  const status = expiryOffset < 0 ? "expired" : expiryOffset <= 14 ? "expiring" : "active";
  return {
    id: index + 1,
    memberId: `GM-${String(1042 + index).padStart(4, "0")}`,
    name,
    email: `${first.toLowerCase()}.${lastNames[index % lastNames.length].toLowerCase()}@example.com`,
    phone: `07${String(40000000 + index * 731).slice(0, 8)}`,
    dateOfBirth: `199${index % 10}-0${(index % 8) + 1}-1${(index % 8) + 1}`,
    gender: index % 2 === 0 ? "Female" : "Male",
    address: `${index + 4} Willow Lane, London`,
    emergencyContact: `Alex ${lastNames[(index + 3) % lastNames.length]} · 07${String(70000000 + index * 19).slice(0, 8)}`,
    planName: plans[index % plans.length],
    membershipStatus: status,
    expiryDate: isoDate(expiryOffset),
    joinDate: isoDate(-(120 + index * 4)),
    trainerName: trainers[index % trainers.length],
    avatarUrl: null,
    initials: initials(name),
    notes: index % 4 === 0 ? "Prefers early morning sessions." : null,
  };
});

const membershipPlans = [
  { id: 1, name: "Monthly", duration: "30 days", price: 49, memberCount: 12, status: "active", color: "violet" },
  { id: 2, name: "3 Months", duration: "90 days", price: 129, memberCount: 8, status: "active", color: "blue" },
  { id: 3, name: "6 Months", duration: "180 days", price: 219, memberCount: 9, status: "active", color: "teal" },
  { id: 4, name: "Annual", duration: "365 days", price: 399, memberCount: 7, status: "active", color: "amber" },
];

const trainersList = [
  { id: 1, name: "Jordan Blake", specialization: "Strength & conditioning", memberCount: 14, status: "active", initials: "JB", phone: "07700 900123", email: "jordan@forgefitness.co", schedule: "Mon – Fri · 06:00–14:00" },
  { id: 2, name: "Priya Shah", specialization: "Mobility & rehabilitation", memberCount: 9, status: "active", initials: "PS", phone: "07700 900456", email: "priya@forgefitness.co", schedule: "Tue – Sat · 08:00–16:00" },
  { id: 3, name: "Marcus Green", specialization: "Athletic performance", memberCount: 11, status: "active", initials: "MG", phone: "07700 900789", email: "marcus@forgefitness.co", schedule: "Mon – Thu · 14:00–22:00" },
  { id: 4, name: "Sofia Rossi", specialization: "Personal training", memberCount: 5, status: "on-leave", initials: "SR", phone: "07700 900890", email: "sofia@forgefitness.co", schedule: "On leave until 24 Sep" },
];

let attendance = [
  { id: 1, memberId: 4, memberName: "Noah Bennett", memberCode: "GM-1045", date: isoDate(), time: "08:12", status: "checked-in", method: "search" },
  { id: 2, memberId: 8, memberName: "Oliver Wright", memberCode: "GM-1049", date: isoDate(), time: "08:26", status: "checked-in", method: "qr" },
  { id: 3, memberId: 12, memberName: "Mia Hughes", memberCode: "GM-1053", date: isoDate(), time: "08:41", status: "checked-in", method: "search" },
  { id: 4, memberId: 17, memberName: "Grace Carter", memberCode: "GM-1058", date: isoDate(), time: "09:03", status: "checked-out", method: "qr" },
  { id: 5, memberId: 22, memberName: "Emily Evans", memberCode: "GM-1063", date: isoDate(), time: "09:18", status: "checked-in", method: "search" },
  { id: 6, memberId: 28, memberName: "Harry Green", memberCode: "GM-1069", date: isoDate(-1), time: "18:42", status: "checked-out", method: "qr" },
];

let payments = [
  { id: 1, receiptNumber: "RCT-2084", memberName: "Maya Morgan", memberCode: "GM-1042", amount: 399, method: "card", status: "paid", date: isoDate(-1), planName: "Annual", discount: 0 },
  { id: 2, receiptNumber: "RCT-2083", memberName: "Ethan Patel", memberCode: "GM-1043", amount: 129, method: "transfer", status: "paid", date: isoDate(-1), planName: "3 Months", discount: 0 },
  { id: 3, receiptNumber: "RCT-2082", memberName: "Sofia Walker", memberCode: "GM-1044", amount: 49, method: "cash", status: "paid", date: isoDate(-2), planName: "Monthly", discount: 0 },
  { id: 4, receiptNumber: "RCT-2081", memberName: "Lucas Reed", memberCode: "GM-1045", amount: 219, method: "card", status: "paid", date: isoDate(-3), planName: "6 Months", discount: 20 },
  { id: 5, receiptNumber: "RCT-2080", memberName: "Amelia Thompson", memberCode: "GM-1046", amount: 99, method: "online", status: "pending", date: isoDate(-4), planName: "Monthly", discount: 0 },
];

let expenses = [
  { id: 1, name: "September rent", category: "Rent", amount: 2400, date: isoDate(-4), method: "Bank transfer", description: "Monthly unit lease" },
  { id: 2, name: "Electricity bill", category: "Electricity", amount: 384.2, date: isoDate(-6), method: "Direct debit", description: null },
  { id: 3, name: "Cleaning supplies", category: "Cleaning", amount: 126.5, date: isoDate(-9), method: "Card", description: "Monthly stock replenishment" },
  { id: 4, name: "Paid social campaign", category: "Marketing", amount: 240, date: isoDate(-12), method: "Card", description: "September lead generation" },
];

const notifications = [
  { id: 1, title: "3 memberships expiring soon", description: "Follow up before the end of the week.", type: "expiring", createdAt: new Date().toISOString(), read: false },
  { id: 2, title: "Payment received", description: "Maya Morgan paid £399 for Annual.", type: "payment", createdAt: new Date(Date.now() - 3600000).toISOString(), read: false },
  { id: 3, title: "New member registered", description: "Ava Mitchell joined with a Monthly plan.", type: "member", createdAt: new Date(Date.now() - 7200000).toISOString(), read: true },
  { id: 4, title: "Review expired memberships", description: "2 members need a follow-up today.", type: "alert", createdAt: new Date(Date.now() - 86400000).toISOString(), read: true },
];

function memberStatusCount(status: Member["membershipStatus"]) {
  return members.filter((member) => member.membershipStatus === status).length;
}

router.get("/dashboard", (_req, res) => {
  const monthlyRevenue = payments.filter((payment) => payment.status === "paid").reduce((sum, payment) => sum + payment.amount, 0);
  const monthlyExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  res.json({
    gym: { name: "Iron Roy Gym", location: "San Francisco, CA" },
    metrics: {
      totalMembers: members.length,
      activeMembers: memberStatusCount("active"),
      expiringSoon: memberStatusCount("expiring"),
      todaysAttendance: attendance.filter((record) => record.date === isoDate()).length,
      monthlyRevenue,
      pendingPayments: payments.filter((payment) => payment.status === "pending").reduce((sum, payment) => sum + payment.amount, 0),
      monthlyExpenses,
      netIncome: monthlyRevenue - monthlyExpenses,
      newMembers: 8,
    },
    revenue: [
      { label: "Apr", value: 10840 }, { label: "May", value: 12450 }, { label: "Jun", value: 11680 },
      { label: "Jul", value: 13820 }, { label: "Aug", value: 15140 }, { label: "Sep", value: monthlyRevenue },
    ],
    attendance: [
      { label: "Mon", value: 38 }, { label: "Tue", value: 46 }, { label: "Wed", value: 42 },
      { label: "Thu", value: 51 }, { label: "Fri", value: 48 }, { label: "Sat", value: 35 }, { label: "Sun", value: 22 },
    ],
    membershipMix: membershipPlans.map((plan) => ({ label: plan.name, value: plan.memberCount })),
    recentActivity: [
      { id: 1, type: "payment", title: "Payment received", description: "Maya Morgan paid $399 for Annual", timestamp: new Date(Date.now() - 3600000).toISOString() },
      { id: 2, type: "member", title: "New member registered", description: "Ava Mitchell joined Iron Roy Gym", timestamp: new Date(Date.now() - 7200000).toISOString() },
      { id: 3, type: "attendance", title: "Busy morning", description: "28 check-ins before midday", timestamp: new Date(Date.now() - 10800000).toISOString() },
      { id: 4, type: "expense", title: "Expense recorded", description: "Cleaning supplies · $126.50", timestamp: new Date(Date.now() - 172800000).toISOString() },
    ],
  });
});

router.get("/members", (req, res) => {
  const query = GetMembersQueryParams.parse(req.query);
  const search = query.search?.toLowerCase();
  const result = members.filter((member) => {
    const matchesSearch = !search || [member.name, member.email, member.phone, member.memberId].some((value) => value.toLowerCase().includes(search));
    const matchesStatus = !query.status || query.status === "all" || member.membershipStatus === query.status;
    return matchesSearch && matchesStatus;
  });
  res.json(result);
});

router.post("/members", (req, res) => {
  const body = CreateMemberBody.parse(req.body);
  const memberName = body.name.trim();
  const member = {
    id: Math.max(...members.map((item) => item.id)) + 1,
    memberId: `GM-${String(1042 + members.length).padStart(4, "0")}`,
    name: memberName,
    email: body.email,
    phone: body.phone,
    dateOfBirth: dateValue(body.dateOfBirth),
    gender: body.gender ?? null,
    address: body.address ?? null,
    emergencyContact: body.emergencyContact ?? null,
    planName: body.planName,
    membershipStatus: "active" as const,
    expiryDate: dateValue(body.expiryDate) ?? isoDate(30),
    joinDate: isoDate(),
    trainerName: body.trainerName ?? null,
    avatarUrl: null,
    initials: initials(memberName),
    notes: null,
  };
  members.unshift(member);
  res.status(201).json(member);
});

router.get("/members/:memberId", (req, res) => {
  const member = members.find((item) => item.id === Number(req.params.memberId));
  if (!member) return res.status(404).json({ error: "Member not found" });
  return res.json(member);
});

router.patch("/members/:memberId", (req, res) => {
  const body = UpdateMemberBody.parse(req.body);
  const member = members.find((item) => item.id === Number(req.params.memberId));
  if (!member) return res.status(404).json({ error: "Member not found" });
  Object.assign(member, body, { initials: initials(body.name) });
  return res.json(member);
});

router.delete("/members/:memberId", (req, res) => {
  const index = members.findIndex((item) => item.id === Number(req.params.memberId));
  if (index < 0) return res.status(404).json({ error: "Member not found" });
  members.splice(index, 1);
  return res.status(204).send();
});

router.get("/membership-plans", (_req, res) => res.json(membershipPlans));

router.get("/attendance", (req, res) => {
  const query = GetAttendanceQueryParams.parse(req.query);
  let result = attendance;
  if (query.date) result = result.filter((record) => record.date === dateValue(query.date));
  if (query.memberId) result = result.filter((record) => record.memberId === query.memberId);
  return res.json(result);
});

router.post("/attendance", (req, res) => {
  const body = CheckInMemberBody.parse(req.body);
  const member = members.find((item) => item.id === body.memberId);
  if (!member) return res.status(404).json({ error: "Member not found" });
  const record = {
    id: Math.max(...attendance.map((item) => item.id)) + 1,
    memberId: member.id,
    memberName: member.name,
    memberCode: member.memberId,
    date: isoDate(),
    time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    status: "checked-in",
    method: body.method ?? "search",
  };
  attendance.unshift(record);
  return res.status(201).json(record);
});

router.get("/payments", (req, res) => {
  const query = GetPaymentsQueryParams.parse(req.query);
  const result = !query.status || query.status === "all" ? payments : payments.filter((payment) => payment.status === query.status);
  return res.json(result);
});

router.post("/payments", (req, res) => {
  const body = CreatePaymentBody.parse(req.body);
  const member = members.find((item) => item.id === body.memberId);
  if (!member) return res.status(404).json({ error: "Member not found" });
  const payment = {
    id: Math.max(...payments.map((item) => item.id)) + 1,
    receiptNumber: `RCT-${String(2084 + payments.length).padStart(4, "0")}`,
    memberName: member.name,
    memberCode: member.memberId,
    amount: body.amount,
    method: body.method,
    status: "paid",
    date: isoDate(),
    planName: body.planName,
    discount: body.discount ?? 0,
  };
  payments.unshift(payment);
  return res.status(201).json(payment);
});

router.get("/trainers", (_req, res) => res.json(trainersList));

router.get("/expenses", (req, res) => {
  const category = typeof req.query.category === "string" ? req.query.category : undefined;
  return res.json(category ? expenses.filter((expense) => expense.category === category) : expenses);
});

router.post("/expenses", (req, res) => {
  const body = CreateExpenseBody.parse(req.body);
  const expense = {
    id: Math.max(...expenses.map((item) => item.id)) + 1,
    ...body,
    description: body.description ?? null,
    date: isoDate(),
  };
  expenses.unshift(expense);
  return res.status(201).json(expense);
});

router.get("/notifications", (_req, res) => res.json(notifications));

export default router;