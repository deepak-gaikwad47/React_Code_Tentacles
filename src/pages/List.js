import React, { useEffect, useState } from "react";
import Table from "../component/VTable";
import Layout from "../component/Layout";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import useApiCall from "../hooks/useAPICall.js";

export default function List() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { callApi, error, loading } = useApiCall();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchList = async () => {
    try {
      const data = await callApi("seller-list", "GET", null, userInfo.token);
      setUserData(data.data);
    } catch (error) {
      throw new Error(error);
    }
  };
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };
  const deleteUser = async (userId) => {
    try {
      const data = await callApi(
        `seller-delete?userId=${userId}`,
        "GET",
        null,
        userInfo.token
      );
      if (!error) {
        alert(data.message);
        fetchList();
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleDelete = async (userId) => {
    deleteUser(userId);
  };
  useEffect(() => {
    if (userInfo.token) {
      fetchList();
    }
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: " Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },

    {
      title: "Action",
      render: (item) => (
        <>
          <div className="flex gap-1 text-center justify-center">
            <Link to="#" onClick={() => handleDelete(item.userId)}>
              <Trash2 color="#ff0000" size={16} />
            </Link>
          </div>
        </>
      ),
      key: "action",
      width: 90,
    },
  ];
  return (
    <>
      <Layout>
        <div className="bg-white p-4 mb-2 rounded-lg  dark:border-gray-700 mt-14">
          <div>
            <h3 class="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">
              List
            </h3>
          </div>
        </div>
        <div className="bg-white">
          <div className="p-4 rounded-lg dark:border-gray-700 ">
            <div className="flex justify-end mb-3 p-2">
              <Link
                to="/Stepperform"
                className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
              >
                Add
              </Link>
            </div>
            {userData.length < 0 ? (
              <p>No user found</p>
            ) : (
              <Table
                cols={columns}
                data={userData}
                totalPages={Math.ceil(userData.length / rowsPerPage)}
                page={currentPage}
                handlePageChange={handlePageChange}
                handleRowsPerPageChange={handleRowsPerPageChange}
                isTableLoading={loading}
              />
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
