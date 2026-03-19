import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allTravels } from 'contentlayer/generated'
import type { Travel } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const travel = allTravels.find((p) => p.slug === slug)
  if (!travel) return

  return {
    title: travel.title,
    description: travel.summary,
  }
}

export const generateStaticParams = async () => {
  return allTravels.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const sortedTravels = allCoreContent(sortPosts(allTravels))
  const travelIndex = sortedTravels.findIndex((p) => p.slug === slug)
  if (travelIndex === -1) return notFound()

  const prev = sortedTravels[travelIndex + 1]
  const next = sortedTravels[travelIndex - 1]
  const travel = allTravels.find((p) => p.slug === slug) as Travel
  const mainContent = coreContent(travel)

  return (
    <PostSimple content={mainContent} next={next} prev={prev}>
      <MDXLayoutRenderer code={travel.body.code} components={components} toc={travel.toc} />
    </PostSimple>
  )
}
