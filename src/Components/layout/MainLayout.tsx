import React from "react";
import MainHeader from "../Header/MainHeader";
import MainFooter from "../Footer/MainFooter";
import { Outlet, useNavigation } from "react-router";
import Spin_loader from "../Loader/Spin_loader";

const MainLayout = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <>
      <MainHeader />

      {isLoading ? (
        <div className="min-h-[80vh] w-full flex justify-center items-center">
          <Spin_loader
            width={50}
            height={50}
            color="green"
            border={3}
          />
        </div>
      ) : (
        <Outlet />
      )}

      <MainFooter />
    </>
  );
};

export default React.memo(MainLayout);