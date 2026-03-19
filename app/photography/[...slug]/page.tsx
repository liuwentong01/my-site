import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { allPhotographies } from 'contentlayer/generated'
import type { Photography } from 'contentlayer/generated'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const photo = allPhotographies.find((p) => p.slug === slug)
  if (!photo) return

  return {
    title: photo.title,
    description: photo.summary,
  }
}

export const generateStaticParams = async () => {
  return allPhotographies.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const photo = allPhotographies.find((p) => p.slug === slug) as Photography

  if (!photo) return notFound()

  const mainContent = coreContent(photo)
  const { title, location, camera, lens, date } = mainContent as any

  return (
    <SectionContainer>
      <article>
        <header className="pt-6 pb-6">
          <div className="space-y-1 text-center">
            <PageTitle>{title}</PageTitle>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              {location && <span>{location}</span>}
              {camera && <span>{camera}</span>}
              {lens && <span>{lens}</span>}
              <time dateTime={date}>{new Date(date).toLocaleDateString(siteMetadata.locale)}</time>
            </div>
          </div>
        </header>
        <div className="prose dark:prose-invert max-w-none pt-10 pb-8">
          <MDXLayoutRenderer code={photo.body.code} components={components} toc={photo.toc} />
        </div>
      </article>
    </SectionContainer>
  )
}
