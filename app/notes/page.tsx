import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allNotes } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({ title: 'Notes' })

export default async function NotesPage() {
  const notes = allCoreContent(sortPosts(allNotes))

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Notes
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Learning notes and quick thoughts
        </p>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!notes.length && 'No notes found.'}
        {notes.map((note) => {
          const { slug, date, title, summary, tags } = note
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
                  <Link href={`/notes/${slug}`} className="text-gray-900 dark:text-gray-100">
                    {title}
                  </Link>
                </h2>
                <div className="flex flex-wrap">
                  {tags?.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
                {summary && (
                  <div className="prose max-w-none text-sm text-gray-500 dark:text-gray-400">
                    {summary}
                  </div>
                )}
              </article>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
