import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPhotographies } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Photography' })

export default async function PhotographyPage() {
  const photos = allCoreContent(sortPosts(allPhotographies))

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Photography
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Moments captured through my lens
        </p>
      </div>
      <div className="grid gap-4 pt-8 sm:grid-cols-2 lg:grid-cols-3">
        {!photos.length && <p>No photos found.</p>}
        {photos.map((photo) => {
          const { slug, title, cover, location, camera } = photo as any
          return (
            <Link key={slug} href={`/photography/${slug}`} className="group">
              <article className="overflow-hidden rounded-lg">
                {cover && (
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      src={cover}
                      alt={title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="py-3">
                  <h2 className="font-bold text-gray-900 dark:text-gray-100">{title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {[location, camera].filter(Boolean).join(' · ')}
                  </p>
                </div>
              </article>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
