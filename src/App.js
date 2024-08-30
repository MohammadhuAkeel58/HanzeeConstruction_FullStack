import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import HomePage from "./Components/HomePage";
import Customer from "./Components/CustomerPage";
import Employee from "./Components/EmployeePage";
import Logistics from "./Components/LogisticsPage";
import Stock from "./Components/StockPage";
import Task from "./Components/TaskManager";
import Project from "./Components/ProjectPage";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./Config/firebase";
import { HiArrowCircleDown } from "react-icons/hi";

const App = () => {
  // Stock

  const [selectedItemsStock, setSelectedItemsStock] = useState([]);
  const [totalPriceStock, setTotalPriceStock] = useState(0);

  //Logistics

  const [selectedItemsLogistic, setSelectedItemsLogistic] = useState([]);
  const [totalPriceLogistic, setTotalPriceLogistic] = useState(0);
  //App
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = (e) => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };
  return (
    <Router>
      <div>
        <nav className="fixed font-popins top-0 left-0 right-0 px-10 py-5 flex items-center justify-evenly w-full bg-slateBlue drop-shadow-md z-[5000]">
          <Link to="/" className="text-[1.2rem] font-lg">
            {" "}
            Hanzee Construction
          </Link>
          <ul className=" flex gap-10 font-md items-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stocks">Stocks</Link>
            </li>
            <li>
              <Link to="/logistics">Logistics</Link>
            </li>

            <li>
              <Link to="/project">Project</Link>
            </li>

            <li>
              <Link to="/employee">Employee</Link>
            </li>
            <li>
              <Link to="/customer">Customer</Link>
            </li>
            <li>
              <Link to="/task">Task</Link>
            </li>
          </ul>

          {authUser ? (
            <div className="font-lg cursor-pointer relative bg-white group shadow-none  ">
              <p className="flex items-center gap-1">
                {authUser.email} <HiArrowCircleDown />
              </p>

              <div className="absolute z-[9999] top-[1.5rem] right-0 ">
                <button
                  className="items-center justify-center w-full hidden hover:block group-hover:block bg-white px-2 py-1 rounded-full btn text-dark-blue text-[1rem]"
                  onClick={userSignOut}
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-5 font-xl items-center">
              <Link to="/register">Register</Link>
              <Link
                to="/login"
                className=" border-[1px] rounded px-5 py-3  shadow-md"
              >
                Login
              </Link>
            </div>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/stocks"
            element={
              <Stock
                selectedItemsStock={selectedItemsStock}
                setSelectedItemsStock={setSelectedItemsStock}
                totalPriceStock={totalPriceStock}
                setTotalPriceStock={setTotalPriceStock}
              />
            }
          />

          <Route
            path="/logistics"
            element={
              <Logistics
                selectedItemsLogistic={selectedItemsLogistic}
                setSelectedItemsLogistic={setSelectedItemsLogistic}
                totalPriceLogistic={totalPriceLogistic}
                setTotalPriceLogistic={setTotalPriceLogistic}
              />
            }
          />

          <Route path="/employee" element={<Employee />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/task" element={<Task />} />
          <Route path="/project" element={<Project />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
