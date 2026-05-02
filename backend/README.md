# personal-website-backend

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run 
```

Formatting and linting:

```bash
# formats code and organizes imports
bun run format

# checks without writing changes
bun run lint
```

Database:

```bash
# generate SQL migration files from schema changes
bun run db:generate

# apply migrations to postgres
bun run db:migrate
```

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
