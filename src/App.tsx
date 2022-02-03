import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import TextField from "@mui/material/TextField";

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
  const [showRemove, setShowRemove] = useState<Number>();

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
    var matches = _.filter(list, function (item, index: Number) {
      return item.indexOf(todo.toString()) !== -1;
    });

    return matches;
  };

  return (
    <Box style={{ padding: 50, display: "flex" }}>
      <div style={{ width: "50%" }}>
        <Typography style={{ fontSize: 30 }}>To do:</Typography>
        <TextField
          value={todo}
          style={{ marginTop: 20 }}
          id="outlined-basic"
          placeholder="to do"
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

        <Typography style={{ marginTop: 20, marginBottom: 20 }}>
          List:
        </Typography>
        {todo === ""
          ? _.map(list, (item: String, index: number) => {
              return (
                <Box
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#e0e0e0",
                    marginTop: 15,
                    padding: 15,
                    borderRadius: 5,
                    justifyContent: "space-between",
                    width: "70%"
                  }}
                  onMouseEnter={() => {
                    setShowRemove(index);
                  }}
                  onMouseLeave={() => {
                    setShowRemove(-1);
                  }}
                >
                  <Typography>{item}</Typography>
                  {showRemove === index && (
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
                    alignItems: "center",
                    backgroundColor: "#e0e0e0",
                    marginTop: 15,
                    padding: 15,
                    borderRadius: 5,
                    justifyContent: "space-between",
                    width: "70%"
                  }}
                  onMouseEnter={() => {
                    setShowRemove(index);
                  }}
                  onMouseLeave={() => {
                    setShowRemove(-1);
                  }}
                >
                  <Typography>{item}</Typography>
                  {showRemove === index && (
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
      <div style={{ width: "50%" }}>
        <Typography style={{ fontSize: 30, marginBottom: 20 }}>
          Instruction
        </Typography>
        <Typography>
          - The input field can be use to input todo or search todo list.
        </Typography>
        <Typography>- Hover on the item to edit or delete.</Typography>
        <Typography>
          - The list is connected with firebase database. So you can share it
          with your friend (no log in required).
        </Typography>
      </div>
    </Box>
  );
}

export default App;
