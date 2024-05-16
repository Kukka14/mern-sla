import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-dashboard-layout-24.png";
import notification from "../../../images/icons8-notification-50.png";
import profilepic from "../../../images/219969.png";
import arrowicon from "../../../images/icons8-arrow-50.png";
import axios from "axios";
import AdminHeader from "../../../components/AdminHeader";

export default function EmployeeDashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await axios.get(`/api/employee`);
        setEmployees(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="flex max-h-max">
      <div className="bg-sideNavBackground w-1/5 p-4">
        {/* Logo */}

        <Link to="/mainDashboard">
          <div className="flex justify-center items-center mb-8">
            <img src={logo} alt="Company Logo" className="w-48 h-auto" />
          </div>
        </Link>

        {/* Separate Line */}
        <hr className="border-gray-700 my-4" />
        {/* Navigation */}
        <div className="space-y-1">
          <NavLink icon={dashboard} text="Main Dashboard" to="/empDashboard" />
          <NavLink icon={dashboard} text="Add Employees" to="/addEmployee" />
          <NavLink icon={dashboard} text="Employees" to="/employeeList" />
          <NavLink icon={dashboard} text="Employee Payment" to="/paymentList" />
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <AdminHeader />
        <div className="flex flex-col gap-10 mt-16 ">
          {/* Render cards for each category */}
          <div className="flex flex-wrap justify-center flex-col mx-10">
            {/* First card for total count of all products */}

            <div className="flex gap-4 justify-center mx-10">
              <div className="card bg-sideNavBackground shadow-md rounded-lg p-4 flex-1">
                <h2 className="text-lg font-bold text-gray-800">
                  Total Employees
                </h2>
                <img
                  className="mx-auto"
                  width={"150px"}
                  src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                  alt=""
                />
              </div>

              <div className="card bg-sideNavBackground shadow-md rounded-lg p-4 flex-1">
                <p className="text-black text-9xl text-center justify-center mt-5 font-semibold">
                  {employees.length}
                </p>
              </div>
            </div>

            <div className="card bg-sideNavBackground shadow-md rounded-lg p-4 flex-1 mx-10 mt-4">
              <h2 className="text-lg font-bold text-gray-800">
                Total Employees
              </h2>
              <img
                className="mx-auto"
                width={"350px"}
                src="https://datavizproject.com/wp-content/uploads/types/Line-Graph.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// NavLink Component for sidebar navigation items
function NavLink({ icon, text, to }) {
  return (
    <Link
      to={to}
      className="flex items-center text-white py-2 px-4 rounded-md bg-sideNavButton hover:bg-sideNavButtonhover"
    >
      <img src={icon} alt={text} className="w-6 h-6 mr-4" />
      <span className="text-lg font-semibold">{text}</span>
    </Link>
  );
}
