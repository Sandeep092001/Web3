import {Navbar, Footer, Services, Welcome, Transactions} from './components';
// import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
         <Navbar />
         <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />

    </div> 
    
  );
}

export default App;
