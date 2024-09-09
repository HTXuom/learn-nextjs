"use client";
// app/page.tsx
import { Button } from "@/components/ui/button";
import { useEffect } from 'react';
import ProductList from './_components/ProductList';
import Slider from './_components/Slider';

export default function Home() {

  return (
    <div style={{ padding: '0 20px' }}>
      <Slider />
      <ProductList />
    </div>
  );
}
