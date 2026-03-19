import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import {
  allBlogs,
  allReadings,
  allNotes,
  allPhotographies,
  allTravels,
  allEnglishes,
} from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const readings = allCoreContent(sortPosts(allReadings))
  const notes = allCoreContent(sortPosts(allNotes))
  const photos = allCoreContent(sortPosts(allPhotographies))
  const travels = allCoreContent(sortPosts(allTravels))
  const englishRecords = allCoreContent(sortPosts(allEnglishes))

  return (
    <Main
      posts={posts}
      readings={readings}
      notes={notes}
      photos={photos}
      travels={travels}
      englishRecords={englishRecords}
    />
  )
}
