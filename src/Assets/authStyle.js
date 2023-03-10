import styled from "styled-components";

const ManagingContainers = styled.div`
  display: flex;
  max-height: 100vh;
  background-color: #151515;
  @media (max-width: 800px) {
    flex-direction: column;
  } ;
`;

const MainContainer = styled.div`
  background-color: #151515;
  height: 100vh;
  width: 70vw;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  @media (max-width: 800px) {
    height: 300px;
    width: 100%;
  } ;
`;

const LogoContainer = styled.div`
  width: 30vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 800px) {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 85%;
  } ;
`;

const SecondContainer = styled.div`
  background-color: #333333;
  height: 100vh;
  width: 40vw;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  @media (max-width: 800px) {
    width: 100%;
  } ;
`;

const Logo = styled.div`
  margin-bottom: 5px;
  color: #ffffff;
  font-weight: 700;
  font-size: 120px;
  font-family: "Passion One";
  @media (max-width: 800px) {
    font-size: 70px;
    margin-bottom: 10px;
  } ;
`;

const Slogan = styled.div`
  font-family: "Oswald";
  font-size: 30px;
  font-weight: 700;
  color: #ffffff;
  h1 {
    margin-bottom: 15px;
  }
  @media (max-width: 800px) {
    font-size: 25px;
  } ;
`;

const ContainerInformation = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 800px) {
    height: 60vh;
  }
`;

const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  input {
    height: 65px;
    width: 80%;
    background-color: #ffffff;
    border-radius: 6px;
    border: none;
    font-family: "Oswald";
    font-size: 27px;
    color: #9f9f9f;
    margin-bottom: 10px;
  }
  @media (max-width: 800px) {
    input {
      height: 55px;
    }
  } ;
`;

const Button = styled.button`
  background-color: #1877f2;
  height: 65px;
  width: 80%;
  border-radius: 6px;
  border: none;
  font-family: "Oswald";
  font-size: 27px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1.0")};
  @media (max-width: 800px) {
    height: 55px;
  } ;
`;

const RedirecitonText = styled.div`
  font-size: 20px;
  font-family: lato;
  color: #ffffff;
  margin-top: 20px;
  @media (max-width: 800px) {
    font-size: 17px;
  } ;
`;

export {
  ManagingContainers,
  MainContainer,
  LogoContainer,
  SecondContainer,
  Logo,
  Slogan,
  ContainerInformation,
  ContainerForm,
  Button,
  RedirecitonText,
};
