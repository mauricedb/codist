import 'dotenv/config';
import { prisma } from '../src/lib/prisma';
import { addDays, toCalendarDate } from '../src/features/tasks/due-date';

// Fixed ids make the seed an upsert, so re-running it refreshes these rows
// (due dates move with today) instead of duplicating them.
const seedTasks: { id: string; title: string; dueInDays?: number }[] = [
  { id: 'seed-1', title: 'Submit the expense report', dueInDays: -3 },
  { id: 'seed-2', title: 'Return library books', dueInDays: -1 },
  { id: 'seed-3', title: 'Review pull requests', dueInDays: 0 },
  { id: 'seed-4', title: 'Buy groceries', dueInDays: 0 },
  { id: 'seed-5', title: 'Plan the weekly team sync', dueInDays: 0 },
  { id: 'seed-6', title: 'Read the Next.js 16 release notes' },
  { id: 'seed-7', title: 'Call the dentist' },
];

async function main() {
  const today = toCalendarDate(new Date());

  for (const { id, title, dueInDays } of seedTasks) {
    const dueDate = dueInDays === undefined ? null : addDays(today, dueInDays);
    await prisma.task.upsert({
      where: { id },
      create: { id, title, dueDate },
      update: { title, dueDate, completedAt: null },
    });
  }

  console.log(`Seeded ${seedTasks.length} tasks relative to ${today}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
