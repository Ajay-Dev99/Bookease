import Hero from '../components/Homepage/Hero';
import WhyChoose from '../components/Homepage/WhyChoose';
import ProvidersSection from '../components/Homepage/ProvidersSection';
import TrustedSection from '../components/Homepage/TrustedSection';
import ReviewSection from '../components/Homepage/ReviewSection';

const Home = () => {
    return (
        <main>
            <Hero />
            <WhyChoose />
            <ProvidersSection />
            <TrustedSection />
            <ReviewSection />
        </main>
    );
};

export default Home;
