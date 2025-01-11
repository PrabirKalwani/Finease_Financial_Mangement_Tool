import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ success: true })
}

