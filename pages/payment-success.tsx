import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function PaymentSuccess() {
    const router = useRouter();

    useEffect(() => {
        // Sau khi thanh toán thành công, chuyển hướng đến trang chủ
        router.push('/');
    }, [router]);

    return (
        <div className='text-center p-4'>
            <h1 className='text-2xl font-bold'>Payment Successful</h1>
            <p>Redirecting to the home page...</p>
        </div>
    );
}

export default PaymentSuccess;
