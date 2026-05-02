import { desc } from 'drizzle-orm';
import { Injectable } from '@/DIContainer';
import type { Db } from '@/db';
import { project } from './project.entity';

@Injectable()
export class ProjectsRepository {
  constructor(private readonly db: Db) {}

  list() {
    return this.db.select().from(project).orderBy(desc(project.createdAt));
  }

  create(input: { name: string; description: string | null; content: string | null; image: string | null; isHidden: boolean }) {
    return this.db.insert(project).values(input).returning();
  }
}
