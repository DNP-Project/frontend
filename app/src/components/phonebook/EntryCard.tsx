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
    <div className="card bg-sidebar-ring shadow-md p-4 rounded-lg max-w-max">
      <div>
        <h3 className="font-bold">{name}</h3>
        <p>{phone}</p>
        <p className="mb-2">{email}</p>
        <div>
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
    </div>
  );
}