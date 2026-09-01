import BaseInitiatives from "../components/initiative/BaseInitiatives.tsx";
import {useStudentInitiativesContext} from "../context/StudentIniativesContext.tsx";
import InitiativeHeader from "../components/initiative/InitiativeHeader.tsx";
import type {Initiative} from "../schemas/initiativePageSchema.ts";
import InitiativeCard from "../components/initiative/InitiativeCard.tsx";
import { Button } from "../components/ui/button.tsx";
import {useState} from "react";
import {useDeleteInitiative} from "../hooks/use-initiative.ts";
import InitiativeDeleteDialog from "../components/initiative/InitiativeDeleteDialog.tsx";
import Dialog from "../components/Dialog.tsx";
import InitiativeEditForm from "../forms/initiative/InitiativeEditForm.tsx";

const MyInitiatives = () => {
    const {
        initiatives,
        totalPages,
        isLoading,
        error,
        page,
        setPage,
        handleFiltersChange
    } = useStudentInitiativesContext();

    const [open, setOpen] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editInitiativeId, setEditInitiativeId] = useState<string | number | null>(null);
    const [deleteInitiativeId, setDeleteInitiativeId] = useState<string | number | null>(null);
    const {mutate: deleteInitiative} = useDeleteInitiative()

    const handleOpenDialogDeleteInitiative = (id: string | number) => {
        setOpen(true);
        setDeleteInitiativeId(id);
    };

    const handleOpenEditDialog = (id: string | number) => {
        setOpenEditDialog(true);
        setEditInitiativeId(id);
    }


    const handleDeleteApplication = () => {
        if (!deleteInitiativeId) { return; }

        deleteInitiative(
            {campaignId: deleteInitiativeId},
            {
                onSuccess: () => {
                    setOpen(false);
                    setDeleteInitiativeId(null);
                }
            }
        )
    }
    return (
        <div className="flex flex-col gap-6 pr-10 mb-25">
            <InitiativeHeader onFiltersChange={handleFiltersChange} />
            <Dialog
                open={openEditDialog}
                onOpenChange={setOpenEditDialog}
                title="تعديل المبادرة"
                titleClassName="text-xl font-bold"
                showFooter={false}
                contentClassName="min-w-[50%] max-h-[90vh] overflow-y-auto"
            >
                <InitiativeEditForm setOpen={setOpenEditDialog} initiativeId={editInitiativeId}/>
            </Dialog>
            <InitiativeDeleteDialog open={open} setOpen={setOpen} handleDeleteInitiative={handleDeleteApplication} />
            <BaseInitiatives initiatives={initiatives} isLoading={isLoading} error={error} page={page} setPage={setPage}
                             totalPages={totalPages}>
                <div className="grid grid-cols-1 gap-5 pl-10 md:grid-cols-2 xl:grid-cols-3">
                    {initiatives.map((initiative: Initiative, index: number) => (
                        <InitiativeCard
                            key={`${initiative.campaignId}-${page}-${index}`}
                            initiative={initiative}
                            actions={
                                initiative.status === 'PENDING' && (<>
                                    <Button variant="destructive" size="sm" className="rounded-md px-3 py-1.5 text-sm min-w-[88px]" onClick={() => handleOpenDialogDeleteInitiative(initiative.campaignId)}>حذف</Button>
                                    <Button variant="outline" size="sm" className="rounded-md px-3 py-1.5 text-sm min-w-[88px]" onClick={() => handleOpenEditDialog(initiative.campaignId)}>تعديل</Button>

                                </>)
                            }
                        />
                    ))}
                </div>
            </BaseInitiatives>
        </div>
    );
};

export default MyInitiatives;
