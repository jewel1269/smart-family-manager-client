import { useState, useEffect } from "react";
import axios from "axios";

const DocumentManager = ({ user }) => {
  const [documents, setDocuments] = useState([]);
  const [inputs, setInputs] = useState([
    { title: "", category: "", note: "", file: null },
  ]);
  const [search, setSearch] = useState("");
  const token = "your_jwt_token_here";

  const fetchDocuments = async () => {
    const res = await axios.get("http://localhost:5000/documents", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setDocuments(res.data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleInputChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const addInput = () => {
    setInputs([...inputs, { title: "", category: "", note: "", file: null }]);
  };

  const removeInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    inputs.forEach((input, index) => {
      if (input.file) formData.append(`file${index}`, input.file);
      formData.append(`title${index}`, input.title);
      formData.append(`category${index}`, input.category);
      formData.append(`note${index}`, input.note);
    });

    formData.append("count", inputs.length);

    await axios.post("http://localhost:5000/documents/upload", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setInputs([{ title: "", category: "", note: "", file: null }]);
    fetchDocuments();
    alert("আপলোড সফল হয়েছে!");
  };

  const handleDelete = async (id) => {
    if (!user?.role || user.role !== "admin") return alert("শুধুমাত্র অ্যাডমিন ডিলিট করতে পারবে");

    await axios.delete(`http://localhost:5000/documents/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchDocuments();
  };

  const filteredDocs = documents.filter((doc) =>
    doc.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">📁 Smart Family Document & Notes Manager</h2>

      <form onSubmit={handleUpload} className="space-y-4 bg-white p-4 rounded shadow">
        {inputs.map((input, idx) => (
          <div key={idx} className="border p-3 rounded space-y-2 bg-gray-50">
            <input
              type="text"
              placeholder="ডকুমেন্ট শিরোনাম"
              value={input.title}
              onChange={(e) => handleInputChange(idx, "title", e.target.value)}
              className="w-full px-3 py-1 border rounded"
              required
            />
            <input
              type="text"
              placeholder="ক্যাটাগরি (যেমন: Prescription, Bill)"
              value={input.category}
              onChange={(e) => handleInputChange(idx, "category", e.target.value)}
              className="w-full px-3 py-1 border rounded"
              required
            />
            <textarea
              placeholder="নোট"
              value={input.note}
              onChange={(e) => handleInputChange(idx, "note", e.target.value)}
              className="w-full px-3 py-1 border rounded"
            ></textarea>
            <input
              type="file"
              onChange={(e) => handleInputChange(idx, "file", e.target.files[0])}
              className="block"
            />
            {inputs.length > 1 && (
              <button
                type="button"
                onClick={() => removeInput(idx)}
                className="text-red-500 text-sm"
              >
                এই ইনপুট মুছুন
              </button>
            )}
          </div>
        ))}
        <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={addInput}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          নতুন ইনপুট যোগ করুন
        </button>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          আপলোড করুন
        </button>
        </div>
      </form>

      <input
        type="text"
        placeholder="ক্যাটাগরি সার্চ করুন..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />

      <div className="space-y-3">
        {filteredDocs.map((doc) => (
          <div key={doc._id} className="border p-3 rounded shadow flex justify-between items-center">
            <div>
              <h4 className="font-semibold">{doc.title}</h4>
              <p className="text-sm text-gray-600">📂 {doc.category}</p>
              {doc.note && <p className="text-sm text-gray-500">📝 {doc.note}</p>}
              <a
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline text-sm"
              >
                ডকুমেন্ট দেখুন
              </a>
            </div>
            {user?.role === "admin" && (
              <button
                onClick={() => handleDelete(doc._id)}
                className="text-red-600 hover:underline"
              >
                ডিলিট
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentManager;
