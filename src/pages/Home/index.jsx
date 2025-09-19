import SearchReport from "./components/SearchReport";
import AboutUs from "./components/AboutUs";
import ReportCarrousel from "./components/ReportCarrousel";
import Faq from "./components/Faq";

function HomePage() {
  return (
    <div>
      <Jumbotron />
      <ReportCarrousel />
      <AboutUs />
      <SearchReport />
      {/* <Faq/> */}
    </div>
  );
}

export default HomePage;
