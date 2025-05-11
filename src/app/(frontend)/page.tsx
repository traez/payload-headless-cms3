import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Media } from '@/payload-types'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const todos = await payload.find({
    collection: 'todos',
    limit: 100,
  })

  return (
    <section className="min-w-[320px] max-w-[1400px] mx-auto px-4 py-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Payload To Do List
        {user?.email ? (
          <span className="text-blue-500"> ({user.email})</span>
        ) : (
          <span className="text-gray-500"> (Not logged in)</span>
        )}
      </h2>
      <article className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {todos.docs.map((todo) => (
          <Link
            href={`/todos/${todo.id}`}
            key={todo.id}
            className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {todo.title}
            </h3>
            {todo.description && (
              <p className="text-gray-600 dark:text-gray-300 mb-3">{todo.description}</p>
            )}
            <p
              className={`mb-2 inline-block py-1 px-2 rounded-full text-sm ${todo.completed ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'}`}
            >
              {todo.completed ? 'Completed' : 'Not Completed'}
            </p>
            {todo.media ? (
              <div className="relative w-[100px] h-[100px] my-4">
                <Image
                  src={`${(todo.media as Media)?.url}`}
                  alt={todo.title}
                  fill
                  sizes="100px"
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-[100px] h-[100px] my-4 bg-gray-100 dark:bg-gray-600 rounded">
                <p className="text-sm text-gray-500 dark:text-gray-400">No media</p>
              </div>
            )}
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              <p>Created: {new Date(todo.createdAt).toLocaleString()}</p>
              <p>Updated: {new Date(todo.updatedAt).toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </article>
      {todos.docs.length === 0 && (
        <p className="text-center py-8 text-gray-500 dark:text-gray-400">
          No todo items found. Create your first one!
        </p>
      )}
    </section>
  )
}
