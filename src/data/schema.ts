import { relations } from "drizzle-orm";
import {
  int,
  mysqlEnum,
  mysqlTable,
  bigint,
  uniqueIndex,
  varchar,
  timestamp,
  boolean,
  index,
} from "drizzle-orm/mysql-core";

export const budgets = mysqlTable(
  "budgets",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    userId: varchar("user_id", { length: 256 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (budgets) => ({
    nameIndex: uniqueIndex("name_idx").on(budgets.name),
  }),
);

export const accounts = mysqlTable(
  "accounts",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    budgetId: int("budget_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (accounts) => ({
    nameIndex: uniqueIndex("name_idx").on(accounts.name),
    budgetIdIndex: uniqueIndex("budget_id_idx").on(accounts.budgetId),
  }),
);

export const budgetsRelations = relations(budgets, ({ many }) => ({
  accounts: many(accounts),
}));

export const accountsRelations = relations(accounts, ({ one, many }) => ({
  budget: one(budgets, {
    fields: [accounts.budgetId],
    references: [budgets.id],
  }),
  transactions: many(transactions),
}));

export const transactions = mysqlTable(
  "transactions",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    accountId: int("account_id").notNull(),
    payee: varchar("payee", { length: 256 }),
    amount: int("amount"),
    type: mysqlEnum("type", ["outflow", "inflow"]),
    note: varchar("note", { length: 256 }),
    cleared: boolean("cleared"),
    categoryId: int("category_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (transactions) => ({
    nameIndex: uniqueIndex("name_idx").on(transactions.name),
    accountIdIndex: uniqueIndex("account_id_idx").on(transactions.accountId),
    categoryIdIndex: uniqueIndex("category_id_idx").on(transactions.categoryId),
  }),
);

export const transactionsRelations = relations(transactions, ({ one }) => ({
  account: one(accounts, {
    fields: [transactions.accountId],
    references: [accounts.id],
  }),
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));

export const categoryGroups = mysqlTable(
  "category_groups",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    budgetId: int("budget_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (categoryGroups) => ({
    nameIndex: uniqueIndex("name_idx").on(categoryGroups.name),
    budgetIdIndex: uniqueIndex("budget_id_idx").on(categoryGroups.budgetId),
  }),
);

export const categoryGroupsRelations = relations(
  categoryGroups,
  ({ one, many }) => ({
    budget: one(budgets, {
      fields: [categoryGroups.budgetId],
      references: [budgets.id],
    }),
    categories: many(categories),
  }),
);

export const categories = mysqlTable(
  "categories",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    categoryGroupId: int("category_group_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (categories) => ({
    nameIndex: uniqueIndex("name_idx").on(categories.name),
    categoryGroupId: uniqueIndex("category_group_id_idx").on(
      categories.categoryGroupId,
    ),
  }),
);

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  categoryGroup: one(categoryGroups, {
    fields: [categories.categoryGroupId],
    references: [categoryGroups.id],
  }),
  transactions: many(transactions),
}));

export const categoryFunds = mysqlTable(
  "category_funds",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    categoryId: int("category_id").notNull(),
    amount: int("amount"),
    month: int("month"),
    year: int("year"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (categoryFunds) => ({
    monthYearIndex: uniqueIndex("month_year_idx").on(
      categoryFunds.month,
      categoryFunds.year,
    ),
    categoryId: uniqueIndex("category_id_idx").on(categoryFunds.categoryId),
  }),
);

export const categoryFundsRelations = relations(categoryFunds, ({ one }) => ({
  category: one(categories, {
    fields: [categoryFunds.categoryId],
    references: [categories.id],
  }),
}));
