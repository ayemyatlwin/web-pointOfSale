import React, { useState } from "react";
import Button from "../../Components/Button";
import { BiChevronDown } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../Components/Breadcrumb";
import StepThree from "../../Components/User/StepThree";
import StepTwo from "../../Components/User/StepTwo";
import StepOne from "../../Components/User/StepOne";
import UserRef from "../../Components/User/UserRef";
import Cookies from "js-cookie";
import {
  useCreateUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../../Feature/API/userApi";
import { useSelector } from "react-redux";

export default function EditUser() {
  const nav = useNavigate();
  const token = Cookies.get("token");
  const { id } = useParams();
  const editImage = document.querySelector(".file");
  const [state, setState] = useState({
    stepOne: true,
    stepTwo: false,
  });
  const handleStep2 = () => {
    setState({
      stepTwo: true,
      stepOne: false,
    });
  };

  console.log(state);
  const [select, setSelect] = useState(false);
  const [display, setDisplay] = useState("Admin");
  const toggleSelect = () => {
    setSelect(!select);
  };

  const editUserData = useSelector((state) => state.userSlice);
  console.log(editUserData);
  const name = editUserData?.name;
  const email = editUserData?.email;
  const phone = editUserData?.phone;
  const gender = editUserData?.gender;
  const address = editUserData?.address;
  const date_of_birth = editUserData?.date_of_birth;
  const password = editUserData?.password;
  const password_confirmation = editUserData?.password_confirmation;
  const updateUserData = {
    name,
    email,
    phone,
    gender,
    address,
    date_of_birth,
    password,
    password_confirmation,
  };
  console.log(updateUserData);

  const { data } = useGetSingleUserQuery({ token, id });

  const [updateUser] = useUpdateUserMutation();

  const handleEditUser = async (e) => {
    e.preventDefault();
    const { data } = await updateUser({ updateUserData, id, token });
    console.log(data);
    data?.message === "User info is updated successfully" &&
      nav("/user-overview");
  };
  return (
    <>
      {/* path breadcrumbs */}
      <div>
        <Breadcrumb
        showBtn={true}
          editUser
          btnText={"User list"}
          title={"User"}
          firstRoute={"User"}
          secondRoute={"Edit User"}
        />
      </div>
      {/* path breadcrumbs */}

      <main className="mt-7">
        <form action="" className={`flex gap-10`}>
          {/* Personal Info */}
          {state.stepOne && (
            <div className="w-[70%]">
              <StepOne userEdit token={token} id={id} />
            </div>
          )}
          {/* Login Info  */}
          {state.stepTwo && (
            <div className="w-[70%]">
              <StepTwo
                select={select}
                toggleSelect={toggleSelect}
                display={display}
                setDisplay={setDisplay}
                userEdit
                token={token}
                id={id}
              />
            </div>
          )}

          {/* Step Indicator  */}
          <section className={`w-[30%] flex flex-col justify-center`}>
            <div className="flex items-center gap-3 my-3">
              <div
                className={`w-10 h-10 border rounded-full p-1 flex items-center justify-center`}
              >
                <p>1</p>
              </div>
              <p>Information</p>
            </div>
            <div className="border-l py-10 ml-5"></div>
            <div className="flex items-center gap-3 my-3">
              <div
                className={`w-10 h-10 border rounded-full p-1 flex items-center justify-center`}
              >
                <p>2</p>
              </div>
              <p>Password</p>
            </div>

            {state.stepOne && (
              <div
                type="button"
                onClick={handleStep2}
                className="my-5 cursor-pointer"
              >
                <Button icon={true} text={"Next"} />
              </div>
            )}
            {state.stepTwo && (
              <div onClick={handleEditUser} className="my-5 cursor-pointer">
                <Button text={"Submit"} />
              </div>
            )}
          </section>
        </form>
      </main>
    </>
  );
}
