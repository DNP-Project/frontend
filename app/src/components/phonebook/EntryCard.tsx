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
  const handleEditSave = (editedName: string, editedPhone: string, editedEmail: string) => {
    onEdit(editedName, editedPhone, editedEmail);
  };

  const handleDeleteConfirm = () => {
    onDelete();
  };

  return (
    <div className="card">
      <div>
        <h3>{name}</h3>
        <p>{phone}</p>
        <p>{email}</p>
        <EditDialog
          name={name}
          phone={phone}
          email={email}
          onSave={handleEditSave}
        />
        <DeleteDialog
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
}