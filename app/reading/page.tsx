import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allReadings } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({ title: 'Reading' })

export default async function ReadingPage() {
  const readings = allCoreContent(sortPosts(allReadings))

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Reading
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">Book reviews and notes</p>
      </div>
      <div className="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3">
        {!readings.length && <p>No books found.</p>}
        {readings.map((reading) => {
          const { slug, date, title, summary, cover, author, rating } = reading as any
          return (
            <article
              key={slug}
              className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
            >
              {cover && (
                <Link href={`/reading/${slug}`}>
                  <img src={cover} alt={title} className="h-48 w-full object-cover" />
                </Link>
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold">
                  <Link href={`/reading/${slug}`} className="text-gray-900 dark:text-gray-100">
                    {title}
                  </Link>
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {author}
                  {rating && ` · ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}`}
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{summary}</p>
                <p className="mt-2 text-xs text-gray-400">
                  {formatDate(date, siteMetadata.locale)}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
