create table if not exists cost_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  order_price numeric not null default 0,
  orders_count integer not null default 0,
  supplier_cost numeric not null default 0,
  distributor_cost numeric not null default 0,
  shipping_cost numeric not null default 0,
  marketing_cost numeric not null default 0,
  capital_cost numeric not null default 0,
  created_at timestamp with time zone default now()
);

alter table cost_entries enable row level security;

create policy "Users can view their own entries"
  on cost_entries for select
  using (auth.uid() = user_id);

create policy "Users can insert their own entries"
  on cost_entries for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own entries"
  on cost_entries for update
  using (auth.uid() = user_id);

create policy "Users can delete their own entries"
  on cost_entries for delete
  using (auth.uid() = user_id);
