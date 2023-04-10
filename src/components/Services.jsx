import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({ color, icon, title, subtitle }) => (
    <div class="white-glassmorphism p-3 cursor-pointer d-flex flex-row mb-4">
        <div style={{width: '30px', height: '22px'}}>
            {icon}
        </div>
        <div className="px-4 text-white">
          <h6 className="text-white mb-1">{title}</h6>  
          <p className="text-white">{subtitle}</p> 
        </div>
    </div>
)

const Services = () => {
  return (
    // <h1>Services</h1>
    <div className="w-100 gradient-bg-services">
      <div className="container p-5">
        <div className="row">
          <div className="col">
            <h1 className="text-white">
              Services that we <br /> continue to improve
            </h1>
          </div>
          <div className="col">
           <ServiceCard
            color="bg-[#2952E3]"
            title="Security Guaranteed"
            icon={<BsShieldFillCheck className="text-white" />}
            subtitle="Security is guaranteed. We always maintain privacy and maintain the quality of our product"
           />
             <ServiceCard
            color="bg-[#2952E3]"
            title="Security Guaranteed"
            icon={<BiSearchAlt className="text-white" />}
            subtitle="Security is guaranteed. We always maintain privacy and maintain the quality of our product"
           />
            <ServiceCard
            color="bg-[#2952E3]"
            title="Security Guaranteed"
            icon={<RiHeart2Fill className="text-white" />}
            subtitle="Security is guaranteed. We always maintain privacy and maintain the quality of our product"
           />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
