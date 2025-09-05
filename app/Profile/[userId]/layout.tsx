import React, { ReactNode } from "react";
import UserHeader from "../../Components/UserHeader";
import UserFooter from "../../Components/UserFooter";

interface Props {
  children: ReactNode;
}

export default function ProfileLayout({ children }: Props) {
  return (
    <>
      <UserHeader />
      <main>{children}</main>
      <UserFooter />
    </>
  );
}
