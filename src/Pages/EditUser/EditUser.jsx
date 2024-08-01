import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SpinnerImg from "../../assets/Spinner.gif";
import UserLogin from "../../assets/users.json";

const EditUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f8f8f8;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 31.25rem;
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.3125rem;
  color: #333;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 0.0625rem solid #ccc;
  border-radius: 0.25rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #006400;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: #004d00;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ff0000;

  &:hover {
    background-color: #cc0000;
  }
`;

const Heading = styled.h1`
  color: #333;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const SpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  margin-top: 1rem;
`;

const EditUser = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    jobPosition: "",
    jobDescription: "",
    email: "",
    phone: "",
    startDate: "",
    status: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUsername = localStorage.getItem("loggedInUsername");
    const userData = loggedInUsername
      ? UserLogin.find((user) => user.username === loggedInUsername)
      : null;

    if (userData) {
      setUser(userData);
      setFormData({
        username: userData.username,
        fullName: userData.full_name,
        jobPosition: userData.job_position,
        jobDescription: userData.job_description,
        email: userData.email,
        phone: userData.phone,
        startDate: userData.start_date,
        status: userData.status,
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setModalMessage("User updated successfully!");
      setShowModal(true);
    }, 500);
  };

  const handleDelete = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setModalMessage("User deleted successfully!");
      setShowModal(true);

      const updatedUsers = UserLogin.filter(
        (u) => u.username !== formData.username
      );
      localStorage.removeItem("loggedInUsername");

      console.log("Updated users list: ", updatedUsers);
    }, 300);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/dashboard");
  };

  if (!user) return <img src={SpinnerImg} alt="loading" />;

  return (
    <>
      <EditUserContainer>
        <Heading>Edit User</Heading>
        <Form onSubmit={handleSubmit}>
          <Label>Username:</Label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <Label>Full Name:</Label>
          <Input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          <Label>Job Position:</Label>
          <Input
            type="text"
            name="jobPosition"
            value={formData.jobPosition}
            onChange={handleChange}
          />
          <Label>Job Description:</Label>
          <Input
            type="text"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
          />
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Label>Phone:</Label>
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Label>Start Date:</Label>
          <Input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
          <Label>Status:</Label>
          <Input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
          <Button type="submit">Update</Button>
          <DeleteButton type="button" onClick={handleDelete}>
            Delete
          </DeleteButton>
        </Form>
        {loading && (
          <SpinnerContainer>
            <img src={SpinnerImg} alt="Loading..." />
          </SpinnerContainer>
        )}
        {showModal && (
          <>
            <Overlay onClick={closeModal} />
            <Modal>
              <h2>{modalMessage}</h2>
              <p>
                Username: {formData.username}
                <br />
                Full Name: {formData.fullName}
                <br />
                Job Position: {formData.jobPosition}
                <br />
                Job Description: {formData.jobDescription}
                <br />
                Email: {formData.email}
                <br />
                Phone: {formData.phone}
                <br />
                Start Date: {formData.startDate}
                <br />
                Status: {formData.status}
              </p>
              <Button onClick={closeModal}>Close</Button>
            </Modal>
          </>
        )}
      </EditUserContainer>
    </>
  );
};

export default EditUser;
