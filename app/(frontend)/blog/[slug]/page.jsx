import { notFound } from "next/navigation";
import Image from "next/image";

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getBlog(slug) {
  const res = await fetch(
    `https://blogdashboard-tawny.vercel.app/api/blogs/${slug}`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.blog;
}

async function getRelatedBlogs(currentSlug, category) {
  try {
    const res = await fetch(
      "https://blogdashboard-tawny.vercel.app/api/blogs",
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    const all = (data.blogs || []).filter((b) => b.slug !== currentSlug);
    const sameCategory = category
      ? all.filter((b) => b.category === category)
      : [];
    const rest = all.filter((b) => !sameCategory.includes(b));
    const pool = [...sameCategory, ...rest];
    const seen = new Set();
    const result = [];
    for (const b of pool) {
      if (seen.has(b.slug)) continue;
      seen.add(b.slug);
      result.push(b);
      if (result.length === 3) break;
    }
    return result;
  } catch {
    return [];
  }
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function getReadingTime(html = "") {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function getWordCount(html = "") {
  const text = html.replace(/<[^>]*>/g, " ");
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function formatDate(value) {
  if (!value) return null;
  if (value && typeof value === "object" && value.seconds) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(value.seconds * 1000));
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function addHeadingIdsAndExtractTOC(html = "") {
  const headingRegex = /<(h2|h3)([^>]*)>(.*?)<\/\1>/gis;
  const usedSlugs = new Set();
  const toc = [];
  let h2Count = 0;
  let h3Count = 0;

  const patchedHtml = html.replace(headingRegex, (match, tag, attrs, inner) => {
    const text = inner.replace(/<[^>]*>/g, "").trim();
    if (!text) return match;
    let slug = slugify(text) || `section-${toc.length + 1}`;
    let unique = slug;
    let i = 1;
    while (usedSlugs.has(unique)) unique = `${slug}-${i++}`;
    usedSlugs.add(unique);
    const level = tag.toLowerCase() === "h3" ? 3 : 2;
    let number;
    if (level === 2) {
      h2Count += 1;
      h3Count = 0;
      number = `${h2Count}`;
    } else {
      if (h2Count === 0) h2Count = 1;
      h3Count += 1;
      number = `${h2Count}.${h3Count}`;
    }
    toc.push({ id: unique, text, level, number });
    const cleanedAttrs = attrs.replace(/\sid="[^"]*"/i, "");
    return `<${tag}${cleanedAttrs} id="${unique}">${inner}</${tag}>`;
  });

  return { html: patchedHtml, toc };
}

function extractFAQs(html = "") {
  const sections = html.split(/(?=<h2[\s>])/i);
  const faqSection = sections.find((s) =>
    /frequently\s+asked|faq/i.test(s.substring(0, 200)),
  );
  if (!faqSection) return [];

  const faqs = [];
  const qRegex = /<h3[^>]*>(.*?)<\/h3>\s*<p[^>]*>(.*?)<\/p>/gis;
  let match;
  while ((match = qRegex.exec(faqSection)) !== null) {
    const q = match[1].replace(/<[^>]*>/g, "").trim();
    const a = match[2].replace(/<[^>]*>/g, "").trim();
    if (q && a) faqs.push({ q, a });
  }
  return faqs;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogDetails({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) notFound();

  const readingTime = getReadingTime(blog.content);
  const wordCount = getWordCount(blog.content);
  const publishedDate = formatDate(blog.publishedAt || blog.createdAt);
  const updatedDate = blog.updatedAt ? formatDate(blog.updatedAt) : null;
  const authorInitial =
    blog.author?.trim?.()?.[0]?.toUpperCase() ||
    blog.authorName?.trim?.()?.[0]?.toUpperCase();
  const authorDisplayName = blog.author || blog.authorName;

  const { html: content, toc } = addHeadingIdsAndExtractTOC(blog.content || "");
  const faqs = extractFAQs(blog.content || "");
  const related = await getRelatedBlogs(slug, blog.category);
  const tags = Array.isArray(blog.tags) ? blog.tags : [];

  const likeCount = blog.likeCount ?? 0;

  // Comments from subcollection (included via getBlogBySlug)
  const comments = Array.isArray(blog.comments) ? blog.comments : [];
  const commentCount =
    comments.length > 0 ? comments.length : (blog.commentCount ?? 0);

  const accent = "#1F6F5C";

  return (
    <>
      <style>{`
        @keyframes progress-grow {
          from { transform: scaleX(0); }
        }
        .progress-bar {
          position: fixed;
          top: 0; left: 0;
          height: 3px;
          width: 100%;
          background: ${accent};
          transform-origin: left;
          z-index: 9999;
          animation: none;
        }
      `}</style>

      <div className="min-h-screen">
        {/* ── Hero header ── */}
        <header className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-10 sm:pt-14 sm:pb-12">
            <a
              href="/blog"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#5B6168] hover:text-[#15181D] transition-colors mb-8"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0 group-hover:-translate-x-0.5 transition-transform"
              >
                <path
                  d="M9.5 12L5.5 8l4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              All posts
            </a>

            <div className="flex flex-wrap items-center gap-2 mb-5">
              {blog.category && (
                <span className="inline-flex items-center rounded-full bg-[#E8F4F1] px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-[#1F6F5C]">
                  {blog.category}
                </span>
              )}
              <span className="text-xs text-[#9CA3AF]">Article</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-[#15181D] max-w-3xl mb-6">
              {blog.title}
            </h1>

            {(blog.excerpt || blog.metaDescription) && (
              <p className="text-lg text-[#5B6168] leading-relaxed max-w-2xl mb-8">
                {blog.excerpt || blog.metaDescription}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#5B6168]">
              {authorDisplayName && (
                <div className="flex items-center gap-2.5">
                  {blog.authorAvatar ? (
                    <div className="relative h-9 w-9 rounded-full overflow-hidden ring-2 ring-[#E2E4E0]">
                      <Image
                        src={blog.authorAvatar}
                        alt={authorDisplayName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#15181D] text-sm font-bold text-[#F5F6F4]">
                      {authorInitial || "?"}
                    </span>
                  )}
                  <div>
                    <p className="font-semibold text-[#15181D] leading-tight">
                      {authorDisplayName}
                    </p>
                    {publishedDate && (
                      <time
                        className="text-xs text-[#9CA3AF]"
                        dateTime={blog.publishedAt || blog.createdAt}
                      >
                        {publishedDate}
                      </time>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 text-[#9CA3AF]">
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {readingTime} min read
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  {wordCount.toLocaleString()} words
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill={likeCount > 0 ? "#1F6F5C" : "none"}
                    stroke="#1F6F5C"
                    strokeWidth="1.8"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {likeCount} {likeCount === 1 ? "like" : "likes"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {commentCount} {commentCount === 1 ? "comment" : "comments"}
                </span>
                {updatedDate && updatedDate !== publishedDate && (
                  <span className="text-xs">Updated {updatedDate}</span>
                )}
              </div>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center gap-1 rounded-md border border-[#E2E4E0] bg-[#F5F6F4] px-2.5 py-1 text-xs font-medium text-[#5B6168] hover:border-[#1F6F5C] hover:text-[#1F6F5C] transition-colors"
                  >
                    <span className="text-[#9CA3AF]">#</span>
                    {tag}
                  </a>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* ── Cover image ── */}
        {blog.coverImage && (
          <div className="relative w-[90vw] aspect-[12/9] max-h-[520px] overflow-hidden mx-auto">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* ── Body ── */}
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-[1fr_380px] gap-14 items-start">
            {/* ── Article ── */}
            <article>
              {/* Mobile TOC */}
              {toc.length > 0 && (
                <details className="lg:hidden mb-10 rounded-2xl border border-[#E2E4E0] bg-white overflow-hidden">
                  <summary className="flex items-center justify-between gap-3 cursor-pointer select-none px-5 py-4 text-sm font-semibold text-[#15181D]">
                    <span className="flex items-center gap-2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={accent}
                        strokeWidth="2"
                      >
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="15" y2="12" />
                        <line x1="3" y1="18" x2="18" y2="18" />
                      </svg>
                      Table of contents
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 pt-1 border-t border-[#E2E4E0]">
                    <ol className="space-y-1 mt-3">
                      {toc.map((item) => (
                        <li
                          key={item.id}
                          className={item.level === 3 ? "pl-5" : ""}
                        >
                          <a
                            href={`#${item.id}`}
                            className="flex items-baseline gap-2 py-1 text-sm text-[#5B6168] hover:text-[#1F6F5C] transition-colors"
                          >
                            <span className="shrink-0 text-xs font-bold tabular-nums text-[#1F6F5C]">
                              {item.number}
                            </span>
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                </details>
              )}

              {/* Content */}
              <div
                className="prose prose-lg max-w-none prose-h1:font-serif prose-h1:text-[#15181D] prose-h1:font-bold prose-h1:tracking-tight prose-h1:leading-tight prose-h2:font-serif prose-h2:text-[#15181D] prose-h2:font-bold prose-h2:tracking-tight prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-[#E2E4E0] prose-h2:pb-3 prose-h3:font-serif prose-h3:text-[#15181D] prose-h3:font-semibold prose-h3:tracking-tight prose-h3:mt-8 prose-h3:mb-3 prose-p:text-[#33363C] prose-p:leading-[1.85] prose-a:text-[#1F6F5C] prose-a:font-medium prose-strong:text-[#15181D] prose-em:text-[#5B6168] prose-blockquote:border-l-4 prose-blockquote:border-[#1F6F5C] prose-blockquote:bg-[#F0F7F5] prose-blockquote:rounded-r-xl prose-blockquote:px-5 prose-blockquote:py-4 prose-blockquote:not-italic prose-blockquote:text-[#33363C] prose-ul:text-[#33363C] prose-ol:text-[#33363C] prose-li:leading-[1.8] prose-li:marker:text-[#1F6F5C] prose-img:rounded-2xl prose-img:shadow-md prose-code:text-[#15181D] prose-code:bg-[#E9EDE9] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-[#15181D] prose-pre:rounded-2xl prose-pre:shadow-xl prose-hr:border-[#E2E4E0] prose-hr:my-10 prose-table:border-collapse prose-th:bg-[#F0F7F5] prose-th:text-[#15181D] prose-th:font-semibold prose-th:px-4 prose-th:py-2.5 prose-td:px-4 prose-td:py-2.5 prose-td:border-b prose-td:border-[#E2E4E0] prose-td:text-[#33363C] [&>p:first-of-type]:first-letter:text-6xl [&>p:first-of-type]:first-letter:font-serif [&>p:first-of-type]:first-letter:font-bold [&>p:first-of-type]:first-letter:text-[#1F6F5C] [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-2 [&>p:first-of-type]:first-letter:mt-1 [&>p:first-of-type]:first-letter:leading-[0.85]"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* FAQ */}
              {faqs.length > 0 && (
                <section className="mt-16">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1F6F5C]" />
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1F6F5C]">
                      FAQ
                    </p>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#15181D] mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="divide-y divide-[#E2E4E0] rounded-2xl border border-[#E2E4E0] bg-white overflow-hidden">
                    {faqs.map((faq, i) => (
                      <details key={i} className="group">
                        <summary className="flex items-start justify-between gap-4 cursor-pointer select-none px-6 py-5 text-[#15181D] font-semibold hover:bg-[#F5F6F4] transition-colors">
                          <span className="flex items-start gap-3">
                            <span className="mt-0.5 shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#E8F4F1] text-xs font-bold text-[#1F6F5C]">
                              {i + 1}
                            </span>
                            {faq.q}
                          </span>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="shrink-0 mt-0.5 text-[#9CA3AF] transition-transform group-open:rotate-180"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </summary>
                        <div className="px-6 pb-5 pt-1">
                          <p className="text-[#5B6168] leading-relaxed pl-9">
                            {faq.a}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* Likes bar */}
              <div className="mt-12 pt-8 border-t border-[#E2E4E0] flex items-center gap-4">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-[#E2E4E0] bg-white px-5 py-2.5 text-sm font-semibold text-[#15181D] shadow-sm">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={likeCount > 0 ? "#1F6F5C" : "none"}
                    stroke="#1F6F5C"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span>
                    {likeCount} {likeCount === 1 ? "like" : "likes"}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-[#E2E4E0] bg-white px-5 py-2.5 text-sm font-semibold text-[#15181D] shadow-sm">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1F6F5C"
                    strokeWidth="2"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>
                    {commentCount} {commentCount === 1 ? "comment" : "comments"}
                  </span>
                </div>
              </div>

              {/* Bottom Tags */}
              {tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-[#E2E4E0]">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9CA3AF] mb-3">
                    Tagged
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <a
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="inline-flex items-center gap-1 rounded-full border border-[#E2E4E0] px-3.5 py-1.5 text-xs font-semibold text-[#5B6168] hover:bg-[#1F6F5C] hover:border-[#1F6F5C] hover:text-white transition-all"
                      >
                        <span className="opacity-60">#</span>
                        {tag}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Comments Section ── */}
              <section className="mt-14">
                <div className="flex items-center gap-2 mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1F6F5C]" />
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1F6F5C]">
                    Discussion
                  </p>
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#15181D] mb-6">
                  Comments{" "}
                  <span className="text-base font-normal text-[#9CA3AF]">
                    ({commentCount})
                  </span>
                </h2>

                {comments.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[#E2E4E0] bg-[#F5F6F4] px-6 py-10 text-center">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C9D5D2"
                      strokeWidth="1.5"
                      className="mx-auto mb-3"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <p className="text-sm font-medium text-[#9CA3AF]">
                      No comments yet
                    </p>
                    <p className="text-xs text-[#C9D5D2] mt-1">
                      Be the first to share your thoughts.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment, i) => {
                      const commentDate = formatDate(comment.createdAt);
                      const name = comment.displayName || "Anonymous";
                      const body = comment.text || "";

                      return (
                        <div
                          key={comment.id || i}
                          className="rounded-2xl border border-[#E2E4E0] bg-white p-5 transition-shadow hover:shadow-sm"
                        >
                          <div className="flex items-start gap-3 mb-3">
                            {comment.avatar ? (
                              <div className="relative h-9 w-9 rounded-full overflow-hidden shrink-0 ring-2 ring-[#E8F4F1]">
                                <Image
                                  src={comment.avatar}
                                  alt={name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#15181D] text-sm font-bold text-[#F5F6F4]">
                                {name.trim()[0]?.toUpperCase() || "?"}
                              </span>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-[#15181D] leading-tight">
                                {name}
                              </p>
                              {commentDate && (
                                <time className="text-xs text-[#9CA3AF]">
                                  {commentDate}
                                </time>
                              )}
                            </div>
                          </div>
                          {body && (
                            <p className="text-sm text-[#33363C] leading-relaxed pl-12">
                              {body}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* Author Bio */}
              {authorDisplayName && (
                <div className="mt-12 rounded-2xl border border-[#E2E4E0] bg-white overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-[#1F6F5C] to-[#34D399]" />
                  <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:items-start">
                    <div className="shrink-0">
                      {blog.authorAvatar ? (
                        <div className="relative h-20 w-20 rounded-full overflow-hidden ring-4 ring-[#E8F4F1]">
                          <Image
                            src={blog.authorAvatar}
                            alt={authorDisplayName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#15181D] text-2xl font-bold text-[#F5F6F4] ring-4 ring-[#E8F4F1]">
                          {authorInitial || "?"}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1F6F5C] mb-1">
                        Written by
                      </p>
                      <p className="text-xl font-serif font-bold text-[#15181D]">
                        {authorDisplayName}
                      </p>
                      <p className="mt-2 text-sm text-[#5B6168] leading-relaxed">
                        {blog.authorBio ||
                          `${authorDisplayName} writes about ${
                            blog.category
                              ? blog.category.toLowerCase()
                              : "the topics covered on this blog"
                          }, sharing practical insights for readers.`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer nav */}
              <div className="mt-12 pt-8 border-t border-[#E2E4E0] flex items-center justify-between">
                <a
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#15181D] hover:text-[#1F6F5C] transition-colors"
                >
                  ← Back to all posts
                </a>
                {publishedDate && (
                  <p className="text-xs text-[#9CA3AF]">
                    Published {publishedDate}
                  </p>
                )}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-6 space-y-14">
                {toc.length > 0 && (
                  <div className="rounded-2xl border border-[#E2E4E0] bg-white p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={accent}
                        strokeWidth="2.2"
                      >
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="15" y2="12" />
                        <line x1="3" y1="18" x2="18" y2="18" />
                      </svg>
                      <p className="text-[16px] font-bold uppercase tracking-[0.18em] text-[#5B6168]">
                        On this page
                      </p>
                    </div>
                    <nav aria-label="Table of contents">
                      <ul className="space-y-0.5 border-l-2 border-[#E2E4E0]">
                        {toc.map((item) => (
                          <li key={item.id}>
                            <a
                              href={`#${item.id}`}
                              className={`flex items-baseline gap-2 -ml-px border-l-2 border-transparent py-1.5 text-sm text-[#5B6168] hover:text-[#15181D] hover:border-[#1F6F5C] transition-colors ${
                                item.level === 3 ? "pl-7" : "pl-4"
                              }`}
                            >
                              <span className="shrink-0 text-[11px] font-bold tabular-nums text-[#1F6F5C]">
                                {item.number}
                              </span>
                              <span className="leading-snug">{item.text}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                )}

                <div className="rounded-2xl border border-[#E2E4E0] bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5B6168] mb-4">
                    Article info
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#9CA3AF]">Reading time</span>
                      <span className="font-semibold text-[#15181D]">
                        {readingTime} min
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#9CA3AF]">Word count</span>
                      <span className="font-semibold text-[#15181D]">
                        {wordCount.toLocaleString()}
                      </span>
                    </div>
                    {toc.length > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#9CA3AF]">Sections</span>
                        <span className="font-semibold text-[#15181D]">
                          {toc.filter((t) => t.level === 2).length}
                        </span>
                      </div>
                    )}
                    {publishedDate && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#9CA3AF]">Published</span>
                        <span className="font-semibold text-[#15181D]">
                          {publishedDate}
                        </span>
                      </div>
                    )}
                    {blog.category && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#9CA3AF]">Category</span>
                        <span className="inline-flex items-center rounded-full bg-[#E8F4F1] px-2.5 py-0.5 text-xs font-semibold text-[#1F6F5C]">
                          {blog.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {tags.length > 0 && (
                  <div className="rounded-2xl border border-[#E2E4E0] bg-white p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5B6168] mb-4">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <a
                          key={tag}
                          href={`/blog?tag=${encodeURIComponent(tag)}`}
                          className="inline-flex items-center gap-0.5 rounded-full border border-[#E2E4E0] px-2.5 py-1 text-xs font-medium text-[#5B6168] hover:bg-[#1F6F5C] hover:border-[#1F6F5C] hover:text-white transition-all"
                        >
                          <span className="opacity-60">#</span>
                          {tag}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <section className="mt-20 pt-16 border-t border-[#E2E4E0]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1F6F5C]" />
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#1F6F5C]">
                      Keep Reading
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#15181D]">
                    You might also enjoy
                  </h2>
                </div>
                <a
                  href="/blog"
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F6F5C] hover:text-[#15181D] transition-colors"
                >
                  View all posts
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6.5 4L10.5 8l-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((r) => {
                  const rReadingTime = getReadingTime(r.content || "");
                  const rDate = formatDate(r.publishedAt || r.createdAt);
                  return (
                    <a
                      key={r.id || r.slug}
                      href={`/blog/${r.slug}`}
                      className="group flex flex-col rounded-2xl border border-[#E2E4E0] bg-white overflow-hidden hover:shadow-lg hover:border-[#C9D5D2] transition-all duration-300"
                    >
                      {r.coverImage ? (
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#E9EDE9]">
                          <Image
                            src={r.coverImage}
                            alt={r.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-500"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] bg-gradient-to-br from-[#E8F4F1] to-[#D1ECE5] flex items-center justify-center">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#1F6F5C"
                            strokeWidth="1.2"
                            opacity="0.5"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                          </svg>
                        </div>
                      )}
                      <div className="flex flex-col flex-1 p-5">
                        {r.category && (
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F6F5C] mb-2">
                            {r.category}
                          </span>
                        )}
                        <h3 className="font-serif text-base font-bold text-[#15181D] leading-snug line-clamp-2 group-hover:text-[#1F6F5C] transition-colors mb-2 flex-1">
                          {r.title}
                        </h3>
                        {(r.excerpt || r.metaDescription) && (
                          <p className="text-xs text-[#5B6168] line-clamp-2 leading-relaxed mb-4">
                            {r.excerpt || r.metaDescription}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs text-[#9CA3AF] mt-auto pt-3 border-t border-[#F0F1EF]">
                          {rDate && <time>{rDate}</time>}
                          <span className="ml-auto">
                            {rReadingTime} min read
                          </span>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
