import { Dialog, DialogContent } from "@/components/ui/dialog";
import EditIncomeWizard from "./EditIncomeWizard";

type EditIncomeDialogProps = {
    selectedIncomeId: string;
    isEditDialogOpen: boolean;
    setIsEditDialogOpen: (isEditDialogOpen: boolean) => void;
    setIsSheetOpen: (isSheetOpen: boolean) => void;
};

const EditIncomeDialog = ({
    selectedIncomeId,
    isEditDialogOpen,
    setIsEditDialogOpen,
    setIsSheetOpen,
}: EditIncomeDialogProps) => {
    return (
        <Dialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
        >
            <DialogContent className="max-h-[93vh]">
                <EditIncomeWizard
                    selectedIncomeId={selectedIncomeId}
                    onClose={() => setIsEditDialogOpen(false)}
                    setIsSheetOpen={setIsSheetOpen}
                />
            </DialogContent>
        </Dialog>
    );
};

export default EditIncomeDialog;
