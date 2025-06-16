import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import { DeleteBtnProps } from "app/types/interface";

export function DeleteSelectedBtn({selectedId, onCount, onDelete}: DeleteBtnProps) {
    return (
        <Badge>
            <Button
              variant="outlined"
              color="primary"
              startIcon={
                <Badge badgeContent={onCount} color="error">
                  <DeleteIcon />
                </Badge>
              }
              onClick={() => {
                onDelete({
                  idArray: selectedId,
                });
              }}
              className="flex justify-items-end"
              disabled={selectedId.length === 0}
            >
              Delete Selected Todo
            </Button>
          </Badge>
    )
}