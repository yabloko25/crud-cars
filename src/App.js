import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/cars";

function App() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", model: "", year: "" });
  const [editId, setEditId] = useState(null);

  const fetchCars = async () => {
    const res = await axios.get(API_URL);
    setCars(res.data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ name: "", price: "", model: "", year: "" });
    fetchCars();
  };

  const handleEdit = (car) => {
    setForm(car);
    setEditId(car.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchCars();
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🚗 Car CRUD App</h1>

      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2 w-full" />
        <input name="model" value={form.model} onChange={handleChange} placeholder="Model" className="border p-2 w-full" />
        <input name="year" value={form.year} onChange={handleChange} placeholder="Year" className="border p-2 w-full" />
        <button className="bg-blue-500 text-white px-4 py-2">{editId ? "Update" : "Add"} Car</button>
      </form>

      <ul className="space-y-4">
        {cars.map((car) => (
          <li key={car.id} className="border p-4 rounded shadow flex justify-between items-center">
            <div>
              <p><strong>Name:</strong> {car.name}</p>
              <p><strong>Price:</strong> ${car.price}</p>
              <p><strong>Model:</strong> {car.model}</p>
              <p><strong>Year:</strong> {car.year}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(car)} className="bg-yellow-400 px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(car.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
