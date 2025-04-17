import React, { useState, useEffect } from "react";
import { Task, TaskAlt } from "@mui/icons-material";
import useEmail from "./../auth/email";

const TaskHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [tasks, setTasks] = useState([]);

  const email = useEmail(); // Email এর জন্য হুক

  // Load tasks from localStorage based on email
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(`tasks_${email}`));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, [email]);

  // Save tasks to localStorage based on email
  useEffect(() => {
    if (email) {
      localStorage.setItem(`tasks_${email}`, JSON.stringify(tasks));
    }
  }, [tasks, email]);

  // Modal Control
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setTaskName("");
    setDeadline("");
    setAssignedTo("");
    setIsModalOpen(false);
  };

  const handleTaskAdd = () => {
    if (taskName && deadline && assignedTo) {
      const newTask = {
        name: taskName,
        deadline,
        assignedTo,
        status: "Pending", // Default status is "Pending"
      };
      setTasks([...tasks, newTask]);
      closeModal();
    }
  };

  const handleStatusChange = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      if (updatedTasks[index].status !== "Complete") {
        updatedTasks[index].status = "Complete"; // Mark the task as "Complete"
      }
      return updatedTasks;
    });
  };

  const handleDelete = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Card */}
      <div
        onClick={openModal}
        className="cursor-pointer bg-white border border-blue-200 rounded-xl p-6 shadow-md flex items-center gap-4 hover:bg-blue-50 transition"
      >
        <Task style={{ fontSize: 50, color: "blue" }} />
        <h2 className="text-xl font-semibold text-gray-800">
          ব্যক্তিগত/পারিবারিক টাস্ক তৈরি করুন
        </h2>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:w-[2500px] md:grid-cols-2 gap-6">
        {/* Task List */}
        <div className="bg-white border max-w-7xl border-green-200 rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <TaskAlt style={{ fontSize: 50, color: "green" }} />
            <h2 className="text-lg font-semibold text-gray-800">টাস্ক লিস্ট</h2>
          </div>

          {tasks.length === 0 ? (
            <p className="text-gray-600 text-sm">
              এখানে টাস্ক তালিকা দেখা যাবে।
            </p>
          ) : (
            <div className="overflow-x-auto ">
              <table className="min-w-full text-sm border border-gray-200">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="p-2 border">টাস্ক</th>
                    <th className="p-2 border">ডেডলাইন</th>
                    <th className="p-2 border">অ্যাসাইন টু</th>
                    <th className="p-2 border">স্ট্যাটাস</th>
                    <th className="p-2 border">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="p-2 border">{task.name}</td>
                      <td className="p-2 border">{task.deadline}</td>
                      <td className="p-2 border">{task.assignedTo}</td>
                      <td className="p-2 border">
                        {task.status === "Complete" ? (
                          <span className="text-green-600">Complete</span>
                        ) : (
                          <span className="text-yellow-600">Pending</span>
                        )}
                      </td>
                      <td className="p-2 border">
                        {task.status !== "Complete" && (
                          <button
                            onClick={() => handleStatusChange(index)}
                            className="px-2 py-1 text-white bg-blue-600 rounded"
                          >
                            Complete
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(index)}
                          className="ml-2 px-2 py-1 text-white bg-red-600 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border border-red-200 rounded-lg p-6 w-full max-w-md space-y-4 relative shadow-lg">
            <h2 className="text-lg font-bold text-gray-800">
              নতুন টাস্ক যোগ করুন
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  টাস্কের নাম
                </label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="যেমন: বাজার করা"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ডেডলাইন
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  সদস্য নির্ধারণ
                </label>
                <input
                  type="name"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                বাতিল
              </button>
              <button
                onClick={handleTaskAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                সংরক্ষণ করুন
              </button>
            </div>

            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskHome;
