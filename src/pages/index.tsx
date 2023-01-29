import { FormEvent, useState } from "react";
import {signIn} from 'next-auth/react';
import z from 'zod';

const EmailSchema = z.string().email().endsWith('codeforkdev@gmail.com')
type Email = z.infer<typeof EmailSchema>;

interface IAuthEmailState {
  value: Email
  valid: boolean | null
  error: string
}


export default function Home() {
  const [email, setEmail] = useState<IAuthEmailState>({ value: '', valid: null, error: '' });

  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    const emailProvided = z.string().email().endsWith('.com').safeParse(value).success;

    if (emailProvided) {
      if (EmailSchema.safeParse(value).success) {
        setEmail({ value, valid: true, error: '' });
      } else {
        setEmail({ value, valid: false, error: 'invalid domain' })
      }
    } else {
      setEmail({ ...email, valid: null, value })
    }
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email.value)
    await signIn('email', {email: email.value, redirect: false})
  }

  const emailInputBorder = () => {
    if(email.valid === null) {
      return 'focus:border-blue-500'
    }

    if(email.valid) {
      return 'border-green-600 focus:border-green-600'
    } else {
      return 'border-red-600 focus:border-red-600'
    }
  }

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center border">
        <h1 className="text-xl font-semibold mb-6">Light Speed Interview Project</h1>
        <div className="max-w-xl w-full mx-auto ">
          <form onSubmit={handleLogin}>
            <div className="mb-2">
              <label htmlFor="email" className="block mb-1">Email Address</label>
              <input value={email.value} onChange={handleEmailChange} type="email" placeholder="test@lightspeedvoice.com" className={`border-2 p-1 px-4 w-full rounded-lg outline-none ${emailInputBorder()} transition-all duration-200`} />
            </div>
            <button type="submit" disabled={!email.valid ?? false} className="bg-blue-500 font-semibold py-1 px-2 text-white w-full rounded-lg hover:shadow-md transition-shadow duration-100 active:shadow-none">Login</button>
          </form>
        </div>
      </div>
    </>
  )
}


