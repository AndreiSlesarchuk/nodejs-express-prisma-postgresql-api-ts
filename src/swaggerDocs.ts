export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Task Manager API',
    version: '1.0.0',
    description: 'REST API with Node.js, Express and Prisma',
  },
  servers: [{ url: 'http://localhost:3000', description: 'Development server' }],
  components: {
    schemas: {
      Task: {
        type: 'object',
        required: ['title'],
        properties: {
          id: { type: 'integer', example: 1 },
          title: { type: 'string', example: 'Buy milk' },
          description: { type: 'string', example: 'Go to the store' },
          completed: { type: 'boolean', example: false },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
  paths: {
    '/api/tasks': {
      get: {
        summary: 'Get all tasks',
        tags: ['Tasks'],
        responses: {
          200: {
            description: 'Success',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Task' } } } },
          },
        },
      },
      post: {
        summary: 'Create a new task',
        tags: ['Tasks'],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } },
        },
        responses: {
          201: { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } } },
        },
      },
    },
    '/api/tasks/{id}': {
      get: {
        summary: 'Get task by ID',
        tags: ['Tasks'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } } },
          404: { description: 'Task not found' },
        },
      },
      patch: {
        summary: 'Update a task',
        tags: ['Tasks'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: { 'application/json': { schema: { type: 'object', properties: { title: { type: 'string' }, description: { type: 'string' }, completed: { type: 'boolean' } } } } },
        },
        responses: { 200: { description: 'Updated' } },
      },
      delete: {
        summary: 'Delete a task',
        tags: ['Tasks'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 204: { description: 'Deleted' } },
      },
    },
  },
};