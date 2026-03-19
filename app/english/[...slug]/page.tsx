import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allEnglishes } from 'contentlayer/generated'
import type { English } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const record = allEnglishes.find((p) => p.slug === slug)
  if (!record) return

  return {
    title: record.title,
    description: record.summary,
  }
}

export const generateStaticParams = async () => {
  return allEnglishes.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const sortedRecords = allCoreContent(sortPosts(allEnglishes))
  const recordIndex = sortedRecords.findIndex((p) => p.slug === slug)
  if (recordIndex === -1) return notFound()

  const prev = sortedRecords[recordIndex + 1]
  const next = sortedRecords[recordIndex - 1]
  const record = allEnglishes.find((p) => p.slug === slug) as English
  const mainContent = coreContent(record)

  return (
    <PostSimple content={mainContent} next={next} prev={prev}>
      <MDXLayoutRenderer code={record.body.code} components={components} toc={record.toc} />
    </PostSimple>
  )
}
