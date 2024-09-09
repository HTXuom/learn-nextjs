// middleware.ts

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

    // Nếu URL là trang thanh toán thành công, xóa tham số truy vấn
    if (url.pathname === '/payment-success') {
        url.search = ''; // Xóa tất cả các tham số truy vấn
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}
