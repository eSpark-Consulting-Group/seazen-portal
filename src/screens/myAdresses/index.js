import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@mui/material";

import Card from "../../components/adressList";
import MyAddresses from "../../components/header/myAdresses";
import { AddressesButton } from "../../components/adressList/addressesButton";

import getAllAddress from "../../api/address/getAddress";

import { getAddress } from "../../store/reducers/addressSlice";

import deleteAddressApiCall from "../../api/address/deleteAddress";

import "./style.css";

const App = () => {
  const isToken = useSelector((state) => state.auth.token);
  const { addressData } = useSelector((state) => state.address);

  const dispatch = useDispatch();

  // const [cardData, setCardData] = useState([]);
  const [open, setOpen] = useState(false);
  // const [isLoading, setIsloading] = useState(false);

  const fetchFunction = async () => {
    getAllAddress(isToken).then((res) => {
      if (res.success === "ok") {
        dispatch(getAddress(res.data));
        setOpen(false);
      }
    });
  };

  const { isLoading, refetch } = useQuery({
    queryFn: () => getAllAddress(isToken),
    onSuccess: (data) => {
      dispatch(getAddress(data.data));
    },
  });

  const deleteAddress = (id) => {
    deleteAddressApiCall(id, isToken).then((res) => {
      if (res.statusCode === 200) {
        fetchFunction();
      }
    });
  };

  // const cardData = [
  //   {
  //     id: 1,
  //     title: "Home  ",
  //     title2: "Salmiya",
  //     iconUrl: "/assets/img/salmiya home.svg",
  //     name: "Salmiya",
  //     block: "Block 11, Oman Street,",
  //     home: "Home No: 33, ",
  //     floor: "Floor: 2 Flat: 4",
  //     AdditionalDirections: "Across BE School",
  //   },
  //   {
  //     id: 2,
  //     title: "Appart",
  //     title2: "Salmiya",
  //     iconUrl: "/assets/img/salmiya appart.svg",
  //     name: "Salmiya",
  //     block: "Block 11, Oman Street,",
  //     home: "Building No: 33, Sahar Building",
  //     floor: "Floor: 10 Flat: 20",
  //     AdditionalDirections: "Across BE School",
  //   },
  //   {
  //     id: 3,
  //     title: "Office",
  //     title2: "Salmiya",
  //     iconUrl: "/assets/img/salmiya office.svg",
  //     name: "Salmiya",
  //     block: "Block 11, Oman Street,",
  //     home: "Building No: 33, Sahar Building",
  //     floor: "loor: 10, Seazen Office",
  //     AdditionalDirections: "Across BE School",
  //   },
  // ];

  return (
    <div className="app ">
      <MyAddresses title="Your Addresses" />
      {isLoading
        ? Array.from({ length: 3 }).map((_) => (
            <>
              <div className="skeleton-container container-fluid">
                <div className="skeleton-header">
                  <div>
                    <Skeleton
                      className="skeleton-title"
                      variant="text"
                      width={50}
                      height={20}
                    />
                    <Skeleton
                      className="skeleton-title2  "
                      variant="text"
                      width={50}
                      height={20}
                    />
                  </div>
                  <div className="skeleton-button">
                    <Skeleton
                      className="skeleton-btn"
                      variant="text"
                      width={"30%"}
                      height={45}
                    />
                    <Skeleton variant="text" width={"30%"} height={45} />
                  </div>
                </div>
                <Skeleton
                  className="skeleton-dots"
                  variant="text"
                  width={"90%"}
                  height={2}
                />

                <div className="skeleton-detail">
                  <div>
                    <Skeleton
                      className="skeleton-title"
                      variant="text"
                      width={50}
                      height={20}
                    />
                    <Skeleton
                      className="skeleton-title2  "
                      variant="text"
                      width={70}
                      height={20}
                    />
                    <Skeleton
                      className="skeleton-title"
                      variant="text"
                      width={60}
                      height={20}
                    />
                    <Skeleton
                      className="skeleton-title2"
                      variant="text"
                      width={60}
                      height={20}
                    />
                    {/* <Skeleton
                      className="skeleton-title2"
                      variant="text"
                      width={40}
                      height={10}
                    />
                    <Skeleton
                      className="skeleton-title2"
                      variant="text"
                      width={40}
                      height={10}
                    /> */}
                  </div>

                  <div>
                    <Skeleton
                      className="skeleton-rectangular"
                      variant="rectangular"
                    />
                  </div>
                </div>
              </div>
            </>
          ))
        : addressData.length &&
          addressData.map((data) => (
            <div key={data.id}>
              <Card
                iconUrl={
                  data.address_type === "house"
                    ? "/assets/img/salmiya home.svg"
                    : data.address_type === "appartment"
                    ? "/assets/img/salmiya appart.svg"
                    : "/assets/img/salmiya office.svg"
                }
                data={data}
                open={open}
                setOpen={setOpen}
                deleteAddress={deleteAddress}
              />
            </div>
          ))}
      <AddressesButton />
    </div>
  );
};

export default App;
