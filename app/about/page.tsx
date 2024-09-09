import Image from 'next/image';
import React from 'react';

function About() {
    return (
      <div className='mt-6'>
      <section className="py-14 lg:py-24 relative z-0 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
                    <h1
                        className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl md:leading-normal">
                        Discover the Freshest Fruits with Our <span className="text-teal-600">Online Fruit Garden</span>
                    </h1>
          </div>
            </section>
            <section className="py-14 lg:py-24 relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
                        <div className="img-box">
                            <Image src="/image.jpg" alt="About Image"
                                width={500}
                                height={500}
                                className="max-lg:mx-auto"/>
                        </div>
                        <div className="lg:pl-[100px] flex items-center">
                            <div className="data w-full">
                                <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center relative">
                                    About Us
                                </h2>
                                <p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                                    Driven by a passion for delivering the freshest fruits, at <span className="text-teal-600">Online Fruit Garden</span>, we have carefully selected and offered the highest quality produce to make your fruit shopping experience enjoyable and easy. Our mission is to provide a delightful shopping experience with fresh products and dedicated service, ensuring that every purchase is a satisfying one.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="font-manrope text-4xl text-center text-gray-900 font-bold mb-14">Our Success in Numbers</h2>
                    <div className="flex flex-col gap-5 xl:gap-8 lg:flex-row lg:justify-between">
                        <div
                            className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
                            <div className="flex gap-5">
                                <div className="font-manrope text-2xl font-bold text-green-600">
                                    300%
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl text-gray-900 font-semibold mb-2">Customer Satisfaction</h4>
                                    <p className="text-xs text-gray-500 leading-5">Our commitment to quality and freshness has led to a remarkable increase in customer satisfaction and repeat purchases.</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
                            <div className="flex gap-5">
                                <div className="font-manrope text-2xl font-bold text-green-600">
                                    200+
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl text-gray-900 font-semibold mb-2">Fruit Varieties</h4>
                                    <p className="text-xs text-gray-500 leading-5">We offer a diverse selection of over 200 fruit varieties, ensuring you find your favorites and discover new ones.</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
                            <div className="flex gap-5">
                                <div className="font-manrope text-2xl font-bold text-green-600">
                                    600+
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl text-gray-900 font-semibold mb-2">Happy Customers</h4>
                                    <p className="text-xs text-gray-500 leading-5">We have served over 1000 satisfied customers who enjoy our fresh fruits and exceptional service.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
  );
}
export default About;
