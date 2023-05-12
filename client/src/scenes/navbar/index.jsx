import { useState, useEffect, useRef } from "react";
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
  Icon,
} from "@mui/material";
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
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout, setUserFriend } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import "./navbar.css";

const Navbar = ({ socket }) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const fullName = `${user.firstName} ${user.lastName}`;
  // const fullName = `${"dummy"} ${"name"}`;
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.token);

  const getUsers = async () => {
    const response = await fetch(
      `http://localhost:3001/allusers`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setSearchUsers({ searchUsers: data }));
  };

  useEffect(() => {
    getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);
  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else if (type === 4) {
      action = "texted";
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post.`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };


  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = searchUsers.searchUsers.filter((value) => {
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
    <FlexBetween padding="1rem 6%" backgroundColor={alt} position="sticky" top="0px" zIndex="2" >
      <FlexBetween gap="1.75rem">

        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => {
            navigate("/home");
            dispatch(
              setUserFriend({
                userFriend: user._id,
              })
            );
          }
          }
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Husmow
        </Typography>


        {isNonMobileScreens && (
          <div>
            <div >
              <div >
                <input
                  type="text"
                  placeholder="Serach..."
                  value={wordEntered}
                  onChange={handleFilter}
                  className="searchInputs"
                />
                <div className="searchIcon">
                  {filteredData.length === 0 ? (
                    <Search />
                  ) : (
                    <Close id="clearBtn" onClick={clearInput} />
                  )}
                </div>
              </div>
              <div >
                {filteredData.length != 0 && (
                  <div className="notifications2">
                    {filteredData.slice(0, 15).map((value, key) => {
                      return (
                        <div className="nButton2">
                          <div href={value.link} target="_blank "
                            onClick={() => {
                              navigate(`/profile/${value._id}`);
                              navigate(0);
                            }}
                          >
                            <p >{value.firstName} {value.lastName} </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
        {!isNonMobileScreens && (
          <div>
            <div >
              <div >
                <input
                  type="text"
                  placeholder="Serach..."
                  value={wordEntered}
                  onChange={handleFilter}
                  className="searchInputsMov"
                />
                <div className="searchIconMov">
                  {filteredData.length === 0 ? (
                    <Search />
                  ) : (
                    <Close id="clearBtn" onClick={clearInput} />
                  )}
                </div>
              </div>
              <div >
                {filteredData.length != 0 && (
                  <div className="notifications_2">
                    {filteredData.slice(0, 15).map((value, key) => {
                      return (
                        <div className="nButton3">
                          <div href={value.link} target="_blank "
                            onClick={() => {
                              navigate(`/profile/${value._id}`);
                              navigate(0);
                            }}
                          >
                            <p >{value.firstName} {value.lastName} </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton onClick={() => navigate("/messenger")}>
            {theme.palette.mode === "dark" ? (
              <Message sx={{ fontSize: "25px" }} />
            ) : (
              <Message sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton sx={{ color: dark }} >
            <Box className="icon" onClick={() => setOpen(!open)}>

              <Notifications sx={{ fontSize: "25px" }} />
              {
                notifications.length > 0 &&
                <div className="counter">{notifications.length}</div>
              }
              {open && (
                <div className="notifications">
                  {notifications.map((n) => displayNotification(n))}
                  <button className="nButton" onClick={handleRead}>
                    Mark as read
                  </button>
                </div>
              )}
            </Box>
          </IconButton>
          <IconButton sx={{ color: dark }}>
            <Help sx={{ fontSize: "25px" }} onClick={() => navigate("/help")} />
          </IconButton>
          <FormControl variant="standard" value={fullName}  >
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName} >
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton onClick={() => navigate("/messenger")}>
              {theme.palette.mode === "dark" ? (
                <Message sx={{ fontSize: "25px" }} />
              ) : (
                <Message sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton sx={{ color: dark }} >
              <Box className="icon" onClick={() => setOpen(!open)}>

                <Notifications sx={{ fontSize: "25px" }} />
                {
                  notifications.length > 0 &&
                  <div className="counter">{notifications.length}</div>
                }
                {open && (
                  <div className="notifications" >
                    {notifications.map((n) => displayNotification(n))}
                    <button className="nButton" onClick={handleRead}>
                      Mark as read
                    </button>
                  </div>
                )}
              </Box>
            </IconButton>
            <IconButton sx={{ color: dark }}>
              <Help sx={{ fontSize: "25px" }} onClick={() => navigate("/help")} />
            </IconButton>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;