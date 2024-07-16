// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import AddDishForm from './AddDish';
// import { removeToken, getToken } from '../../services/LocalStorageService';
// import { unSetUserToken } from '../../features/authSlice';
// import { useGetLoggedUserQuery } from '../../services/UserAuthApi';
// import { setUserInfo, unsetUserInfo } from '../../features/userSlice';

// const Dashboard = () => {
//   const [dishes, setDishes] = useState([]);
//   const [isAddDishModalOpen, setIsAddDishModalOpen] = useState(false);
//   const [userData, setUserData] = useState({ email: '', name: '' });
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isPublished, setIsPublished] = useState(false);
//   const [editingDish, setEditingDish] = useState(null);
  
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   const { access_token } = getToken();
//   const { data, isSuccess } = useGetLoggedUserQuery(access_token);

//   useEffect(() => {
//     if (isSuccess && data) {
//       setUserData({ email: data.email, name: data.name });
//       dispatch(setUserInfo({ email: data.email, name: data.name }));
//     }
//   }, [data, isSuccess, dispatch]);

//   useEffect(() => {
//     fetchDishes();
//   }, []);

//   const fetchDishes = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/user/dishes/', {
//         headers: { Authorization: `Bearer ${access_token}` }
//       });
//       console.log(response.data); // Log the response to verify it's an array
//       if (Array.isArray(response.data)) {
//         setDishes(response.data);
//       } else {
//         console.error('API response is not an array:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching dishes:', error);
//     }
//   };

//   const handleTogglePublish = async (dishId, currentPublishedStatus) => {
//     try {
//       await axios.put(`http://localhost:8000/api/user/dishes/${dishId}`, 
//         { isPublished: !currentPublishedStatus },
//         { headers: { Authorization: `Bearer ${access_token}` } }
//       );
//       fetchDishes(); // Refresh the dishes list
//     } catch (error) {
//       console.error('Error toggling publish status:', error);
//     }
//   };

//   const handleUpdateDish = async (updatedDish) => {
//     try {
//       await axios.put(`http://localhost:8000/api/user/dishes/${updatedDish.dishId}`, 
//         updatedDish,
//         { headers: { Authorization: `Bearer ${access_token}` } }
//       );
//       fetchDishes(); // Refresh the dishes list
//       setIsEditModalOpen(false);
//     } catch (error) {
//       console.error('Error updating dish:', error);
//     }
//   };

//   const handleAddDish = async (newDish) => {
//     try {
//       await axios.post('http://localhost:8000/api/user/dishes/', 
//         newDish,
//         { headers: { Authorization: `Bearer ${access_token}` } }
//       );
//       fetchDishes(); // Refresh the dishes list
//       setIsAddDishModalOpen(false);
//     } catch (error) {
//       console.error('Error adding dish:', error);
//     }
//   };

//   const handleLogout = () => {
//     dispatch(unsetUserInfo({ name: '', email: '' }));
//     dispatch(unSetUserToken({ access_token: null }));
//     removeToken();
//     navigate('/home');
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="bg-gray-800 text-white w-1/4 p-6">
//         <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
//         <h3 className="text-lg mb-2">Email: {userData.email}</h3>
//         <h4 className="text-lg mb-6">Name: {userData.name}</h4>
//         <button 
//           onClick={handleLogout} 
//           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
//         <h2 className="text-3xl font-bold mb-4">Your Dishes</h2>
//         <button
//           onClick={() => setIsAddDishModalOpen(true)}
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
//         >
//           Add New Dish
//         </button>
//         {isAddDishModalOpen && (
//           <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
//             <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//               <div className="mt-3 text-center">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Dish</h3>
//                 <div className="mt-2 px-7 py-3">
//                   <AddDishForm onAdd={handleAddDish} />
//                 </div>
//                 <div className="items-center px-4 py-3">
//                   <button
//                     className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
//                     onClick={() => setIsAddDishModalOpen(false)}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {dishes.map((dish) => (
//             <div key={dish.dishId} className="bg-white shadow-md rounded-md p-4">
//               <h2 className="text-lg font-bold mb-2">{dish.dishName}</h2>
//               <img
//                 src={dish.imageUrl}
//                 alt={dish.dishName}
//                 className="rounded-md mb-2"
//                 style={{ maxWidth: '100%' }}
//               />
//               <p className="mb-2">Published: {dish.isPublished ? 'Yes' : 'No'}</p>
//               <div className="flex space-x-4">
//                 <button
//                   onClick={() => handleTogglePublish(dish.dishId, dish.isPublished)}
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   {dish.isPublished ? 'Unpublish' : 'Publish'}
//                 </button>
//                 <button
//                   onClick={() => {
//                     setEditingDish(dish);
//                     setIsEditModalOpen(true);
//                   }}
//                   className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={() => navigate(`/dishdetails/${dish.dishId}`)}
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         {isEditModalOpen && (
//           <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
//             <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//               <div className="mt-3 text-center">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Dish</h3>
//                 <div className="mt-2 px-7 py-3">
//                   <AddDishForm dish={editingDish} onAdd={handleUpdateDish} />
//                 </div>
//                 <div className="items-center px-4 py-3">
//                   <button
//                     className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
//                     onClick={() => setIsEditModalOpen(false)}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddDishForm from './AddDish';
import { removeToken, getToken } from '../../services/LocalStorageService';
import { unSetUserToken } from '../../features/authSlice';
import { useGetLoggedUserQuery } from '../../services/UserAuthApi';
import { setUserInfo, unsetUserInfo } from '../../features/userSlice';

const Dashboard = () => {
  const [dishes, setDishes] = useState([]);
  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState(false);
  const [userData, setUserData] = useState({ email: '', name: '' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);

  useEffect(() => {
    if (isSuccess && data) {
      setUserData({ email: data.email, name: data.name });
      dispatch(setUserInfo({ email: data.email, name: data.name }));
    }
  }, [data, isSuccess, dispatch]);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/dishes/', {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      if (Array.isArray(response.data)) {
        setDishes(response.data);
      } else {
        console.error('API response is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const handleTogglePublish = async (dishId, currentPublishedStatus) => {
    try {
      await axios.put(`http://localhost:8000/api/user/dishes/${dishId}`, 
        { isPublished: !currentPublishedStatus },
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      fetchDishes(); // Refresh the dishes list
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  const handleUpdateDish = async (updatedDish) => {
    try {
      await axios.put(`http://localhost:8000/api/user/dishes/${updatedDish.dishId}`, 
        updatedDish,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      fetchDishes(); // Refresh the dishes list
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating dish:', error);
    }
  };

  const handleAddDish = async (newDish) => {
    try {
      await axios.post('http://localhost:8000/api/user/dishes/', 
        newDish,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      fetchDishes(); // Refresh the dishes list
      setIsAddDishModalOpen(false);
    } catch (error) {
      console.error('Error adding dish:', error);
    }
  };

  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: '', email: '' }));
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    navigate('/home');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-1/4 p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <h3 className="text-lg mb-2">Email: {userData.email}</h3>
        <h4 className="text-lg mb-6">Name: {userData.name}</h4>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-4">Your Dishes</h2>
        <button
          onClick={() => setIsAddDishModalOpen(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add New Dish
        </button>
        {isAddDishModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Dish</h3>
                <div className="mt-2 px-7 py-3">
                  <AddDishForm onAdd={handleAddDish} />
                </div>
                <div className="items-center px-4 py-3">
                  <button
                    className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                    onClick={() => setIsAddDishModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {dishes.map((dish) => (
          
            <div key={dish.id} className="bg-white shadow-md rounded-md p-4">
              {/* {console.log(dish.id)} */}
              <h2 className="text-lg font-bold mb-2">{dish.dishName}</h2>
              <img
                src={dish.imageUrl}
                alt={dish.dishName}
                className="rounded-md mb-2"
                style={{ maxWidth: '100%' }}
              />
              <p className="mb-2">Published: {dish.isPublished ? 'Yes' : 'No'}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleTogglePublish(dish.id, dish.isPublished)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {dish.isPublished ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => {
                    setEditingDish(dish);
                    setIsEditModalOpen(true);
                  }}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => navigate(`/dish/${dish.id}`)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Dish</h3>
                <div className="mt-2 px-7 py-3">
                  <AddDishForm dish={editingDish} onAdd={handleUpdateDish} />
                </div>
                <div className="items-center px-4 py-3">
                  <button
                    className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
