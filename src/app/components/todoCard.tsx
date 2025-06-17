import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CheckSquare, X } from "@deemlol/next-icons";
import CardActions from "@mui/material/CardActions";
import EditOutlinedTwoToneIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";

import { TodoCardProps } from "app/types/interface";

export default function TodoCard({
  todo,
  idx,
  checked,
  editId,
  editTodo,
  setEditId,
  setEditTodo,
  onCheck,
  onDelete,
  onUpdate,
}: TodoCardProps) {
  return (
    <>
      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={todo.id} container>
        <Card
          sx={{
            width: "100%",
            maxWidth: 350,
            backgroundColor: "#FEFFDF",
            border: 1,
            boxShadow: 10,
          }}
        >
          <div className="flex justify-between">
            <div>
              <Checkbox
                size="small"
                color="success"
                checked={!!checked}
                onChange={() => onCheck(idx)}
              ></Checkbox>
            </div>
            <div></div>
            <div className="text-2xl mr-2">
              {todo.createdDate
                ? new Date(todo.createdDate).toLocaleDateString("vi-VN")
                : ""}
            </div>
          </div>
          {/* Todo Content */}
          <CardContent>
            <Typography align="center" variant="h5">
              {editId === todo.id ? (
                <input
                  className="focus:ring-2 focus:ring-indigo-500 border"
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onUpdate({
                        id: todo.id,
                        todo: editTodo,
                      });
                    }
                  }}
                />
              ) : (
                <div>
                  {todo.todo}
                  <button
                    className="ml-1"
                    onClick={() => {
                      setEditId(todo.id);
                      setEditTodo(todo.todo);
                    }}
                  >
                    <EditOutlinedTwoToneIcon color="action" />
                  </button>
                </div>
              )}
            </Typography>
            <Typography variant="h6" align="center">
              {todo.completed ? (
                <>
                  <CheckSquare className="text-green-600 inline" /> Done
                </>
              ) : (
                <>
                  <X className="text-red-600 inline" /> Pending
                </>
              )}
            </Typography>
            <Typography></Typography>
          </CardContent>
          {/* Todo Actions (Mark Done & Delete) */}
          <CardActions
            sx={{
              backgroundColor: "#fafafa",
              justifyContent: "space-around",
            }}
          >
            <Button
              disabled={todo.completed}
              onClick={() => {
                onUpdate({
                  id: todo.id,
                  completed: !todo.completed,
                });
              }}
              color="secondary"
            >
              <DoneIcon />
              Mark Done
            </Button>
            <Button color="error" onClick={() => onDelete({ id: todo.id })}>
              <DeleteIcon />
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
      ;
    </>
  );
}
