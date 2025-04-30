import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type EditDialogProps = {
  name: string;
  phone: string;
  email: string;
  onSave: (name: string, phone: string, email: string) => void;
};

export function EditDialog({ name, phone, email, onSave }: EditDialogProps) {
  const [editedName, setEditedName] = useState(name);
  const [editedPhone, setEditedPhone] = useState(phone);
  const [editedEmail, setEditedEmail] = useState(email);

  const handleSave = () => {
    onSave(
      editedName !== undefined && editedName !== null ? editedName : name,
      editedPhone !== undefined && editedPhone !== null ? editedPhone : phone,
      editedEmail !== undefined && editedEmail !== null ? editedEmail : email
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mr-2">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription>
            Make changes here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="number" className="text-right">
              Phone
            </Label>
            <Input
              id="number"
              value={editedPhone}
              onChange={(e) => setEditedPhone(e.target.value)}
              className="col-span-3" placeholder="+XXXXXXXXXXX"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>Save</Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
