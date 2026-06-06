-- Luma & Co. Restaurant — Supabase Schema
-- Run di: Supabase Dashboard → SQL Editor

-- ── Tables ──────────────────────────────────

create table if not exists menu_categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  "order" integer default 0,
  created_at timestamptz default now()
);

create table if not exists menu_items (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price integer not null,  -- in IDR (full amount, e.g. 145000)
  category_id uuid references menu_categories(id) on delete set null,
  is_available boolean default true,
  image_url text,
  tag text,
  "order" integer default 0,
  created_at timestamptz default now()
);

create table if not exists reservations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  email text,
  date date not null,
  time text not null,
  guests integer not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  notes text,
  created_at timestamptz default now()
);

create table if not exists gallery_items (
  id uuid default gen_random_uuid() primary key,
  url text not null,
  alt text,
  section text default 'gallery',
  "order" integer default 0,
  created_at timestamptz default now()
);

create table if not exists promotions (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  image_url text,
  cta_text text,
  cta_link text,
  start_date date,
  end_date date,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists site_content (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value text not null,
  type text default 'text',  -- 'text' | 'html' | 'json'
  updated_at timestamptz default now()
);

-- ── Row Level Security ───────────────────────

alter table menu_categories enable row level security;
alter table menu_items enable row level security;
alter table reservations enable row level security;
alter table gallery_items enable row level security;
alter table promotions enable row level security;
alter table site_content enable row level security;

-- Public read access
create policy "Public read menu_categories" on menu_categories for select using (true);
create policy "Public read menu_items" on menu_items for select using (is_available = true);
create policy "Public read gallery_items" on gallery_items for select using (true);
create policy "Public read promotions" on promotions for select using (is_active = true);
create policy "Public read site_content" on site_content for select using (true);

-- Authenticated (admin) full access
create policy "Admin all menu_categories" on menu_categories for all using (auth.role() = 'authenticated');
create policy "Admin all menu_items" on menu_items for all using (auth.role() = 'authenticated');
create policy "Admin all reservations" on reservations for all using (auth.role() = 'authenticated');
create policy "Admin all gallery_items" on gallery_items for all using (auth.role() = 'authenticated');
create policy "Admin all promotions" on promotions for all using (auth.role() = 'authenticated');
create policy "Admin all site_content" on site_content for all using (auth.role() = 'authenticated');

-- Allow anonymous inserts for reservations (public booking form)
create policy "Public insert reservations" on reservations for insert with check (true);

-- ── Seed Data ────────────────────────────────

insert into menu_categories (name, slug, "order") values
  ('Dinner', 'dinner', 0),
  ('Brunch', 'brunch', 1),
  ('Drinks', 'drinks', 2);

insert into menu_items (name, description, price, category_id, tag, "order") values
  ('Barramundi Panggang Arang', 'Ikan barramundi panggang arang, sambal matah citrus, sayur musiman dari kebun lokal.', 145000, (select id from menu_categories where slug = 'dinner'), 'Chef''s Pick', 0),
  ('Short Rib Rawon Glaze', 'Short rib 12 jam dengan glaze rawon pekat, potato pavé renyah, dan microherbs.', 185000, (select id from menu_categories where slug = 'dinner'), 'Signature', 1),
  ('Urap Garden Bowl', 'Sayuran lokal pilihan, kelapa sangrai, kemangi segar, dressing jeruk limau dan kencur.', 98000, (select id from menu_categories where slug = 'dinner'), 'Vegetarian', 2),
  ('Kaya French Toast', 'Roti brioche buatan sendiri, kaya pandan lembut, salted coconut cream, pisang karamel.', 82000, (select id from menu_categories where slug = 'brunch'), null, 0),
  ('Soto Benedict', 'Poached egg sempurna, hollandaise kunyit, ayam kampung suwir, sourdough panggang.', 118000, (select id from menu_categories where slug = 'brunch'), 'Best Seller', 1),
  ('Tropical Granola Bowl', 'Greek yogurt lokal, granola rempah buatan dapur, mangga harum manis, markisa, madu hutan.', 72000, (select id from menu_categories where slug = 'brunch'), null, 2),
  ('Kopi Rempah Tonic', 'Espresso single origin, tonic water, kayu manis, orange peel segar.', 58000, (select id from menu_categories where slug = 'drinks'), 'Signature', 0),
  ('Luma Citrus Fizz', 'Jeruk bali segar, perasan lemon, rosemary infused, sparkling soda. Tanpa alkohol.', 64000, (select id from menu_categories where slug = 'drinks'), 'Mocktail', 1),
  ('Rosella Negroni', 'Gin pilihan, vermouth rosella buatan bar, bitter aromatic, hiasan orange smoke.', 118000, (select id from menu_categories where slug = 'drinks'), null, 2);

insert into gallery_items (url, alt, section, "order") values
  ('https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80', 'Ruang makan utama Luma & Co.', 'gallery', 0),
  ('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80', 'Meja makan premium', 'gallery', 1),
  ('https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80', 'Bar dan area cocktail', 'gallery', 2);

insert into site_content (key, value, type) values
  ('hero_tagline', 'Rasa Nusantara, dibawakan dengan presisi.', 'text'),
  ('hero_lede', 'Menu berputar musiman, bahan dari pasar lokal, dan dapur terbuka yang mengundang Anda masuk.', 'text'),
  ('chef_quote', 'Kami tidak mencoba membuat makanan Indonesia terasa modern — kami membuat masakan modern yang jiwanya tetap Indonesia.', 'text'),
  ('chef_name', 'Chef Bagas Wibisono', 'text'),
  ('restaurant_address', 'Jl. Suryo No. 28, Senopati, Jakarta Selatan 12180', 'text'),
  ('restaurant_phone', '+62 21 2765 4321', 'text'),
  ('restaurant_hours', 'Brunch: Sabtu–Minggu 10:00–15:00 · Dinner: Senin–Minggu 18:00–22:30', 'text');
