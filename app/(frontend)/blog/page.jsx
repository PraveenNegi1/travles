import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

async function getBlogs() {
  try {
    const res = await fetch("https://blogdashboard-tawny.vercel.app/api/blogs", {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch blogs");
    const data = await res.json();
    return data.blogs || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function readingTime(content = "") {
  const words = content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(createdAt) {
  if (!createdAt) return null;
  const date = new Date(createdAt.seconds ? createdAt.seconds * 1000 : createdAt);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// Category → a distinct, opinionated color pair (bg / text / dot)
const CATEGORY_COLORS = [
  { bg: "bg-violet-100", text: "text-violet-700", dot: "bg-violet-500" },
  { bg: "bg-sky-100",    text: "text-sky-700",    dot: "bg-sky-500" },
  { bg: "bg-emerald-100",text: "text-emerald-700",dot: "bg-emerald-500" },
  { bg: "bg-amber-100",  text: "text-amber-700",  dot: "bg-amber-500" },
  { bg: "bg-rose-100",   text: "text-rose-700",   dot: "bg-rose-500" },
  { bg: "bg-indigo-100", text: "text-indigo-700", dot: "bg-indigo-500" },
];

function getCatColor(category = "") {
  let h = 0;
  for (let i = 0; i < category.length; i++) h = (h + category.charCodeAt(i)) % CATEGORY_COLORS.length;
  return CATEGORY_COLORS[h];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryChip({ category }) {
  if (!category) return null;
  const c = getCatColor(category);
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {category}
    </span>
  );
}

function AuthorPip({ name }) {
  const init = (name || "A").charAt(0).toUpperCase();
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#15181D] text-[11px] font-bold text-white ring-2 ring-white">
      {init}
    </span>
  );
}

function MetaRow({ blog, className = "" }) {
  const date = formatDate(blog.createdAt);
  const rt = readingTime(blog.content);
  const author = blog.authorName || blog.author;
  return (
    <div className={`flex flex-wrap items-center gap-3 text-xs text-slate-500 ${className}`}>
      {author && (
        <span className="flex items-center gap-1.5">
          <AuthorPip name={author} />
          <span className="font-medium text-slate-700">{author}</span>
        </span>
      )}
      <span className="flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" />
        {rt} min read
      </span>
      {date && (
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {date}
        </span>
      )}
    </div>
  );
}

// ─── Card variants ─────────────────────────────────────────────────────────────

// Hero card — spans full width, image left + text right on desktop
function HeroCard({ blog }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 hover:shadow-xl transition-shadow duration-500">
      <Link href={`/blog/${blog.slug}`} className="absolute inset-0 z-10" aria-label={`Read ${blog.title}`} />

      <div className="grid md:grid-cols-[1.1fr_1fr] min-h-[420px]">
        {/* Image side */}
        <div className="relative overflow-hidden bg-slate-100 md:rounded-l-3xl">
          {blog.coverImage ? (
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
          )}
          {/* Scrim for readability on mobile where text overlaps */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 hidden md:block" />

          {/* Category chip on image */}
          {blog.category && (
            <div className="absolute top-5 left-5 z-20">
              <CategoryChip category={blog.category} />
            </div>
          )}

          {/* "Featured" eyebrow */}
          <div className="absolute bottom-5 left-5 z-20 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white drop-shadow">Featured</span>
          </div>
        </div>

        {/* Text side */}
        <div className="flex flex-col justify-center gap-5 p-8 md:p-10 lg:p-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3">Latest article</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[1.75rem] lg:text-3xl font-bold text-slate-900 leading-[1.2] tracking-tight group-hover:text-indigo-700 transition-colors">
              {blog.title}
            </h2>
          </div>

          {blog.excerpt && (
            <p className="text-slate-500 leading-relaxed line-clamp-3 text-sm md:text-base">{blog.excerpt}</p>
          )}

          <MetaRow blog={blog} />

          <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white group-hover:bg-indigo-700 transition-colors duration-300">
            Read article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

// Standard card — used in the 3-column grid
function BlogCard({ blog }) {
  const rt = readingTime(blog.content);
  const date = formatDate(blog.createdAt);
  const c = getCatColor(blog.category);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <Link href={`/blog/${blog.slug}`} className="absolute inset-0 z-10" aria-label={`Read ${blog.title}`} />

      {/* Cover */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {blog.coverImage ? (
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
        ) : (
          <div className={`absolute inset-0 flex items-center justify-center ${c.bg}`}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" strokeWidth="1.4" stroke="currentColor" className={c.text}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        {/* Category pill on image */}
        {blog.category && (
          <div className="absolute top-3 left-3 z-20">
            <CategoryChip category={blog.category} />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-serif text-[1.05rem] font-bold leading-snug text-slate-900 line-clamp-2 group-hover:text-indigo-700 transition-colors">
          {blog.title}
        </h3>

        {blog.excerpt && (
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">{blog.excerpt}</p>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <AuthorPip name={blog.authorName || blog.author} />
            <div>
              <p className="font-semibold text-slate-700 leading-tight">{blog.authorName || blog.author || "Author"}</p>
              <p className="leading-tight">{rt} min · {date || "—"}</p>
            </div>
          </div>
          <span className={`flex h-8 w-8 items-center justify-center rounded-full ${c.bg} ${c.text} group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors shrink-0`}>
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

// Wide card — used in the "More Stories" 2-column secondary row
function WideCard({ blog }) {
  const rt = readingTime(blog.content);
  const date = formatDate(blog.createdAt);

  return (
    <article className="group relative flex overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 min-h-[160px]">
      <Link href={`/blog/${blog.slug}`} className="absolute inset-0 z-10" aria-label={`Read ${blog.title}`} />

      {/* Thumbnail */}
      <div className="relative w-40 sm:w-52 shrink-0 overflow-hidden bg-slate-100">
        {blog.coverImage ? (
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            sizes="208px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" />
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col justify-between gap-2 p-5">
        {blog.category && <CategoryChip category={blog.category} />}
        <h3 className="font-serif text-base font-bold leading-snug text-slate-900 line-clamp-2 group-hover:text-indigo-700 transition-colors">
          {blog.title}
        </h3>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{rt} min</span>
          {date && <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{date}</span>}
        </div>
      </div>
    </article>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export const metadata = {
  title: "Blog",
  description: "Latest articles and insights",
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  // Layout split: hero + first two cards in top row, rest below
  const [hero, second, third, ...rest] = blogs;

  return (
    <div className="min-h-screen bg-[#F7F8FA]">

      {/* ── Header strip ── */}
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 mb-2">
                Our Journal
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                Ideas worth<br className="hidden sm:block" /> reading.
              </h1>
            </div>

            {blogs.length > 0 && (
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-900">{blogs.length}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Articles</p>
                </div>
                <div className="h-10 w-px bg-slate-100" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-900">
                    {[...new Set(blogs.map(b => b.category).filter(Boolean))].length || "∞"}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">Topics</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {blogs.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white py-28 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800">No articles yet</h3>
            <p className="mt-2 text-slate-400 max-w-sm">
              Check back soon — new articles appear here as soon as they're published.
            </p>
          </div>
        ) : (
          <div className="space-y-16">

            {/* ── Hero + side cards row ── */}
            {hero && (
              <section>
                <div className="grid xl:grid-cols-[1fr_340px] gap-6 items-start">
                  {/* Hero card */}
                  <HeroCard blog={hero} />

                  {/* Side stack */}
                  {(second || third) && (
                    <div className="flex flex-col gap-6 xl:h-full">
                      {second && (
                        <div className="flex-1">
                          <BlogCard blog={second} />
                        </div>
                      )}
                      {third && (
                        <div className="flex-1">
                          <BlogCard blog={third} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* ── More stories ── */}
            {rest.length > 0 && (
              <section>
                {/* Section eyebrow */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 whitespace-nowrap">
                    More Stories
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                {/* Responsive grid:
                    ≥1280 px  → 3 columns (BlogCard)
                    768–1279  → 2 columns (BlogCard)
                    <768      → 1 column  (WideCard for list feel) */}

                {/* Mobile list (< md) */}
                <div className="flex flex-col gap-4 md:hidden">
                  {rest.map((blog) => <WideCard key={blog.id} blog={blog} />)}
                </div>

                {/* Grid (≥ md) */}
                <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {rest.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
                </div>
              </section>
            )}

          </div>
        )}
      </main>
    </div>
  );
}