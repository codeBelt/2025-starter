import {HomePage} from '@/components/pages/homePage/HomePage';

export async function generateMetadata() {
  return {
    title: 'My Home Page',
    description: 'This is my home page description',
  };
}

export default function HomeRoute() {
  return <HomePage />;
}
