import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 3

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between pt-8 pb-4">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <Link
        href={href}
        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium"
      >
        View all &rarr;
      </Link>
    </div>
  )
}

export default function Home({ posts, readings, notes, photos, travels, englishRecords }) {
  return (
    <>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Welcome
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          {siteMetadata.description}
        </p>
      </div>

      {/* Blog */}
      {posts.length > 0 && (
        <section>
          <SectionHeader title="Blog" href="/blog" />
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags } = post
              return (
                <li key={slug} className="py-6">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-3 xl:col-span-3">
                        <div>
                          <h3 className="text-xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h3>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {/* Reading */}
      {readings.length > 0 && (
        <section>
          <SectionHeader title="Reading" href="/reading" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {readings.slice(0, MAX_DISPLAY).map((reading) => {
              const { slug, title, author, rating, cover } = reading as any
              return (
                <Link key={slug} href={`/reading/${slug}`}>
                  <article className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    {cover && <img src={cover} alt={title} className="h-36 w-full object-cover" />}
                    <div className="p-3">
                      <h3 className="font-bold text-gray-900 dark:text-gray-100">{title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {author}
                        {rating && ` · ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}`}
                      </p>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Photography */}
      {photos.length > 0 && (
        <section>
          <SectionHeader title="Photography" href="/photography" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.slice(0, 6).map((photo) => {
              const { slug, title, cover } = photo as any
              return (
                <Link key={slug} href={`/photography/${slug}`} className="group">
                  <div className="relative aspect-4/3 overflow-hidden rounded-lg">
                    {cover && (
                      <img
                        src={cover}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="text-sm font-medium text-white">{title}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Travel */}
      {travels.length > 0 && (
        <section>
          <SectionHeader title="Travel" href="/travel" />
          <div className="grid gap-4 sm:grid-cols-2">
            {travels.slice(0, 2).map((travel) => {
              const { slug, title, summary, cover, location, date } = travel as any
              return (
                <Link key={slug} href={`/travel/${slug}`} className="group">
                  <article className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    {cover && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={cover}
                          alt={title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {location} · {formatDate(date, siteMetadata.locale)}
                      </div>
                      <h3 className="mt-1 font-bold text-gray-900 dark:text-gray-100">{title}</h3>
                      {summary && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{summary}</p>
                      )}
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Notes & English side by side */}
      <div className="grid gap-8 pt-8 sm:grid-cols-2">
        {/* Notes */}
        {notes.length > 0 && (
          <section>
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Notes
              </h2>
              <Link
                href="/notes"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium"
              >
                View all &rarr;
              </Link>
            </div>
            <ul className="space-y-3">
              {notes.slice(0, 5).map((note) => {
                const { slug, date, title } = note
                return (
                  <li key={slug} className="flex items-center justify-between">
                    <Link
                      href={`/notes/${slug}`}
                      className="hover:text-primary-500 truncate text-gray-900 dark:text-gray-100"
                    >
                      {title}
                    </Link>
                    <time
                      dateTime={date}
                      className="ml-4 shrink-0 text-sm text-gray-500 dark:text-gray-400"
                    >
                      {formatDate(date, siteMetadata.locale)}
                    </time>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {/* English */}
        {englishRecords.length > 0 && (
          <section>
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                English
              </h2>
              <Link
                href="/english"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium"
              >
                View all &rarr;
              </Link>
            </div>
            <ul className="space-y-3">
              {englishRecords.slice(0, 5).map((record) => {
                const { slug, date, title } = record
                return (
                  <li key={slug} className="flex items-center justify-between">
                    <Link
                      href={`/english/${slug}`}
                      className="hover:text-primary-500 truncate text-gray-900 dark:text-gray-100"
                    >
                      {title}
                    </Link>
                    <time
                      dateTime={date}
                      className="ml-4 shrink-0 text-sm text-gray-500 dark:text-gray-400"
                    >
                      {formatDate(date, siteMetadata.locale)}
                    </time>
                  </li>
                )
              })}
            </ul>
          </section>
        )}
      </div>
    </>
  )
}
