import {ContactPage} from '@/components/pages/contactPage/ContactPage';

export async function generateMetadata() {
  return {
    title: 'My Contact Page',
    description: 'All about the contact!',
  };
}

export default function ContactRoute() {
  return <ContactPage />;
}
