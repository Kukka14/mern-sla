import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../../images/logo2.png";
import notification from "../../../images/icons8-notification-50.png";
import profilepic from "../../../images/219969.png";
import axios from "axios";

export default function EmployeeUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  //   console.log(id);
  console.log(formData);

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const res = await axios.get(`/api/employee?employeeId=${id}`);
        setFormData(res.data[0]);
      } catch (error) {
        setError(error);
      }
    };

    getEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/employee/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/employeeList");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-row max-w-7xl mx-auto h-screen">
      <div className="bg-sideNavBackground basis-1/4 flex flex-col ">
        <div className="flex justify-center items-center my-11">
          <img src={logo} alt="Company Logo" className="w-60 h-16" />
        </div>
        <div></div>
      </div>
      <div className="basis-3/4 ml-8">
        <div className="flex flex-row justify-between mt-9">
          <form>
            <input
              type="text"
              placeholder="Search..."
              className="bg-searchBarBackground w-80 rounded-2xl border h-11 pl-6"
            />
          </form>
          <div className="flex flex-row justify-between items-center">
            <img
              src={notification}
              alt="notification"
              className="w-9 h-10 mx-4"
            />
            <img
              src={profilepic}
              alt="profile pic"
              className="w-12 h-12 mx-4"
            />
          </div>
        </div>
        <hr className="my-7 h-0.5 bg-searchBarBackground border-0 " />

        <div className="p-3 ">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-20">
            <p className="text-sideNavText text-lg">Employee Name :</p>
            <div className="flex justify-end">
              <input
                type="text"
                className="border p-3 rounded-lg bg-sideNavBackground basis-5/6"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <p className="text-sideNavText text-lg">NIC :</p>
            <div className="flex justify-end">
              <input
                type="text"
                className="border p-3 rounded-lg bg-sideNavBackground basis-5/6"
                id="nic"
                value={formData.nic}
                onChange={handleChange}
              />
            </div>
            <p className="text-sideNavText text-lg">Email :</p>
            <div className="flex justify-end">
              <input
                type="text"
                className="border p-3 rounded-lg bg-sideNavBackground basis-5/6"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <p className="text-sideNavText text-lg">Mobile :</p>
            <div className="flex justify-end">
              <input
                type="text"
                className="border p-3 rounded-lg bg-sideNavBackground basis-5/6"
                id="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>

            <p className="text-sideNavText text-lg">Basic Salary :</p>
            <div className="flex justify-end">
              <input
                type="text"
                className="border p-3 rounded-lg bg-sideNavBackground basis-5/6"
                id="basicSlary"
                value={formData.basicSlary}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end">
              <select
                id="position"
                value={formData.position || ""}
                onChange={handleChange}
                className="border p-3 rounded-lg bg-sideNavBackground basis-5/6"
              >
                <option value="">Select Position</option>
                {positions.map((position, index) => (
                  <option key={index} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row justify-between items-center mt-10">
              <Link to="/employeeList">
                <button className="bg-buttonbackground text-white text-2xl rounded-2xl p-4 text-center">
                  Back
                </button>
              </Link>
              <button
                disabled={loading}
                className="bg-buttonbackground text-white text-2xl rounded-2xl p-4 text-center"
              >
                {loading ? "Adding..." : "Save"}
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
    </div>
  );
}
