import Hero from '../components/sections/Hero';
import HeroInfoStrip from '../components/sections/HeroInfoStrip';
import UpdatesCarousel from '../components/sections/UpdatesCarousel';
import Welcome from '../components/sections/Welcome';
import Services from '../components/sections/Services';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Clientele from '../components/sections/Clientele';
import Certifications from '../components/sections/Certifications';
import VirtualMeeting from '../components/sections/VirtualMeeting';
import Gallery from '../components/sections/Gallery';

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <Hero />
      <HeroInfoStrip />
      <UpdatesCarousel />
      <Welcome />
      <Services />
      {/* <Products /> */}
      <WhyChooseUs />
      <Clientele />
      <Certifications />
      <VirtualMeeting />
      <Gallery />
    </div>
  );
}
