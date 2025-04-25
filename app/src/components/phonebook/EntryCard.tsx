import { useState } from "react";
import { DeleteDialog } from "./DeleteDialog";
import { EditDialog } from "./EditDialog";

type EntryCardProps = {
  name: string;
  phone: string;
  email: string;
  onEdit: (name: string, phone: string, email: string) => void;
  onDelete: () => void;
};

export function EntryCard({ name, phone, email, onEdit, onDelete }: EntryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleEditSave = (editedName: string, editedPhone: string, editedEmail: string) => {
    onEdit(editedName, editedPhone, editedEmail);
    setIsEditing(false);
  };

  const handleDeleteConfirm = () => {
    onDelete();
    setShowDeleteDialog(false);
  };

  return (
    <div className="card">
      <div>
        <h3>{name}</h3>
        <p>{phone}</p>
        <p>{email}</p>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => setShowDeleteDialog(true)}>Delete</button>
      </div>

      {isEditing && (
        <EditDialog
          name={name}
          phone={phone}
          email={email}
          onSave={handleEditSave}
          onCancel={() => setIsEditing(false)}
        />
      )}

      {showDeleteDialog && (
        <DeleteDialog
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}
    </div>
  );
}