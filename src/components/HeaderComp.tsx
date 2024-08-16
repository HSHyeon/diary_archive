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
  background-color: ${({ theme }) => theme.colors.main};
  height: 60px;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;

`