import React, { useState } from "react";
import { DeleteDialog } from "./DeleteDialog";
import { EditDialog} from "./EditDialog";

type EntryCardProps = {
  name: string;
  phone: string;
  onEdit: (name: string, phone: string) => void;
  onDelete: () => void;
};

export function EntryCard({ name, phone, onEdit, onDelete }: EntryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedPhone, setEditedPhone] = useState(phone);

  const handleSave = () => {
    onEdit(editedName, editedPhone);
    setIsEditing(false);
  };

  return (
    <div className="card">
      {isEditing ? (
        <div>
          <input value={editedName} onChange={(e) => setEditedName(e.target.value)} />
          <input value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{name}</h3>
          <p>{phone}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}