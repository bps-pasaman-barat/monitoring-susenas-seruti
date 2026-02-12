'use server'

import { LoginFormSchema, FormState } from '@/lib/defenitions'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { createSession, deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function login(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { username, password } = validatedFields.data

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) {
    return {
      message: 'Invalid credentials',
    }
  }

  const passwordsMatch = await bcrypt.compare(password, user.password)

  if (!passwordsMatch) {
    return {
      message: 'Invalid credentials',
    }
  }

  await createSession(user.id, user.role)
  redirect('/')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
