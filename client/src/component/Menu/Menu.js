import React, { useState, useEffect } from "react";
import "./menu.css";
import { dishService } from "../../services/dishService";
import { useAuth } from "../../context/AuthContext";

export default function MenuPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [formData, setFormData] = useState({
    dishName: "",
    dishPrice: "",
    dishImage: "",
    dishDetail: ""
  });

  // Fetch dishes
  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await dishService.getAllDishes();
      setDishes(response);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new dish
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const newDish = await dishService.createDish(formData);
      setDishes(prev => [...prev, newDish]);
      setIsModalOpen(false);
      setFormData({
        dishName: "",
        dishPrice: "",
        dishImage: "",
        dishDetail: ""
      });
      alert("Thêm món ăn thành công!");
    } catch (err) {
      alert("Lỗi khi thêm món ăn: " + err.message);
    }
  };

  // Edit dish
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedDish = await dishService.updateDish(selectedDish.dishId, formData);
      setDishes(prev => prev.map(dish =>
        dish.dishId === selectedDish.dishId ? updatedDish : dish
      ));
      setIsModalOpen(false);
      setSelectedDish(null);
      alert("Cập nhật món ăn thành công!");
    } catch (err) {
      alert("Lỗi khi cập nhật món ăn: " + err.message);
    }
  };

  // Delete dish
  const handleDelete = async (dishId) => {
    if (window.confirm("Bạn có chắc muốn xóa món ăn này?")) {
      try {
        await dishService.deleteDish(dishId);
        setDishes(prev => prev.filter(dish => dish.dishId !== dishId));  // Sửa từ id thành dishId
        alert("Xóa món ăn thành công!");
      } catch (err) {
        alert("Lỗi khi xóa món ăn: " + err.message);
      }
    }
  };

  // Open modal for edit
  const openEditModal = (dish) => {
    setSelectedDish(dish);
    setFormData({
      dishName: dish.dishName,
      dishPrice: dish.dishPrice,
      dishImage: dish.dishImage,
      dishDetail: dish.dishDetail
    });
    setIsModalOpen(true);
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="menu-container">
      <h1 className="menu-title">My Restaurant Menu</h1>

      {/* Add button */}
      {isAdmin && (
        <button className="add-button" onClick={() => setIsModalOpen(true)}>
          Add Dish
        </button>
      )}

      {/* Menu grid */}
      <div className="menu-grid">
        {dishes.map((dish) => (
          <div key={dish.dishId} className="menu-item">
            <div className="menu-item-image">
              <img src={dish.dishImage} alt={dish.dishName} />
            </div>
            <div className="menu-item-content">
              <h3 className="dish-name">{dish.dishName}</h3>
              <p className="dish-detail">{dish.dishDetail}</p>
              <div className="dish-price">{dish.dishPrice} $</div>
              {isAdmin && (
                <div className="dish-actions">
                  <button onClick={() => openEditModal(dish)}>Edit</button>
                  <button onClick={() => handleDelete(dish.dishId)}>Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal form */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedDish ? "Edit Dish" : "Add Dish"}</h2>
            <form onSubmit={selectedDish ? handleEdit : handleAdd}>
              <div className="form-group">
                <label>Dish Name:</label>
                <input
                  type="text"
                  name="dishName"
                  value={formData.dishName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  name="dishPrice"
                  value={formData.dishPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="text"
                  name="dishImage"
                  value={formData.dishImage}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="dishDetail"
                  value={formData.dishDetail}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-actions">
                <button type="submit">
                  {selectedDish ? "Update" : "Add"}
                </button>
                <button type="button" onClick={() => {
                  setIsModalOpen(false);
                  setSelectedDish(null);
                  setFormData({
                    dishName: "",
                    dishPrice: "",
                    dishImage: "",
                    dishDetail: ""
                  });
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}