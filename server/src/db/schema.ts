import {
  pgTable,
  uuid,
  text,
  boolean,
  bigint,
  timestamp,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const rooms = pgTable('rooms', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const polls = pgTable('polls', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  roomId: uuid('room_id')
    .references(() => rooms.id, { onDelete: 'cascade' })
    .notNull(),
  question: text('question').notNull(),
  isOpen: boolean('is_open').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const options = pgTable('options', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  pollId: uuid('poll_id')
    .references(() => polls.id, { onDelete: 'cascade' })
    .notNull(),
  label: text('label').notNull(),
});

export const votes = pgTable(
  'votes',
  {
    pollId: uuid('poll_id')
      .references(() => polls.id, { onDelete: 'cascade' })
      .notNull(),
    voterId: uuid('voter_id').notNull(),
    optionId: uuid('option_id')
      .references(() => options.id, { onDelete: 'cascade' })
      .notNull(),
    idem: text('idempotency_key').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.pollId, t.voterId] })],
);

export const optionCounts = pgTable(
  'option_counts',
  {
    pollId: uuid('poll_id').notNull(),
    optionId: uuid('option_id').notNull(),
    count: bigint('count', { mode: 'number' }).notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.pollId, t.optionId] })],
);
