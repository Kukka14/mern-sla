import { Button, Label, TextInput, Textarea } from 'flowbite-react';

export default function ContactUs() {
  return (
      <div className='min-h-screen mt-20 bg-gre-200'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row
      md:items-center gap-10'>

        {/* left */}
        <div className='flex-1'>
          <img src='/images/img1.jpg' alt='image' className="w-full rounded-md shadow-md" style={{maxWidth:'2000px', maxHeight:'500px'}} />
        </div>

        {/* right */}
        <div className='flex-1 bg-gray-200 rounded-md p-6'>
          <h1 className="text-3xl font-bold mb-4"> Contact Us </h1>

          <form className='flex flex-col gap-4' >
            <div>
              <Label value='Name:' />
              <TextInput type='text' placeholder='Name' id='name' />
            </div>
            <div>
              <Label value='Email:' />
              <TextInput type='email' placeholder='Email' id='email' />
            </div>
            <div>
              <Label value='Contact No:' />
              <TextInput type='number' placeholder='Contact Number' id='contactNo' />
            </div>
            <div>
              <Label value='Message:' />
              <Textarea type='text' placeholder='Enter text here....' id='message' maxLength={300} rows={6} />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
  
}
