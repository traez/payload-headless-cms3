import type { CollectionConfig } from 'payload'

export const Todos: CollectionConfig = {
  slug: 'todos',
  /*  unique identifier for the collection and will be used in API routes (e.g., /api/todos). */
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
    /*  Anyone can perform CRUD on todos. all functions return true, this collection has no access restrictions. */
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'completed',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      /* The line relationTo: 'media' indicates that the media field creates a relationship to another collection in your PayloadCMS setup called "media".
In PayloadCMS, the upload field type is used to handle file uploads, and it requires a relationship to a collection that stores those uploaded files. This is typically a collection specifically designed to store and manage media files. */
    },
    {
      name: 'createdAt',
      type: 'date',
      defaultValue: new Date(),
    },
    {
      name: 'updatedAt',
      type: 'date',
      defaultValue: new Date(),
    },
  ],
}
