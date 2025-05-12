import CreateForm from '@/components/CreateForm'

export default function pageCreate() {
  return (
    <div className="w-full min-h-[calc(100vh-84px)] bg-[#78A9F6]">
      <section className="min-w-[320px] max-w-[1400px] min-h-[calc(100vh-84px)] mx-auto px-4 py-8 bg-white dark:bg-gray-800  shadow-md">
        <div className="w-full max-w-md mx-auto bg-card rounded-lg shadow-sm p-6 border border-gray-200">
          <h1 className="text-2xl font-bold mb-6 text-center">Create Todo</h1>
          <CreateForm />
        </div>
      </section>
    </div>
  )
}
