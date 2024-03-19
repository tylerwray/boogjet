import { InferSelectModel, relations } from "drizzle-orm";
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
    publicId: varchar("public_id", { length: 24 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (budgets) => ({
    publicIdIndex: index("public_id_idx").on(budgets.publicId),
    nameIndex: index("name_idx").on(budgets.name),
  }),
);

export type Budget = InferSelectModel<typeof budgets>;

export const budgetsRelations = relations(budgets, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = mysqlTable(
  "accounts",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    publicId: varchar("public_id", { length: 24 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    budgetId: int("budget_id").notNull(),
    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (accounts) => ({
    publicIdIndex: index("public_id_idx").on(accounts.publicId),
    nameIndex: index("name_idx").on(accounts.name),
    budgetIdIndex: index("budget_id_idx").on(accounts.budgetId),
  }),
);

export type Account = InferSelectModel<typeof accounts>;

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
    publicId: varchar("public_id", { length: 24 }).notNull(),
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
    publicIdIndex: index("public_id_idx").on(transactions.publicId),
    nameIndex: index("name_idx").on(transactions.name),
    accountIdIndex: index("account_id_idx").on(transactions.accountId),
    categoryIdIndex: index("category_id_idx").on(transactions.categoryId),
  }),
);

export type Transaction = InferSelectModel<typeof transactions>;

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
    publicId: varchar("public_id", { length: 24 }).notNull(),
    name: varchar("name", { length: 256 }),
    budgetId: int("budget_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (categoryGroups) => ({
    publicIdIndex: index("public_id_idx").on(categoryGroups.publicId),
    nameIndex: index("name_idx").on(categoryGroups.name),
    budgetIdIndex: index("budget_id_idx").on(categoryGroups.budgetId),
  }),
);

export type CategoryGroup = InferSelectModel<typeof categoryGroups>;

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
    publicId: varchar("public_id", { length: 24 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    categoryGroupId: int("category_group_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (categories) => ({
    publicIdIndex: index("public_id_idx").on(categories.publicId),
    nameIndex: index("name_idx").on(categories.name),
    categoryGroupId: index("category_group_id_idx").on(
      categories.categoryGroupId,
    ),
  }),
);

export type Category = InferSelectModel<typeof categories>;

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  categoryGroup: one(categoryGroups, {
    fields: [categories.categoryGroupId],
    references: [categoryGroups.id],
  }),
  transactions: many(transactions),
  categoryFunds: many(categoryFunds),
}));

export const categoryFunds = mysqlTable(
  "category_funds",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    publicId: varchar("public_id", { length: 24 }).notNull(),
    categoryId: int("category_id").notNull(),
    budgetId: int("budget_id").notNull(),
    amount: int("amount"),
    month: int("month"),
    year: int("year"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (categoryFunds) => ({
    publicIdIndex: index("public_id_idx").on(categoryFunds.publicId),
    monthYearCategoryIndex: uniqueIndex("month_year_category_id_idx").on(
      categoryFunds.month,
      categoryFunds.year,
      categoryFunds.categoryId,
    ),
  }),
);

export type CategoryFunds = InferSelectModel<typeof categoryFunds>;

export const categoryFundsRelations = relations(categoryFunds, ({ one }) => ({
  budget: one(budgets, {
    fields: [categoryFunds.budgetId],
    references: [budgets.id],
  }),
  category: one(categories, {
    fields: [categoryFunds.categoryId],
    references: [categories.id],
  }),
}));
