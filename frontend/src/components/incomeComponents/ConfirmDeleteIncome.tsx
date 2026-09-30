import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useIncomeStore } from "@/stores/incomeStore";
import { XIcon, Trash } from "lucide-react";
import { toast } from "../ui/toast";
import { useState } from "react";
import { deleteIncomeApi } from "@/api/incomesApi";
import handleApiErrorToast from "@/utils/handleApiErrorToast";

type DeleteProps = {
    setIsSheetOpen: (isSheetOpen: boolean) => void;
    selectedIncomeId: string;
    isOpenDeleteDialog: boolean;
    setIsOpenDeleteDialog: (isOpenDeleteDialog: boolean) => void;
};

const ConfirmDeleteIncome = ({
    setIsSheetOpen,
    selectedIncomeId,
    isOpenDeleteDialog,
    setIsOpenDeleteDialog,
}: DeleteProps) => {
    const incomes = useIncomeStore((state) => state.incomes);
    const { deleteIncome } = useIncomeStore();
    const incomeToDelete = incomes.find(
        (income) => income._id === selectedIncomeId,
    );

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleDelete = async (id: string) => {
        setIsLoading(true);

        try {
            await toast.promise(deleteIncomeApi(id), {
                loading: {
                    title: "Deleting Income",
                    description: "please wait while we save changes",
                },
                success: (response) => ({
                    title: response.message,
                }),
                error: handleApiErrorToast,
            });
            deleteIncome(selectedIncomeId);
        } catch {
        } finally {
            setIsOpenDeleteDialog(false);
            setIsSheetOpen(false);
            setIsLoading(false);
        }
    };

    return (
        <Dialog
            open={isOpenDeleteDialog}
            onOpenChange={setIsOpenDeleteDialog}
        >
            <DialogContent>
                <section className="p-4">
                    <DialogHeader>
                        <h3 className="text-2xl text-red-400 font-semibold mb-1">
                            Confirm Delete Action!
                        </h3>
                    </DialogHeader>

                    <DialogDescription className="text-md">
                        This action cannot be undone. This will permanently
                        delete {incomeToDelete?.source} from Fundar.
                    </DialogDescription>
                    <DialogFooter className="flex flex-row justify-end p-2 mt-8">
                        <Button
                            className="flex gap-2 items-center rounded-4xl p-6"
                            onClick={() => setIsOpenDeleteDialog(false)}
                        >
                            Cancel <XIcon />
                        </Button>
                        <Button
                            className="flex gap-2 items-center rounded-4xl p-6"
                            variant={"destructive"}
                            onClick={() => handleDelete(selectedIncomeId)}
                            disabled={isLoading}
                        >
                            Delete <Trash />
                        </Button>
                    </DialogFooter>
                </section>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDeleteIncome;
