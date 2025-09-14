import Jumbotron from "./components/Jumbotron";
import ReportCarrousel from "./components/ReportCarrousel";
import Faq from "./components/Faq";
import Statistic from "./components/Statistic";
// import AboutUs from "./components/AboutUs";

function HomePage() {
  return (
    <div>
      <Jumbotron />
      <Statistic />
      <ReportCarrousel />
      {/* <AboutUs /> */}
      <Faq />
    </div>
  );
}

export default HomePage;
