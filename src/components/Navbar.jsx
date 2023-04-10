
import logo from '../images/techiweb.jpg';
const array = ["Market","Exchange","Tutorials","Wallets"];
const NavbarItems = ({title,classProps})=>{
   return(
      <li className={`mx-4 cursor-pointer ${classProps} `}>
        {title}
      </li>
   );
}

const Navbar = ()=>{
  
    return(
    
     <nav class="navbar navbar-expand-lg">
        <div class="container-fluid mt-4">
           <img src={logo} alt="logo" className="cursor-pointer" style={{width: "100px",height: "50px"}}/>
          <button class="navbar-toggler text-white bg-white text-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>  
          
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="mx-4 d-lg-flex flex-lg-row" style={{position: "absolute", right: "0",}}>
              <ul className='text-white cursor-pointer list-unstyled d-lg-flex flex-lg-row mx-4 items-center flex-initial'>
                {array.map((items,index)=>(
                    <NavbarItems key={items+index} title={items} />
                ))} 
            </ul>
            <form class="d-flex" role="search">
              {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"> */}
              <button class="btn btn-outline-success" type="submit">Login</button>
            </form>
          </div>
          </div>
        </div>
      </nav>

    );
}

export default Navbar;
