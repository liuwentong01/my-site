import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { allReadings } from 'contentlayer/generated'
import type { Reading } from 'contentlayer/generated'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const reading = allReadings.find((p) => p.slug === slug)
  if (!reading) return

  return {
    title: reading.title,
    description: reading.summary,
  }
}

export const generateStaticParams = async () => {
  return allReadings.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const reading = allReadings.find((p) => p.slug === slug) as Reading

  if (!reading) return notFound()

  const mainContent = coreContent(reading)
  const { title, author, rating, date } = mainContent as any

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <header className="pt-6 pb-6">
          <div className="space-y-1 text-center">
            <PageTitle>{title}</PageTitle>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              {author}
              {rating && ` · ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}`}
            </p>
            <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{new Date(date).toLocaleDateString(siteMetadata.locale)}</time>
            </dd>
          </div>
        </header>
        <div className="prose dark:prose-invert max-w-none pt-10 pb-8">
          <MDXLayoutRenderer code={reading.body.code} components={components} toc={reading.toc} />
        </div>
      </article>
    </SectionContainer>
  )
}
