import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allTravels } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({ title: 'Travel' })

export default async function TravelPage() {
  const travels = allCoreContent(sortPosts(allTravels))

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Travel
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Stories from places I have been
        </p>
      </div>
      <div className="grid gap-6 pt-8 sm:grid-cols-2">
        {!travels.length && <p>No travel posts found.</p>}
        {travels.map((travel) => {
          const { slug, date, title, summary, cover, location } = travel as any
          return (
            <article
              key={slug}
              className="group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
            >
              {cover && (
                <Link href={`/travel/${slug}`}>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={cover}
                      alt={title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
              )}
              <div className="p-5">
                <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  {location && <span>{location}</span>}
                  <span>·</span>
                  <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                </div>
                <h2 className="text-xl font-bold">
                  <Link href={`/travel/${slug}`} className="text-gray-900 dark:text-gray-100">
                    {title}
                  </Link>
                </h2>
                {summary && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{summary}</p>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
