'use server'
import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createTodo(formData: FormData): Promise<void> {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const completed = formData.get('completed') ? true : false
  const media = formData.get('media') as File

  const payload = await getPayload({ config: payloadConfig })

  let mediaId = null

  // Only process media if a file was actually selected
  if (media && media.size > 0) {
    const mediaFormData = new FormData()
    mediaFormData.append('file', media)
    mediaFormData.append(
      '_payload',
      JSON.stringify({
        alt: 'ALT: ' + title,
      }),
    )

    try {
      const mediaResponse = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/media`, {
        method: 'POST',
        body: mediaFormData,
      })

      const mediaData = await mediaResponse.json()
      if (mediaData?.doc?.id) {
        mediaId = mediaData.doc.id
      }
    } catch (error) {
      console.error('Media upload failed:', error)
      // Continue without media if upload fails
    }
  }

  await payload.create({
    collection: 'todos',
    data: {
      title,
      description,
      completed,
      media: mediaId, // This will be null if no media was uploaded
    },
  })

  revalidatePath('/')
  redirect('/')
}
