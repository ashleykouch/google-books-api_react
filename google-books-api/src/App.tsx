import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import SearchBar from "./components/SearchBar/SearchBar";
import BookDetails from "./components/BookDetails/BookDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/Navbar/About/About";
import Contact from "./components/Navbar/Contact/Contact";
import BookCard from "./components/BookCard/BookCard";
import CardContainer from "./components/CardContainer/CardContainer";
import Footer from "./components/Footer/Footer";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={SearchBar} />
          <Route path="/book/:id" component={BookDetails} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};
export default App;
