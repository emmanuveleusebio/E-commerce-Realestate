import { NextRequest, NextResponse } from 'next/server';

export async function POST(NextRequest) {
  try {
    const response = NextResponse.json({ message: 'Logged out successfully' });

    // Clear the cookie by setting its expiration to the past
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV_R === 'production',
      maxAge: -1,
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
