import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios"; // Ensure axios is installed
import { BaseUri } from "../../constants/uri";
import toast, { Toaster } from "react-hot-toast";
import useEmail from "../auth/email";
import useSemester from "../../hooks/useSemester";
import enToBn from "../en-to-bn/en-to-bn";

const Semester = () => {
  const [open, setOpen] = useState(false);
  const email = useEmail();
  const [formData, setFormData] = useState({
    email: email,
    semesterNo: "",
    creditNo: "",
    sgpa: "",
    tuitionFee: "",
    regFee: "",
  });

  const { data, refetch } = useSemester();

  const semesters = data?.data || [];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSemester = async () => {
    const tuitionFee60 = parseFloat(formData.tuitionFee) * 0.6;
    const totalTuitionFee = formData?.tuitionFee - tuitionFee60;

    const newSemester = {
      email: email,
      semesterNo: formData.semesterNo,
      creditNo: parseInt(formData.creditNo),
      sgpa: parseFloat(formData.sgpa),
      tuitionFee: totalTuitionFee,
      regFee: parseFloat(formData.regFee),
    };

    setFormData({
      semesterNo: "",
      creditNo: "",
      sgpa: "",
      tuitionFee: "",
      regFee: "",
    });
    setOpen(false);

    try {
      const response = await axios.post(
        `${BaseUri}/api/v1/semester/create`,
        newSemester
      );
      if (response.status === 200) {
        toast.success("সেমিস্টার তথ্য সফলভাবে সংরক্ষণ করা হয়েছে।");
        refetch();
      }
    } catch (error) {
      console.error("ডেটা পাঠাতে সমস্যা হয়েছে:", error);
    }
  };

  const totalDue = semesters.reduce(
    (acc, cur) => acc + cur.tuitionFee + cur.regFee,
    0
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BaseUri}/api/v1/semester/delete/${id}`);
      toast.success("🗑️ সফলভাবে ডিলিট হয়েছে!");
      refetch();
    } catch (err) {
      toast.error("❌ ডিলিট করতে সমস্যা হয়েছে");
      console.error(err);
    }
  };

  const calculateCGPA = () => {
    let cgpas = [];
    for (let i = 0; i < semesters.length; i += 3) {
      const group = semesters.slice(i, i + 3);
      if (group.length === 3) {
        const avg =
          group.reduce((sum, sem) => sum + sem.sgpa, 0) / group.length;
        cgpas.push({ index: i + 1, cgpa: avg.toFixed(2) });
      }
    }
    return cgpas;
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-2 sm:mb-0">সেমিস্টার তালিকা</h2>
        <div className="flex flex-col sm:flex-row items-center">
          <span className="text-red-500 font-semibold mr-4">
            মোট খরচ : {enToBn(totalDue.toFixed(2))} টাকা
          </span>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            সেমিস্টার যোগ করুন
          </Button>
        </div>
      </div>

      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">সেমিস্টার</th>
            <th className="border p-2">ক্রেডিট</th>
            <th className="border p-2">SGPA</th>
            <th className="border p-2">৬০% টিউশন ফি</th>
            <th className="border p-2">রেজি: ফি</th>
            <th className="border p-2">মোট টাকা</th>
            <th className="border p-2">অ্যাকশন</th>
          </tr>
        </thead>
        <tbody>
          {semesters.map((sem, idx) => (
            <tr key={idx}>
              <td className="border p-2">{enToBn(sem.semesterNo)}</td>
              <td className="border p-2">{enToBn(sem.creditNo)}</td>
              <td className="border p-2">{enToBn(sem.sgpa)}</td>
              <td className="border p-2">{enToBn(sem.tuitionFee)} ৳</td>
              <td className="border p-2">{enToBn(sem.regFee)} ৳</td>
              <td className="border p-2">
                {enToBn(sem.regFee + sem?.tuitionFee)} ৳
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(sem._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  ডিলিট
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">প্রতি ৩ সেমিস্টারে CGPA</h3>
        <ul className="list-disc ml-5">
          {calculateCGPA().map((cg, idx) => (
            <li key={idx}>
              সেমিস্টার {cg.index} - {cg.index + 2}: CGPA = {cg.cgpa}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle className="lg:w-96">নতুন সেমিস্টার তথ্য</DialogTitle>
          <DialogContent className="flex flex-col gap-4 mt-2">
            <TextField
              name="semesterNo"
              label="সেমিস্টার নম্বর"
              variant="outlined"
              value={formData.semesterNo}
              onChange={handleChange}
            />
            <TextField
              name="creditNo"
              label="ক্রেডিট নম্বর"
              type="number"
              variant="outlined"
              value={formData.creditNo}
              onChange={handleChange}
            />
            <TextField
              name="sgpa"
              label="SGPA"
              type="number"
              variant="outlined"
              value={formData.sgpa}
              onChange={handleChange}
            />
            <TextField
              name="tuitionFee"
              label="টিউশন ফি (পূর্ণাঙ্গ)"
              type="number"
              variant="outlined"
              value={formData.tuitionFee}
              onChange={handleChange}
            />
            <TextField
              name="regFee"
              label="রেজি: ফি"
              type="number"
              variant="outlined"
              value={formData.regFee}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>বাতিল</Button>
            <Button variant="contained" onClick={handleAddSemester}>
              যোগ করুন
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Toaster />
    </div>
  );
};

export default Semester;
