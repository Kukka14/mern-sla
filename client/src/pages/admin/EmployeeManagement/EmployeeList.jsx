import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-dashboard-layout-24.png";
import notification from "../../../images/icons8-notification-50.png";
import profilepic from "../../../images/219969.png";
import arrowicon from "../../../images/icons8-arrow-50.png";
import whitearrowicon from "../../../images/icons8-arrow-50 (1).png";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AdminHeader from "../../../components/AdminHeader";

const positions = [
  "Order Management",
  "Product Management",
  "Supplier Management",
  "Customer Management",
  "Customer Care Management",
  "Payment Management",
  "Employee Management",
  "Category & Promotion Management",
];

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  console.log(selectedPosition);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await axios.get(`/api/employee?employeeName=${search}`);
        setEmployees(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClients();
  }, [search]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await axios.get(
          `/api/employee?position=${selectedPosition}`
        );
        setEmployees(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClients();
  }, [selectedPosition]);

  //   console.log(employees);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/employee/${id}`);
      const updatedEmployees = employees.filter(
        (employee) => employee._id !== id
      );
      setEmployees(updatedEmployees);
    } catch (error) {
      setError("Failed to delete the employee");
      console.error(error);
    }
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Employee List", 14, 16);
    doc.autoTable({
      theme: "striped",
      startY: 22,
      head: [["Name", "NIC", "Email", "Mobile Number"]],
      body: employees.map((emp) => [emp.name, emp.nic, emp.email, emp.mobile]),
    });
    doc.save("employee-list.pdf");
  };

  return (
    <div className="flex max-h-max">
      <div className="bg-sideNavBackground w-1/5 p-4 h-screen">
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
      <div className="basis-3/4 mx-8">
        <div className="flex flex-row justify-between mt-9">
          <form>
            <input
              type="text"
              placeholder="Search by name..."
              onChange={(e) => setSearch(e.target.value)}
              className="bg-searchBarBackground w-80 rounded-2xl border h-11 pl-6"
            />
          </form>
          <select
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="ml-4 p-2 rounded-2xl border bg-sideNavBackground"
          >
            <option value="">All Positions</option>
            {positions.map((position, index) => (
              <option key={index} value={position}>
                {position}
              </option>
            ))}
          </select>
          <button
            onClick={downloadPdf}
            className="bg-sideNavButton hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Report
          </button>
          
        </div>
        <hr className="my-7 h-0.5 bg-searchBarBackground border-0 " />
        <div className="flex justify-center items-center">
          <table className="table-auto w-11/12 bg-white shadow-md rounded-lg mb-4">
            <thead >
              <tr className="bg-green-300">
                <th scope="col" className="px-6 py-3 rounded-tl-lg">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  NIC
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Mobile Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 rounded-tr-lg">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr
                  key={employee._id}
                  className={
                    index % 2 === 0 ? "bg-green-100" : "bg-green-200"
                  }
                >
                  <td className="px-3 py-4">{employee.name}</td>
                  <td className="px-3 py-4">{employee.nic}</td>
                  <td className="px-3 py-4">{employee.email}</td>
                  <td className="px-3 py-4">{employee.mobile}</td>
                  <td className="px-3 py-4">{employee.position}</td>
                  <td className="px-3 py-4 flex flex-row gap-3">
                    <Link to={`/emloyee-update/${employee._id}`}>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-1 hover:bg-blue-600 text-center">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded mb-1 hover:bg-red-600"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {search && employees.length === 0 && (
            <p className="text-red-500 mt-5 text-center">No results found.</p>
          )}
          {error && <p className="text-red-500 mt-5">{error}</p>}
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
