import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Block /features-demo in production — dev showcase only
    if (pathname.startsWith('/features-demo') && process.env.NODE_ENV !== 'development') {
        return new NextResponse(null, { status: 404 })
    }

    // Protect /tools/builder — require authentication
    if (pathname.startsWith('/tools/builder')) {
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() { return request.cookies.getAll() },
                    setAll() {},
                },
            }
        )
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            const loginUrl = request.nextUrl.clone()
            loginUrl.pathname = '/login'
            return NextResponse.redirect(loginUrl)
        }
    }

    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
