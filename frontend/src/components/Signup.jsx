import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  function handleUserInput(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const requestBody = JSON.stringify(formData);
      const response = await fetch("http://localhost:5000/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": String(
            new TextEncoder().encode(requestBody).length
          ),
        },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error("Failed to Create account");
      }

      const responseData = await response.json();
      const userId = responseData.userId;
      
      // Redirect to /dashboard if login is successful

      alert('Your account has been created successfully. Press "OK" to continue');
      navigate("/dashboard", {state: {userId: userId}});
      
    } catch (error) {
      console.log("Failed to fetch");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        style={{ height: "80vh", width: "60vh" }}
        className="bg-white rounded-md flex justify-center items-center"
      >
        <form
          style={{ height: "100%", width: "100%" }}
          className="justify-center p-8"
        >
          <h1 className="font-sans text-4xl font-bold text-center text-black pb-15">
            Sign Up
          </h1>
          <p className="font-sans text-center mb-5 mt-4 text-slate-500">
            Enter your information to create an account
          </p>
          <label
            htmlFor="first-name"
            className="block font-sans text-black text-1.5xl mb-2 mt-5 font-bold"
          >
            First Name
          </label>
          <input
            id="first-name"
            type="text"
            className="block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
            placeholder="Ajeet"
            name="firstName"
            onChange={handleUserInput}
          ></input>
          <label
            htmlFor="last-name"
            className="block font-sans text-black text-1.5xl mb-2 mt-5 font-bold"
          >
            Last Name
          </label>
          <input
            id="last-name"
            type="text"
            className="block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
            placeholder="Pratap Singh"
            name="lastName"
            onChange={handleUserInput}
          ></input>
          <label
            htmlFor="email"
            className="block font-sans text-black text-1.5xl mb-2 mt-5 font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
            placeholder="buitbyajeet@gmail.com"
            name="username"
            onChange={handleUserInput}
          ></input>
          <label
            htmlFor="password"
            className="block font-sans text-black text-1.5xl mb-2 mt-5 font-bold"
          >
            Password
          </label>
          <input
            id="password"
            type="text"
            className="block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
            placeholder="XXXXXXXXXX"
            name="password"
            onChange={handleUserInput}
          ></input>
          <button
            type="submit"
            className="block bg-blue-500 hover:bg-blue-400 w-full align-center text-white font-bold py-2 px-4 rounded mt-8"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <p className="block font-semibold font-sans text-center text-sm mt-1 text-black">
            Already have an account?
            <Link to="/signin" className="underline">
              {" "}
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
