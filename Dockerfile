FROM oven/bun:alpine AS base

# Step 1 - install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Step 2 - rebuild the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set Node.js options for better memory management during build
ENV NODE_OPTIONS="--max-old-space-size=400 --optimize-for-size"

# Enable swap and build optimizations
RUN echo 'vm.swappiness=10' >> /etc/sysctl.conf

# Run velite and build with memory optimizations
RUN bun velite
RUN bun run build

# Step 3 - copy all the files and run server
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.velite ./velite

EXPOSE 3000
CMD ["bun", "run", "server.js"]
