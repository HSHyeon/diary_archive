import Link from "next/link";
import React from "react";
import styled from "styled-components";

function HeaderComp() {
  return (
    <>
    <Header>
      <Link href={"/"}>HOME</Link>
      <Link href={"/calendar"}>CALENDAR</Link>
      <Link href={"/add"}>
        일기 등록
      </Link></Header>
    </>
  );
}

export default HeaderComp;

const Header = styled.header`
  display: flex;
  position: fixed;
  align-items: center;
  z-index: 100;
  justify-content: space-between;
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;

`