import React, {  useState, useRef } from 'react'
import { Headline } from '../gql/graphql'
import * as Emailjs from '@emailjs/browser'
import Script from 'next/script'

const Contact = ({ contactHeadline }: { contactHeadline: Headline }) => {
  const [state, setState] = useState({
    name: '',
    contactInfo: '',
    subject: '',
    message: '',
  })
  const formRef = useRef(null)

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  function sendEmail(e: any) {
    e.preventDefault()

    if (
      state.name !== '' &&
      state.contactInfo !== '' &&
      state.subject !== '' &&
      state.message !== ''
    ) {
      Emailjs.send(
        `${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`,
        `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}`,
        { ...state },
        `${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}`
      )

      setState({ name: '', contactInfo: '', message: '', subject: '' })
      setTimeout(() => window.location.reload, 500)
    }

    alert('Email Sent!')
  }

  return (
    <section id="contact-us">
      <div className="flex flex-col h-auto max-w-screen-md gap-2 p-8 mx-auto text-white rounded-lg bg-primary">
        <h5 className="mx-auto font-medium text-center">
          {contactHeadline?.headline}
        </h5>
        <h5 className="mx-auto font-medium text-center">
          {contactHeadline?.subtitle}
        </h5>
        <div className="flex flex-col gap-y-3">
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="flex flex-col w-full h-auto gap-4 mx-auto md:w-2/3 "
          >
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="name" className="text-base font-medium">
                Name
              </label>
              <input
                name="name"
                type="text"
                onChange={handleChange}
                value={state.name}
                required
                className="w-full p-4 text-black bg-white rounded-lg outline-none placeholder:text-black placeholder:opacity-80"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="contactInfo" className="text-base font-medium">
                Your Contact Info, Email or Phone
              </label>
              <input
                name="contactInfo"
                type="text"
                onChange={handleChange}
                value={state.contactInfo}
                required
                className="w-full p-4 text-black bg-white rounded-lg outline-none placeholder:text-black placeholder:opacity-80"
                placeholder="Enter your email or phone number"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-base font-medium">
                Subject
              </label>
              <input
                name="subject"
                type="text"
                onChange={handleChange}
                value={state.subject}
                required
                className="w-full p-4 text-black bg-white rounded-lg outline-none placeholder:text-black placeholder:opacity-80"
                placeholder="Enter Subject"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-base font-medium">
                Message
              </label>
              <textarea
                name="message"
                onChange={handleChange}
                required
                value={state.message}
                className="w-full  p-4 bg-white text-black placeholder:text-black placeholder:opacity-80 border rounded-lg outline-none resize-none min-h-[150px]"
                placeholder="Enter your message"
              />
            </div>
            <button
              type="submit"
              className="h-auto px-6 py-2 font-medium text-black bg-white rounded-lg w-fit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
      />
    </section>
  )
}

export default Contact
