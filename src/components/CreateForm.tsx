'use client'
import { createTodo } from '@/lib/actions'
import Link from 'next/link'
import { useState, ChangeEvent, useTransition } from 'react'

export default function CreateForm() {
  const [fileError, setFileError] = useState('')
  const [fileName, setFileName] = useState('')
  const [isFileValid, setIsFileValid] = useState(true)
  const [isPending, startTransition] = useTransition()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const maxSize = 50 * 1024 // 50KB

      if (file.size > maxSize) {
        setFileError('File size exceeds 50KB limit. Please choose a smaller file.')
        setIsFileValid(false)
      } else {
        setFileError('')
        setIsFileValid(true)
      }
    } else {
      setFileName('')
      setIsFileValid(true)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await createTodo(formData)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Title Field */}
      <div className="flex flex-col gap-2.5 mb-4">
        <label htmlFor="title" className="font-medium">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>

      {/* Description Field */}
      <div className="flex flex-col gap-2.5 mb-4">
        <label htmlFor="description" className="font-medium">
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>

      {/* Completed Checkbox */}
      <div className="flex flex-row items-center gap-2.5 mb-4">
        <label htmlFor="completed" className="font-medium">
          Completed
        </label>
        <input
          type="checkbox"
          name="completed"
          id="completed"
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
      </div>

      {/* Media Upload */}
      <div className="flex flex-col gap-2.5 mb-4">
        <label htmlFor="media" className="font-medium flex items-center gap-2">
          <span>Media</span>
          <span className="text-xs text-gray-500">(Max 50KB)</span>
        </label>
        <div className="relative">
          <input
            type="file"
            name="media"
            id="media"
            className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
            onChange={handleFileChange}
          />
          {fileName && (
            <div className={`mt-2 text-sm ${fileError ? 'text-red-500' : 'text-gray-600'}`}>
              Selected: {fileName}
              {fileError && ' (Too large)'}
            </div>
          )}
        </div>
        {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}
        <input type="hidden" name="isFileValid" value={String(isFileValid)} />
      </div>

      {/* Form Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          type="submit"
          disabled={!isFileValid || isPending}
          className={`flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 hover:shadow-md transition-all duration-200 border border-primary-dark ${
            !isFileValid || isPending ? 'opacity-50 cursor-not-allowed' : ''
          } flex items-center justify-center gap-2`}
        >
          {isPending && (
            <span className="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-white rounded-full"></span>
          )}
          {isPending ? 'Creating...' : 'Create'}
        </button>
        <Link
          href="/"
          className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors text-center border border-gray-300"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}
