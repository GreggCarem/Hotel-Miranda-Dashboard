import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import roomData from "../../assets/rooms.json";

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.delete ? "#dc3545" : "#007bff")};
  color: #fff;
  margin-left: ${(props) => (props.delete ? "10px" : "0")};
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export default function EditRoom() {
  const { roomID } = useParams();
  const navigate = useNavigate();
  const isNewRoom = roomID === "new";
  const [room, setRoom] = useState({
    photo: "",
    roomNumber: "",
    id: "",
    bedType: "",
    facilities: [],
    rate: "",
    offerPrice: "",
    status: "Available",
    description: "",
  });

  useEffect(() => {
    if (!isNewRoom) {
      const roomIdNumber = parseInt(roomID, 10);
      const foundRoom = roomData.find((r) => r.id === roomIdNumber);
      if (foundRoom) {
        setRoom(foundRoom);
      } else {
        console.error(`Room with ID ${roomID} not found!`);
        navigate("/rooms");
      }
    }
  }, [roomID, isNewRoom, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "facilities") {
      setRoom((prevRoom) => ({
        ...prevRoom,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setRoom((prevRoom) => ({
        ...prevRoom,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    if (isNewRoom) {
      console.log("New room created:", room);
    } else {
      console.log("Updated room data:", room);
    }
    navigate("/rooms");
  };

  const handleDelete = () => {
    if (!isNewRoom) {
      console.log("Deleted room:", room.id);
    }
    navigate("/rooms");
  };

  return (
    <Container>
      <Title>{isNewRoom ? "Create New Room" : "Edit Room"}</Title>
      <FormGroup>
        <Label>Room Number:</Label>
        <Input
          type="text"
          name="roomNumber"
          value={room.roomNumber || ""}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>ID:</Label>
        <Input
          type="text"
          name="id"
          value={room.id || ""}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Bed Type:</Label>
        <Input
          type="text"
          name="bedType"
          value={room.bedType || ""}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Facilities (comma-separated):</Label>
        <Input
          type="text"
          name="facilities"
          value={(room.facilities || []).join(", ")}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Rate:</Label>
        <Input
          type="text"
          name="rate"
          value={room.rate || ""}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Offer Price:</Label>
        <Input
          type="text"
          name="offerPrice"
          value={room.offerPrice || ""}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Status:</Label>
        <Select name="status" value={room.status || ""} onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Description:</Label>
        <TextArea
          name="description"
          value={room.description || ""}
          onChange={handleChange}
          rows="4"
        />
      </FormGroup>
      <FormGroup>
        <Label>Photo URL:</Label>
        <Input
          type="text"
          name="photo"
          value={room.photo || ""}
          onChange={handleChange}
        />
      </FormGroup>
      <div style={{ textAlign: "center" }}>
        <Button onClick={handleSave}>Save</Button>
        {!isNewRoom && (
          <Button delete onClick={handleDelete}>
            Delete
          </Button>
        )}
      </div>
    </Container>
  );
}
