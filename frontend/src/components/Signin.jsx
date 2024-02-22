import { Link } from 'react-router-dom';

function Signin(){

    const handleUserInput = () => {

    }

    const handleSubmit = () => {

    }

    return (
      <div className="flex justify-center items-center h-screen">
        <div
          style={{ height: "60vh", width: "60vh" }}
          className="bg-white rounded-md flex justify-center items-center"
        >
          <form
            style={{ height: "100%", width: "100%" }}
            className="justify-center p-8"
          >
            <h1 className="font-sans text-4xl font-bold text-center text-black pb-15">
              Sign In
            </h1>
            <p className="font-sans text-center mb-5 mt-4 text-slate-500">
              Enter your information to access your account
            </p>
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
              Sign In
            </button>
            <p className="block font-semibold font-sans text-center text-sm mt-1 text-black">
              Don't have an account?
              <Link to="/signup" className="underline">
                {" "}
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
}

export default Signin;