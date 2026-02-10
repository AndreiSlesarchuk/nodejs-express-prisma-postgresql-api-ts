export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Task Manager API',
    version: '1.0.0',
    description: 'REST API with Node.js, Express, Prisma and JWT Authentication',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      // --- User Schemas ---
      RegisterRequest: {
        type: 'object',
        required: ['username', 'email', 'password'],
        properties: {
          username: { type: 'string', example: 'john_doe' },
          email: { type: 'string', example: 'john@example.com' },
          password: { type: 'string', example: 'securePassword123' },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string', example: 'john_doe' },
          password: { type: 'string', example: 'securePassword123' },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Success' },
          accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1Ni...' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              username: { type: 'string' },
              email: { type: 'string' },
            },
          },
        },
      },
      // --- Task Schemas ---
      Task: {
        type: 'object',
        required: ['title'],
        properties: {
          id: { type: 'integer', example: 1 },
          title: { type: 'string', example: 'Refactor API' },
          description: { type: 'string', example: 'Update Swagger and Zod schemas' },
          completed: { type: 'boolean', example: false },
          authorId: { type: 'integer', example: 5 },
          assignees: {
            type: 'array',
            items: { type: 'integer' },
            description: 'Array of User IDs assigned to this task',
          },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
  // Apply authentication globally by default
  security: [{ bearerAuth: [] }],
  paths: {
    // --- Auth Routes ---
    '/api/auth/register': {
      post: {
        summary: 'Register a new user',
        tags: ['Auth'],
        security: [], // Public
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/RegisterRequest' } },
          },
        },
        responses: {
          201: { description: 'User created successfully' },
          400: { description: 'Validation error' },
          409: { description: 'User already exists' },
        },
      },
    },
    '/api/auth/login': {
      post: {
        summary: 'Login to get access token',
        tags: ['Auth'],
        security: [], // Public
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } },
          },
        },
        responses: {
          200: {
            description: 'Login successful',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } },
            },
          },
          401: { description: 'Invalid credentials' },
        },
      },
    },
    // --- Task Routes ---
    '/api/tasks': {
      get: {
        summary: 'Get all tasks',
        tags: ['Tasks'],
        responses: {
          200: {
            description: 'List of tasks',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Task' } },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new task',
        tags: ['Tasks'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title'],
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  assignees: { type: 'array', items: { type: 'integer' } },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Task created',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Task' } },
            },
          },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/api/tasks/{id}': {
      get: {
        summary: 'Get task by ID',
        tags: ['Tasks'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: {
            description: 'Task details',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Task' } },
            },
          },
          404: { description: 'Task not found' },
        },
      },
      patch: {
        summary: 'Update a task',
        tags: ['Tasks'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  completed: { type: 'boolean' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Task updated' },
          404: { description: 'Task not found' },
        },
      },
      delete: {
        summary: 'Delete a task',
        tags: ['Tasks'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          204: { description: 'Task deleted' },
          403: { description: 'Forbidden - Not your task' },
        },
      },
    },
    // --- System Routes ---
    '/api/health': {
      get: {
        summary: 'Health check',
        tags: ['System'],
        security: [],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string' },
                    timestamp: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};