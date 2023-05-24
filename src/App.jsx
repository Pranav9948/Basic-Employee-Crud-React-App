import './App.css';
import { Container, Table } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    dateOfBirth: '',
    email: '',
    salary: '',
    gender: ''
  });

  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('');

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const renderSortIcon = () => {
    if (sortOrder === 'asc') {
      return <i className="bi bi-caret-up-fill ml-1"></i>;
    } else {
      return <i className="bi bi-caret-down-fill ml-1"></i>;
    }
  };

  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = (index) => {
    setEmployees(employees.filter((_, id) => id !== index));
  };

  const handleEdit = (index) => {
    const employee = employees[index];
    setFormData({ ...employee });
    setEditIndex(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.id &&
      formData.name &&
      formData.dateOfBirth &&
      formData.email &&
      formData.salary &&
      formData.gender
    ) {
      if (editIndex !== null) {
        const updatedEmployees = [...employees];
        updatedEmployees[editIndex] = formData;
        setEmployees(updatedEmployees);
        setEditIndex(null);
      } else {
        setEmployees([...employees, formData]);
      }

      setFormData({
        id: '',
        name: '',
        dateOfBirth: '',
        email: '',
        salary: '',
        gender: ''
      });
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="EmployeeApp">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4 mt-4 text-center">EMPLOYEE RECORD</h1>

        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-3">
              <label htmlFor="id" className="block mb-1">
                Employee Id
              </label>
              <input
                type="text"
                placeholder="Enter Id"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="dateOfBirth" className="block mb-1">
                Date of Birth
              </label>
              <input
                type="text"
                placeholder="Enter Dob"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="salary" className="block mb-1">
                Salary
              </label>
              <input
                type="number"
                placeholder="Enter Salary"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Gender</label>
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleInputChange}
                />
                <label htmlFor="male" className="ml-2">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleInputChange}
                />
                <label htmlFor="female" className="ml-2">
                  Female
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleInputChange}
                />
                <label htmlFor="other" className="ml-2">
                  Other
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 text-white rounded-md w-full"
            >
              {editIndex !== null ? 'Update' : 'Submit'}
            </button>
          </form>
        </div>
      </div>

      <Container>
        <div className="mb-4 ms-4 mt-4">
          <label htmlFor="search" className="mb-2 bg-">
            Search by name:
          </label>
          <input
            type="text"
            name="search"
            value={searchQuery}
            onChange={handleSearchChange}
            className=" px-4 py-2 border bg-slate-100 border-gray-300 rounded-full"
            placeholder="search name"
          />
        </div>
      </Container>

      <Container className="flex justify-center">
        <div className="ml-56 m-5">
          {employees.length > 0 ? (
            <div>
              <h1 className="text-2xl font-bold mb-4 mt-4 text-center">EMPLOYEE DETAILS</h1>
              <Table className="w-full">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-gray-100" onClick={() => handleSort('id')}>
                      ID {sortColumn === 'id' && renderSortIcon()}
                    </th>
                    <th className="py-2 px-4 bg-gray-100" onClick={() => handleSort('name')}>
                      Name {sortColumn === 'name' && renderSortIcon()}
                    </th>
                    <th className="py-2 px-4 bg-gray-100" onClick={() => handleSort('dateOfBirth')}>
                      Date of Birth {sortColumn === 'dateOfBirth' && renderSortIcon()}
                    </th>
                    <th className="py-2 px-4 bg-gray-100" onClick={() => handleSort('email')}>
                      Email {sortColumn === 'email' && renderSortIcon()}
                    </th>
                    <th className="py-2 px-4 bg-gray-100" onClick={() => handleSort('salary')}>
                      Salary {sortColumn === 'salary' && renderSortIcon()}
                    </th>
                    <th className="py-2 px-4 bg-gray-100" onClick={() => handleSort('gender')}>
                      Gender {sortColumn === 'gender' && renderSortIcon()}
                    </th>
                    <th className="py-2 px-4 bg-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees
                    .filter((employee) =>
                      employee.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .sort((a, b) => {
                      const columnA = a[sortColumn];
                      const columnB = b[sortColumn];

                      if (columnA < columnB) {
                        return sortOrder === 'asc' ? -1 : 1;
                      }
                      if (columnA > columnB) {
                        return sortOrder === 'asc' ? 1 : -1;
                      }
                      return 0;
                    })
                    .map((employee, index) => (
                      <tr key={index}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.dateOfBirth}</td>
                        <td>{employee.email}</td>
                        <td>{employee.salary}</td>
                        <td>{employee.gender}</td>
                        <td>
                          <button
                            onClick={() => handleEdit(index)}
                            className="bg-yellow-400 px-2 py-1 mr-2 text-white rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="bg-red-400 px-2 py-1 text-white rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p>No employees found</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
