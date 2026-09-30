import { Dialog, DialogContent } from "@/components/ui/dialog";
import IncomeWizard from "./IncomeWizard";

interface IncomeDialogProps {
   isDialogOpen: boolean;
   setIsDialogOpen: (open: boolean) => void;
}

const AddIncomeDialog = ({
   isDialogOpen,
   setIsDialogOpen,
}: IncomeDialogProps) => {
   return (
      <Dialog
         open={isDialogOpen}
         onOpenChange={setIsDialogOpen}
      >
         <DialogContent className="max-h-[93vh]">
            <IncomeWizard onClose={() => setIsDialogOpen(false)} />
         </DialogContent>
      </Dialog>
   );
};

export default AddIncomeDialog;
