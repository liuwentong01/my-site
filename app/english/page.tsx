import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allEnglishes } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({ title: 'English' })

export default async function EnglishPage() {
  const records = allCoreContent(sortPosts(allEnglishes))

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          English
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Daily English learning records
        </p>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!records.length && 'No records found.'}
        {records.map((record) => {
          const { slug, date, title, summary, words } = record as any
          return (
            <li key={slug} className="py-5">
              <article className="flex flex-col space-y-2">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-sm leading-6 font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                  </dd>
                </dl>
                <h2 className="text-xl leading-8 font-bold tracking-tight">
                  <Link href={`/english/${slug}`} className="text-gray-900 dark:text-gray-100">
                    {title}
                  </Link>
                </h2>
                {words && words.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {words.map((word: string) => (
                      <span
                        key={word}
                        className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                )}
                {summary && <p className="text-sm text-gray-500 dark:text-gray-400">{summary}</p>}
              </article>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
