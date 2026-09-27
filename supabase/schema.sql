drop table if exists public.cost_entries;

create extension if not exists "uuid-ossp";

create table public.cost_entries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  price numeric not null default 0,
  orders numeric not null default 0,
  supplier numeric not null default 0,
  distributor numeric not null default 0,
  shipping numeric not null default 0,
  marketing numeric not null default 0,
  capital numeric not null default 0,
  created_at timestamp with time zone default now()
);

alter table public.cost_entries enable row level security;

create policy "select_own_entries" on public.cost_entries
  for select using (auth.uid() = user_id);

create policy "insert_own_entries" on public.cost_entries
  for insert with check (auth.uid() = user_id);

create policy "update_own_entries" on public.cost_entries
  for update using (auth.uid() = user_id);

create policy "delete_own_entries" on public.cost_entries
  for delete using (auth.uid() = user_id);
