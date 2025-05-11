import CreateForm from '@/components/CreateForm'

export default function pageCreate() {
  return (
    <div className="flex justify-center items-center h-full px-4 py-8">
      <div className="w-full max-w-md mx-auto bg-card rounded-lg shadow-sm p-6 border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Todo</h1>
        <CreateForm />
      </div>
    </div>
  )
}
