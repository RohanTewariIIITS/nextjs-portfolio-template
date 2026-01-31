import { LinkedIn, MsgIcon, PhoneIcon, X } from '@/utils/icons'
import ContactForm from './ContactForm'

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="bg-secondary my-8 grid grid-cols-1 gap-16 rounded-4xl p-8 md:my-16 md:grid-cols-2 md:gap-8 lg:gap-12">
      <div className="flex flex-col justify-between gap-8">
        <div>
          <h3 className="text-neutral text-3xl font-bold">Let's Talk</h3>
          <h4 className="text-accent text-2xl font-bold md:text-3xl">I'd love to connect</h4>
          <p className="text-neutral mt-8">
            Crafting innovative to solve real-world problems
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-neutral text-lg font-bold">Contact Information</p>
          <a
            href="mailto:rohantewari2023@gmail.com"
            className="text-neutral hover:text-accent flex items-center gap-1 font-light transition-colors duration-300">
            <MsgIcon /> rohantewari2023
          </a>
          <a
            href="https://www.linkedin.com/messaging/compose/?recipient=ACoAAEUFjQIBlK3fA7yiK6JI8f1S_O1U3Yk_Frk&recipients=List%28urn%3Ali%3Afsd_profile%3AACoAAEUFjQIBlK3fA7yiK6JI8f1S_O1U3Yk_Frk%29"
            className="text-neutral hover:text-accent flex items-center gap-1 font-light transition-colors duration-300">
            <LinkedIn /> Message on Linkedin
          </a>
          <a
            href="https://x.com/i/chat/1937175351563632640-1958967080726011904"
            className="text-neutral hover:text-accent flex items-center gap-1 font-light transition-colors duration-300">
            <X /> Message on X
          </a>
        </div>
      </div>

      <ContactForm />
    </section>
  )
}

export default ContactSection
