import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/authContext";
import URL_API from "../Services/APIlink";
import jwtDecode from "jwt-decode";

export default function PostPublicationForm({ loading, setLoading }) {
  const [form, setForm] = useState({});
  const { token } = useContext(AuthContext);
  const { userPicture } = jwtDecode(token);

  function handleForm({ target: { value, name } }) {
    setForm({ ...form, [name]: value });
  }

  function sendForm(e) {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${URL_API}/post`, form, {
        headers: {
          Authorization: `Bearer ${token}
            `,
        },
      })
      .then((a) => {
        alert(a.data);
        setForm({});
        setLoading(false);
        setLoading(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
        alert("Houve um erro ao publicar o seu link.");
      });
  }

  return (
    <FormContainer>
      <DesktopForm>
        <img alt="user" src={userPicture} />
      </DesktopForm>
      <div>
        <h1>What are you going to share today?</h1>
        {!loading && (
          <PublicationForm onSubmit={sendForm}>
            <UrlInput
              onChange={handleForm}
              placeholder="http://..."
              name="url"
              type="url"
              required
            />
            <DescriptionInput
              onChange={handleForm}
              placeholder="Awesome article about #javascript"
              name="description"
              type="text"
            />
            <SubmitButton>
              <button>Publish</button>
            </SubmitButton>
          </PublicationForm>
        )}
        {loading && (
          <PublicationForm>
            <UrlInput disabled placeholder="http://..." />
            <DescriptionInput
              disabled
              placeholder="Awesome article about #javascript"
            />
            <SubmitButton>
              <button disabled>Publishing...</button>
            </SubmitButton>
          </PublicationForm>
        )}
      </div>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  width: 611px;
  border-radius: 16px;
  background-color: white;
  height: 209px;
  font-family: "Lato", sans-serif;
  > div:nth-child(2) {
    width: 100%;
    > h1 {
      height: 42px;
      display: flex;
      align-items: flex-end;
      font-weight: 300;
      font-size: 17px;
      color: #707070;
    }
  }
  @media (max-width: 600px) {
    width: 100%;
    border-radius: 0;
    height: 164px;
    > div:nth-child(2) {
      > h1 {
        height: 42px;
        justify-content: center;
        align-items: center;
        width: 100%;
        font-weight: 300;
        font-size: 17px;
        color: #707070;
      }
    }
  }
`;

const DesktopForm = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
  width: 86px;
  > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 18px;
    margin-top: 16px;
    object-fit: cover;
  }
`;

const PublicationForm = styled.form`
  @media (max-width: 600px) {
    align-items: center;
    margin-top: 0;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;

  > input {
    width: 92%;
    border: none;
    background-color: #efefef;
    border-radius: 5px;
    box-sizing: border-box;
    ::placeholder {
      color: #949494;
      font-weight: 300;
      font-size: 13px;
    }
  }
  > input:focus {
    box-sizing: border-box;
    outline: none !important;
    border: none;
  }
`;

const UrlInput = styled.input`
  height: 30px;
  padding: 6px 11px 8px;
`;

const DescriptionInput = styled.input`
  margin-top: 5px;
  @media (max-width: 600px) {
    height: 47px;
  }
  height: 66px;
  padding: 10px 10px 21px;
`;

const SubmitButton = styled.div`
  margin-top: 5px;
  height: 35px;
  width: 92%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  > button {
    background-color: #1877f2;
    border-radius: 5px;
    width: 112px;
    height: 31px;
    border: none;
    color: #ffffff;
    font-family: "Lato";
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
    :disabled {
      background-color: #80b1ed;
    }
  }
  @media (max-width: 600px) {
    > button {
      height: 22px;
    }
  }
`;
