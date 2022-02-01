import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import TextField from "@mui/material/TextField";
import "./App.css";
import Typography from "@mui/material/Typography";
import _, { filter } from "lodash";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import database from "./utils/firebase";

import { ref, set, onValue } from "firebase/database";
function App() {
  // const list: String[] = [];
  useEffect(() => {
    pullFromFire();
  }, []);
  const [todo, setTodo] = useState<String>("");
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
  const pushToFire = async (value: String[]) => {
    set(ref(database, "todo"), value);
  };
  const pullFromFire = async () => {
    const todoListRef = ref(database, "todo");
    onValue(todoListRef, (snapshot) => {
      const data = snapshot.val();
      // updateStarCount(postElement, data);

      setList(data || []);
    });
  };

  const removeOnClick = (inputIndex: number) => {
    var filtered = list.filter(function (value, index, arr) {
      return index !== inputIndex;
    });

    pushToFire(filtered);
    pullFromFire();
  };
  const editOnClick = (value: String, inputIndex: number) => {
    setTodo(value);
    removeOnClick(inputIndex);
  };
  const onTodoSubmit = () => {
    if (todo === "") {
      alert("The input is empty.");
    } else if (checkDuplicate(todo)) {
      alert(todo + " is already in the list.");
    } else {
      setTodo("");
      pushToFire([...list, todo]);
      pullFromFire();
    }
  };
  const filterTodo = () => {
    var matches = _.filter(list, function (item, index) {
      return item.indexOf(todo.toString()) !== -1;
    });

    return matches;
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
            onTodoSubmit();

            event.preventDefault();
          }
        }}
      />

      <Typography style={{ marginTop: 20 }}>List:</Typography>
      {todo === ""
        ? _.map(list, (item: String, index: number) => {
            return (
              <Box
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                }}
                onMouseEnter={() => {
                  setShowRemove(true);
                }}
                onMouseLeave={() => {
                  setShowRemove(false);
                }}
              >
                <Typography style={{ marginTop: 15 }}>{item}</Typography>
                {showRemove && (
                  <div>
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
                    <Button
                      onClick={() => {
                        editOnClick(item, index);
                      }}
                      variant="contained"
                      size="small"
                      style={{ marginLeft: 20 }}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </Box>
            );
          })
        : _.map(filterTodo(), (item: String, index: number) => {
            return (
              <Box
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                }}
                onMouseEnter={() => {
                  setShowRemove(true);
                }}
                onMouseLeave={() => {
                  setShowRemove(false);
                }}
              >
                <Typography style={{ marginTop: 15 }}>{item}</Typography>
                {showRemove && (
                  <div>
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
                    <Button
                      onClick={() => {
                        editOnClick(item, index);
                      }}
                      variant="contained"
                      size="small"
                      style={{ marginLeft: 20 }}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </Box>
            );
          })}
      {filterTodo().length === 0 && todo !== "" && (
        <Typography>No result. Create a new one instead!</Typography>
      )}
    </div>
  );
}

export default App;
