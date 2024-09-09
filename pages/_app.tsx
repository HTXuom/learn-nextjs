import '../styles/globals.css'; // Đảm bảo rằng file CSS toàn cục được nhập
import '@/app/i18n/i18n'; // Đảm bảo import cấu hình i18n
import type { AppProps } from 'next/app';
import { CartProvider } from '@/app/_contexts/CartContext'; // Đảm bảo đường dẫn đúng
import { ProfileProvider } from '@/app/_contexts/ProfileContext'; // Thêm ProfileContext

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CartProvider>
            <ProfileProvider> {/* Bọc toàn bộ ứng dụng với ProfileProvider */}
                <Component {...pageProps} />
            </ProfileProvider>
        </CartProvider>
    );
}

export default MyApp;
