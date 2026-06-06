import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles, type Article } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'MedTech Review — Independent Medical Technology Reviews',
  description:
    'Evidence-based, independent reviews of medical technology, devices, and health products trusted by patients and professionals.',
}

export default function HomePage() {
  const articles = getAllArticles()

  return (
    <>
      <HeroSection />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900">Latest Reviews</h2>
          <span className="text-sm text-gray-400">{articles.length} reviews published</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
      <TrustBanner />
    </>
  )
}

function HeroSection() {
  return (
    <section className="bg-blue-950 text-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block text-xs font-medium text-blue-300 border border-blue-800 bg-blue-900/40 px-3 py-1 rounded-full mb-5">
          Independent · Evidence-Based · Unsponsored
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-5 leading-tight">
          Medical Technology
          <br />
          You Can Trust
        </h1>
        <p className="text-lg text-blue-200 max-w-xl mx-auto leading-relaxed">
          In-depth reviews and comparisons of medical devices, health technology, and therapeutic
          equipment — written for patients and professionals.
        </p>
      </div>
    </section>
  )
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/${article.slug}`}
      className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden
        hover:shadow-md hover:border-blue-200 transition-all duration-200"
    >
      <div className="h-1.5 w-full bg-blue-600" />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
            {article.category}
          </span>
          {article.verified && <span className="badge-verified">✓ Verified</span>}
        </div>
        <h3
          className="font-serif text-gray-900 font-bold text-lg mb-2 leading-snug
            group-hover:text-blue-700 transition-colors"
        >
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 flex-1 mb-4 line-clamp-3">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-3 mt-auto">
          <span>{article.readingTime} min read</span>
          <span>
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </Link>
  )
}

function TrustBanner() {
  const stats = [
    { value: '500+', label: 'Products Reviewed' },
    { value: '12', label: 'Medical Advisors' },
    { value: '100%', label: 'Independent' },
  ]

  return (
    <section className="bg-gray-50 border-y border-gray-200 py-12 px-4">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-12">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-serif font-bold text-blue-900">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
