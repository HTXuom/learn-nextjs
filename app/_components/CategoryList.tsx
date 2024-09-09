import { Divide } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function CategoryList({ categoryList }) {
    if (!categoryList || categoryList.length === 0) {
        return <p>No categories available.</p>;
    }

    return (
        <div className='mt-5'>
            <h2 className='text-green-600 font-bold text-2xl'>Shop by Category</h2>
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2'>
                {categoryList.map((category, index) => (
                    <Link
                        key={index}
                        href={'/products-category/' + category.attributes.name}
                        passHref
                    >
                        <a className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200'>
                            <Image
                                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category.attributes.icon.data.attributes.url}
                                width={50}
                                height={50}
                                alt='icon'
                                className='group-hover:scale-125 transition-all'
                                priority
                            />
                            <h2 className='text-green-800'>{category.attributes.name}</h2>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CategoryList;
