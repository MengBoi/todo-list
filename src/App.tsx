import React, { useState } from "react";
import logo from "./logo.svg";
import TextField from "@mui/material/TextField";
import "./App.css";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
function App() {
  // const list: String[] = [];
  const [todo, setTodo] = useState("");
  const [showRemove, setShowRemove] = useState(false);
  const [list, setList] = useState<String[]>([]);
  const checkDuplicate = (value: String) => {
    for (var i = 0; i < list.length; ++i) {
      if (list[i] === value) {
        return true;
      }
    }
    return false;
  };
  const removeOnClick = (index: number) => {
    setList(list.splice(index));
  };
  return (
    <div>
      <Typography>To do:</Typography>
      <TextField
        value={todo}
        style={{ marginTop: 20 }}
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setTodo(event.target.value);
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            // Do code here
            // list.push(todo);

            if (todo === "") {
              alert("The input is empty.");
            } else if (checkDuplicate(todo)) {
              alert(todo + " is already in the list.");
            } else {
              setList([...list, todo]);
              setTodo("");
            }

            // console.log("todo", todo, "list", list);
            event.preventDefault();
          }
        }}
      />

      <Typography style={{ marginTop: 20 }}>List:</Typography>
      {_.map(list, (item: String, index: number) => {
        return (
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
            onMouseEnter={() => {
              console.log("moouse enter");
              setShowRemove(true);
            }}
            onMouseLeave={() => {
              setShowRemove(false);
            }}
          >
            <Typography style={{ marginTop: 15 }}>{item}</Typography>
            {showRemove && (
              <Button
                onClick={() => {
                  removeOnClick(index);
                }}
                variant="contained"
                size="small"
                style={{ marginLeft: 20 }}
              >
                Remove
              </Button>
            )}
          </Box>
        );
      })}
    </div>
  );
}

export default App;
