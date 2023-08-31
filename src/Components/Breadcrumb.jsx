import { Link, Typography, Breadcrumbs } from "@mui/material";
import React from "react";
import { BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Breadcrumb({
  title,
  firstRoute,
  secondRoute,
  thirdRoute,
  btnText,
  icon,
  addProduct,
  createUser,
  editUser,
  editProfile,
  save,
  showBtn
}) {
  const nav = useNavigate();
  return (
    <div>
      <div className="flex justify-between py-2 mb-2">
        <div>
          <Typography sx={{ fontSize: "1.5rem" }} gutterBottom>
            {title}
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" style={{}}>
            <Link
              sx={{ fontSize: "0.9rem" }}
              href="#"
              underline="hover"
              color="#f5f5f5"
            >
              {firstRoute}
            </Link>
            <Link
              sx={{ fontSize: "0.9rem" }}
              underline="always"
              color="#f5f5f5"
              href="#"
            >
              {secondRoute}
            </Link>
          </Breadcrumbs>
        </div>
       {
        showBtn && (
          <div className={`w-fit px-6 py-2 flex items-center gap-2 rounded font-semibold`}>
          <button
            onClick={() => {
              (createUser && nav("/create-user")) ||
                (editProfile && nav("/edit-profile") ) ||
                (editUser && nav("/user-overview"));
                save && save()
            }}
            className="bg-[#8AB4F8] text-[#161618]  px-6 py-3 flex items-center gap-2 rounded font-semibold"
          >
            {icon && <BsPlus className="text-white text-2xl" />}
            {btnText}
          </button>
        </div>
        )
       }
      </div>
    </div>
  );
}
