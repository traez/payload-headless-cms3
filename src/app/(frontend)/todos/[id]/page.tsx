import config from '@/payload.config'
import { getPayload } from 'payload'
import Image from 'next/image'
import { Media } from '@/payload-types'
import Link from 'next/link'

export default async function pageTodoId({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const todo = await payload.findByID({
    collection: 'todos',
    id: id,
  })

  const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/todos/${id}`)
  const todoREST = await response.json()
  console.log(todoREST)

  /* 
  You could either use Payload API or Rest API
  
  Payload API (Direct) is the preferred approach for server-side operations, offering better performance without HTTP overhead, access to complex queries, and the ability to bypass API restrictions when needed. This method is ideal when working with server components where direct database access makes more sense than making additional network requests.

  REST API is best suited for client-side code, maintaining a clear separation between frontend and backend while ensuring consistent access control across all API consumers. This approach creates uniformity in how your application interacts with data, treating internal and external requests with the same rules and constraints.
  */

  return (
    <section className="min-w-[320px] max-w-[1400px] mx-auto px-4 py-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="mb-6">
        <Link href="/" className="text-blue-500 hover:underline flex items-center gap-2">
          <span>←</span> Back to todos
        </Link>
      </div>

      <article className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{todo.title}</h1>

        {todo.description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4">{todo.description}</p>
        )}

        <p
          className={`mb-4 inline-block py-1 px-3 rounded-full text-sm ${
            todo.completed
              ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
          }`}
        >
          {todo.completed ? 'Completed' : 'Not Completed'}
        </p>

        {todo.media ? (
          <div className="my-6 flex justify-center">
            <div className="relative max-h-[300px]">
              <Image
                src={(todo.media as Media).url!}
                alt={(todo.media as Media).alt ?? todo.title}
                width={(todo.media as Media).width ?? 0}
                height={(todo.media as Media).height ?? 0}
                className="object-contain max-h-[300px]"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-[200px] my-6 bg-gray-100 dark:bg-gray-600 rounded">
            <p className="text-sm text-gray-500 dark:text-gray-400">No media</p>
          </div>
        )}

        <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 border-t pt-4">
          <p className="mb-1">Created: {new Date(todo.createdAt).toLocaleString()}</p>
          <p>Updated: {new Date(todo.updatedAt).toLocaleString()}</p>
        </div>
      </article>
    </section>
  )
}

