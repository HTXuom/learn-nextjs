"use client";

import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

interface CartItem {
  id: string;
  name: string;
  price: number;
  sellingPrice?: number;
  quantity: number;
  avatar: string;
}

interface CartItemListProps {
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
}

const CartItemList: React.FC<CartItemListProps> = ({ cartItems, onRemoveItem }) => {
  const router = useRouter();
  const { t } = useTranslation();

  // Tính toán subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const itemTotal = (item.sellingPrice ?? item.price) * item.quantity;
    return total + itemTotal;
  }, 0);

  const handleCheckout = () => {
    // Lưu giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Điều hướng đến trang checkout
    router.push('/checkout');
  };

  return (
    <div className="p-4">
      <div>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="flex justify-between items-center p-2 mb-5 border-b border-gray-200" key={item.id}>
              <div className="flex gap-4 items-center">
                <Image
                  src={item.avatar}
                  alt={`${item.name} image`}
                  width={80}
                  height={80}
                  objectFit="cover" 
                  className="border rounded"
                />
                <div>
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p>{t('quantity')}: {item.quantity}</p>
                  <p className="text-lg font-bold">
                    ${((item.sellingPrice ?? item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              <TrashIcon className="w-6 h-6 text-red-500 cursor-pointer" onClick={() => onRemoveItem(item.id)} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">{t('your_cart_is_empty')}</p>
        )}
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-bold flex justify-between">
          {t('subtotal')} <span>${subtotal.toFixed(2)}</span>
        </h2>
        <Button className="bg-teal-500 text-white mt-4 text-lg" onClick={handleCheckout}>
          {t('checkout')}
        </Button>
      </div>
    </div>
  );
};

export default CartItemList;
