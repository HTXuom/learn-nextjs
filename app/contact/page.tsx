import Image from 'next/image'
import React from 'react'

function Contact() {
 

  return (
      <div className="bg-pink-100 py-12 min-h-screen mt-6">
          
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 ml-10">
                      <h2 className="text-2xl font-bold mb-4">Chat support</h2>
                      <p className="text-gray-600 mb-4">Our support team is just a click away.</p>
                      <a href="#" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded block text-center transition duration-300">
                          Chat now
                          
                      </a>
                  </div>

                  <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
                      <h2 className="text-2xl font-bold mb-4">Email support</h2>
                      <p className="text-gray-600 mb-4">Prefer to email? Send us an email and we will get back to you soon.</p>
                      <form className="space-y-4">
                      <input
                          type="email"
                          placeholder="Email Address"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-700"
                      />

                          <input
                              type="text"
                              placeholder="Subject"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-700"
                          />
                          <textarea
                              placeholder="How can we help?"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-700"
                          ></textarea>
                          <button
                              type="submit"
                              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded block w-full transition duration-300"
                          >
                              Send email
                          </button>
                      </form>
                  </div>

                  <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 mr-10">
                      <h2 className="text-2xl font-bold mb-4">Help center</h2>
                      <p className="text-gray-600 mb-4">Our self-serve help center is open 24/7 with 150+ articles to help.</p>
                      <a href="#" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded block text-center transition duration-300">
                          Visit Help Center
                      </a>
                  </div>
              </div>

              <div className="mt-12 text-center">
                  <h1 className="text-4xl font-bold mb-4 text-gray-700">Online Fruit Garden</h1>
                  <p className="text-gray-600 mb-4">
                      We are happy and honored to answer your questions. <br />
                      If you have any questions or concerns about Online Fruit Gardenproducts, please contact us.
                  </p>
                  <div className="space-x-4 mb-4">
                      <a href="mailto:anh.pham25@student.passerellesumeriques.org" className="text-teal-500 hover:text-teal-700 transition duration-300">
                         xuom.ho25@student.passerellesumeriques.org
                      </a>
                      <span className="text-gray-600">|</span>
                      <a href="tel:0902184067" className="text-teal-500 hover:text-teal-700 transition duration-300">
                          0326826518
                      </a>
                  </div>
                  <div className="mt-8 w-25 h-25">
                      <Image
                          src="/Thank you.jpg"
                          alt="Thank You"
                          width={400}  // Thay đổi giá trị này thành chiều rộng thực tế của hình ảnh
                          height={400}
                          className="mx-auto rounded-lg shadow-lg" />
                  </div>

              </div>
          </div>

  )
}

export default Contact



