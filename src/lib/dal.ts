
import 'server-only'

import { cache } from 'react'
import { verifySession } from './session'
import { prisma } from './db'


export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
    })
    return user
  } catch (error) {
    console.error('Failed to fetch user', error)
    return null
  }
})
