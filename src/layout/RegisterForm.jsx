import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    name: '',
    lastname: '',
    phone: '',
  });

  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async e => {
    try {
      e.preventDefault();
      // Validation
      if (input.password !== input.confirmPassword) {
        return alert('Please check confirm password');
      }
      const rs = await axios.post('http://localhost:8889/auth/register', input);
      console.log(rs);
      if (rs.status === 200) {
        Swal.fire({
          title: "สมัครสมาชิกเรียบร้อย",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });
        navigate('/');
      }
    } catch (err) {
      console.log(err.message);
    }
  };




  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen mt-[40px]">
      <div className="text-3xl mb-5"></div>
      <form 
        className="flex h-[calc(100vh-95px)] flex-col justify-center items-center outline-none border-10 w-[30rem] h-[35rem] rounded-[25px] shadow-md mt-20 transition duration-500 ease-in-out transform" 
        onSubmit={hdlSubmit}
      >
        <p className="font-semibold text-base text-[#5473E3] text-center">สมัครสมาชิก</p>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="username"
            value={input.username}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">E-mail</span>
          </div>
          <input
            type="email"
            className="input input-bordered w-full max-w-xs"
            name="email"
            value={input.email}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="name"
            value={input.name}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Last Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="lastname"
            value={input.lastname}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Phone</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="phone"
            value={input.phone}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="password"
            value={input.password}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Confirm Password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={hdlChange}
          />
        </label>
        <div className="flex gap-5">
          <button type="submit" className="btn btn-outline btn-info mt-7">Submit</button>
        </div>
      </form>

      <button 
        onClick={handleNavigate} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        ลงชื่อเข้าใช้
      </button>
    </div>
  );
}
