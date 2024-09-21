import Hero from './Components/Hero';
import FeaturedSections from './Components/FeaturedSections';
import Footer from '../components/Footer';
import Home from './Home';
import ImageAsideCard from '../components/utils/ImageAsideCard';
import TiltedBanner from '../components/utils/TiltedBanner';
import StickyBanners from '../components/utils/StickyBanners';
import CreateYourJourney from './Components/CreateYourJourney';
import YourJourney from './Components/YourJourney';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero/>
        <FeaturedSections />
        <div className='lg:w-10/12 md:w-11/12 w-full mx-auto p-4 flex justify-between flex-wrap my-6 items-end'>
          <CreateYourJourney/>
          <div className=' lg:w-1/2 md:w-5/12 mx-auto w-full'>
          <YourJourney/>
          </div>
        </div>
        <ImageAsideCard/>
        <TiltedBanner/>
        <StickyBanners/>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
