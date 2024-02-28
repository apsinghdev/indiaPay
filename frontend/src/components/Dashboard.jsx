import Userbar from "./Userbar"
import imgPath from "../assets/user-dp.jpg"
import { useLocation } from "react-router-dom";

function Dashboard(){
  const location = useLocation();
  const userId = location.state.userId;
  {console.log(userId)}

    return (
      <div className="h-screen w-screen bg-white">
        <div id="headerDiv" className="w-full h-20 bg-white border-b-2 flex justify-between items-center">
          <h1 className="ml-20 font-sans text-3xl font-bold">IndiaPay</h1>
          <div className="flex justify-between mr-10">
          <h1 className="mr-3 my-auto font-sans">Namaste, User</h1>
          <img src={imgPath} className="rounded-full object-cover h-11 w-11 ml-4" />
          </div>
        </div>
        <div id="balanceDiv" className="flex w-full h-20 items-center">
          <h1 className="font-sans font-bold ml-16">Your Balance</h1>
          <h1 className="font-sans font-bold ml-2">{`₹1500`}</h1>
        </div>
        <h1 className="flex w-full h-10 intems-center font-sans font-bold ml-16 text-2xl">Users</h1>
        <div id="searchbar">
          <input type="search" placeholder="Search users..." className="border border-black rounded-md placeholder:font-sans placeholder: font-sm focus:border-transparent w-10/12 h-8 pl-5 mt-5 ml-16"></input>
        </div>
        <div className="justify-center h-40 w-full flex-shrink-0 items-center ml-16 space-y-2 mt-10">
        <Userbar name="Ajeet" />
        <Userbar name="Ajay" />
        <Userbar name="Karn" />
        <Userbar name="Priya" />
        <Userbar name="Neha" />
        </div>
      </div>
      
    );
}

export default Dashboard;