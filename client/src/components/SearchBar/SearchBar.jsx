import React, { useState } from "react";
import "./SearchBar.css";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import { useNavigate } from "react-router-dom";

function SearchBar({ placeholder }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${user._id}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = friends.filter((value) => {
      return value.firstName.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div>
    <div className="searchInputs">
      <InputBase
        type="text"
        placeholder="Serach..."
        value={wordEntered}
        onChange={handleFilter}
      />
      <div>
        {filteredData.length === 0 ? (
          <Search />
        ) : (
          <Close id="clearBtn" onClick={clearInput} />
        )}
      </div>
    </div>
    {filteredData.length != 0 && (
      <div className="dataResult">
        {filteredData.slice(0, 15).map((value, key) => {
          return (
            <Box>
              <MenuItem href={value.link} target="_blank"
                onClick={() => {
                  navigate(`/profile/${value._id}`);
                }}>
                <p >{value.firstName} {value.lastName} </p>
              </MenuItem>
            </Box>
          );
        })}
      </div>
    )}
  </div>
  );
}

export default SearchBar;
