export const ROUTES = {
  INDEX: '/',
  ADMIN: {
    INDEX: '/admin',
    LOGIN: '/admin/login',
    APPLICATIONS: '/admin/applications',
    ID: {
      NAME: '/admin/:id',
      GET: (id: string) => `/admin/${id}`,
    },
  },
} as const
