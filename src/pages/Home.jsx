import NavBar from "../components/layout/NavBar"
import Hero from "../components/features/home/Hero"
import Features from "../components/features/home/Features"
import HotelPreview from "../components/features/home/HotelPreview"
import Footer from "../components/layout/Footer"

const Home = () => {
    return (
        <div>
            <NavBar />
            <Hero />
            <Features />
            <HotelPreview />
            <Footer />
        </div>
    )
}

export default Home
