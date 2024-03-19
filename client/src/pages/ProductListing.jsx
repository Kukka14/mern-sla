import React from 'react';

export default function ProductListing() {

  return (
    <main className='p-6 max-w-4xl mx-auto'>    
      <div className='bg-gray- rounded-lg shadow-md p-6'>
        <h1 className='text-4xl font-bold text-center mb-8'>Create a Listing</h1>
        <form className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'>
          <div className='space-y-4'>
            <label htmlFor='product_name' className='block text-lg font-semibold'>Product Name</label>
            <input type='text' placeholder='Enter product name' className='border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500' id='product_name' maxLength='62' minLength='10' required />
          </div>
          <div className='space-y-4'>
            <label htmlFor='product_description' className='block text-lg font-semibold'>Product Description</label>
            <textarea placeholder='Enter product description' className='border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500' id='product_description' required />
          </div>
          <div className='space-y-4'>
            <label className='block text-lg font-semibold'>Product Type</label>
            <div className='flex flex-wrap items-center'>
              <div className='mr-4'>
                <input type='checkbox' id='sale' className='w-5 mr-2' />
                <label htmlFor='sale' className='font-semibold'>For Sale</label>
              </div>
              <div className='mr-4'>
                <input type='checkbox' id='pre-order' className='w-5 mr-2' />
                <label htmlFor='pre-order' className='font-semibold'>For Pre Order</label>
              </div>
              <div className='mr-4'>
                <input type='checkbox' id='rent' className='w-5 mr-2' />
                <label htmlFor='rent' className='font-semibold'>For Rent</label>
              </div>
              <div>
                <input type='checkbox' id='offer' className='w-5 mr-2' />
                <label htmlFor='offer' className='font-semibold'>For Offer</label>
              </div>
            </div>
          </div>
          <div className='space-y-4'>
            <label htmlFor='quantity' className='block text-lg font-semibold'>Quantity</label>
            <input type='number' id='quantity' min='1' max='10' className='border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500' required />
          </div>
          <div className='space-y-4'>
            <label htmlFor='pprice' className='block text-lg font-semibold'>Product Price (Rs:)</label>
            <input type='number' id='pprice' min='1' max='10' className='border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500' required />
          </div>
          <div className='space-y-4'>
            <label htmlFor='poffer' className='block text-lg font-semibold text-red-600'>Product Offer (Rs:)</label>
            <input type='number' id='poffer' min='1' max='10' className='border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500' required />
          </div>
          <div className='space-y-4'>
            <label htmlFor='images' className='block text-lg font-semibold'>Product Images</label>
            <div className='flex items-center'>
              <input className='border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500' type='file' id="images" accept='image/*' multiple />
              <button className='bg-green-500 text-white px-6 py-3 rounded-lg ml-4 hover:bg-green-600 focus:outline-none focus:bg-green-600'>Upload</button>
            </div>
            <p className='text-gray-500 text-sm'>The first image will be the cover photo</p>
          </div>
          <div className='sm:col-span-2'>
            <button className='bg-blue-500 text-white px-8 py-4 rounded-lg w-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>Create Listing</button>
          </div>
        </form>
      </div>
    </main>
  );
}
