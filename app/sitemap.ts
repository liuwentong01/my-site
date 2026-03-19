import { MetadataRoute } from 'next'
import {
  allBlogs,
  allReadings,
  allNotes,
  allPhotographies,
  allTravels,
  allEnglishes,
} from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const readingRoutes = allReadings
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.date,
    }))

  const noteRoutes = allNotes
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.date,
    }))

  const photoRoutes = allPhotographies
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.date,
    }))

  const travelRoutes = allTravels
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.date,
    }))

  const englishRoutes = allEnglishes
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.date,
    }))

  const routes = [
    '',
    'blog',
    'reading',
    'notes',
    'photography',
    'travel',
    'english',
    'tags',
    'about',
  ].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [
    ...routes,
    ...blogRoutes,
    ...readingRoutes,
    ...noteRoutes,
    ...photoRoutes,
    ...travelRoutes,
    ...englishRoutes,
  ]
}
