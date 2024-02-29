import Userbar from "./Userbar"
import imgPath from "../assets/user-dp.jpg"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard(){
  const [ userDetails, setUserDetails] = useState({
    userName: '',
    balance: ''
  })
  const [ users, setUsers ] = useState([]);

  const location = useLocation();
  const userId = location.state.userId;
  
  useEffect(()=>{
    async function getUserDetails(){
      const response = await fetch(
        `http://localhost:5000/api/v1/user/getdetails?userid=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      if(!response.ok){
        throw new Error('failed to fetch details')
      }
      const responseData = await response.json();
      const userName = responseData.userName;
      const balance = responseData.balance;

      setUserDetails({
        ...userDetails,
        userName: userName,
        balance: balance
      })
    }
    getUserDetails();
  }, [userId])

  useEffect(()=>{
    async function getUsers(){
      const response = await fetch("http://localhost:5000/api/v1/user/bulk",{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("second useSTATE")
      if(!response.ok){
        throw new Error('failed to get users')
      }

      const responseData = await response.json();
      const responseDataArray = responseData.user;
      console.log(responseData, responseDataArray)
      setUsers(responseDataArray.map((user)=>({firstName: user.firstName})));
      console.log(
        responseDataArray.map((user) => {
          user.firstName;
        })
      );
    } 
    getUsers();
  }, [])

    return (
      <div className="h-auto w-auto bg-white overflow-x-hidden">
        <div id="headerDiv" className="w-full h-20 bg-white border-b-2 flex justify-between items-center">
          <h1 className="ml-20 font-sans text-3xl font-bold">IndiaPay</h1>
          <div className="flex justify-between mr-10">
          <h1 className="mr-3 my-auto font-sans">Namaste, {userDetails.userName}</h1>
          <img src={imgPath} className="rounded-full object-cover h-11 w-11 ml-4" />
          </div>
        </div>
        <div id="balanceDiv" className="flex w-full h-20 items-center">
          <h1 className="font-sans font-bold ml-16">Your Balance</h1>
          <h1 className="font-sans font-bold ml-2">{`₹${userDetails.balance}`}</h1>
        </div>
        <h1 className="flex w-full h-10 intems-center font-sans font-bold ml-16 text-2xl">Users</h1>
        <div id="searchbar">
          <input type="search" placeholder="Search users..." className="border border-black rounded-md placeholder:font-sans placeholder: font-sm focus:border-transparent w-10/12 h-8 pl-5 mt-5 ml-16"></input>
        </div>
        <div className="justify-center h-auto bg-white w-auto flex-shrink-0 items-center ml-16 space-y-2 mt-10">
          {users.map((user, i)=>(<Userbar key={i} name={user.firstName} />) )}
        </div>
      </div>
      
    );
}

export default Dashboard;