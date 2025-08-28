import Jumbotron from "./components/Jumbotron";
import AboutUs from "./components/AboutUs";
import ReportCarrousel from "./components/ReportCarrousel";
import Faq from "./components/Faq";

function HomePage() {
  return (
    <div>
      <Jumbotron />
      <AboutUs />
      <ReportCarrousel />
      <Faq/>
    </div>
  );
}

export default HomePage;
