import axiosClient from "../axiosClient.ts";
import {useQuery} from "@tanstack/react-query";
import {applicationsSchema} from "../schemas/applicationsSchema.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ApplyToCampaignPayload {
    campaignId: number;
    studentId: number;
    motivationLetter: string;
}

interface WithdrawApplicationPayload {
    applicationId: number | string;
}


interface UpdateApplicationPayload {
    id: number | string;

    motivationLetter: string;

    status:
        | "PENDING"
        | "APPROVED"
        | "REJECTED"
        | "REMOVED";

    rejectionReason?: string;
    adminNotes?: string;

    reviewedAt?: string;
    reviewedBy?: number;

    removalReason?: string;
    removedAt?: string;
    removedBy?: number;

    student: number;
    campaign: number;
}


export const useGetUserApplications = ({
    userId,
    page,
    size,
    status
}: {
    userId: number | string | undefined;
    page?: number;
    size?: number;
    status?: string;
}) => {
    const getUserApplicationsRequest = async () => {
        const response = await axiosClient.get(
            `/v1/users/${userId}/applications`,
            {
                params: {
                    page,
                    size,
                    status
                }
            }
        );
        return applicationsSchema.parse(response.data);
    }

    const {data, isLoading, error} = useQuery({
        queryKey: ["fetchUserApplications", userId, page, size, status],
        queryFn: getUserApplicationsRequest,
    });

    return {data, isLoading, error};
}


export const useApplyToCampaign = () => {
    const queryClient = useQueryClient();

    const applyRequest = async ({
        campaignId,
        studentId,
        motivationLetter,
    }: ApplyToCampaignPayload) => {

        const payload = {
        student: studentId,
        campaign: campaignId,
        motivationLetter,
        status: "PENDING",
        };

        const response = await axiosClient.post(
        `/v1/campaigns/${campaignId}/apply`,
        payload
        );

        return response.data;
    };

    return useMutation({
        mutationFn: applyRequest,

        onSuccess: () => {
        toast.success(
            "تم إرسال طلب التطوع بنجاح"
        );

        queryClient.invalidateQueries({
            queryKey: ["campaign-applications"],
        });
        },

        onError: (error: any) => {
        toast.error(
            error?.response?.data?.message ||
            "حدث خطأ أثناء التقديم"
        );
        },
    });
};


export const useWithdrawApplication = () => {
    const queryClient = useQueryClient();

    const withdrawRequest = async ({
        applicationId,
    }: WithdrawApplicationPayload) => {

        const response =
        await axiosClient.delete(
            `/v1/applications/${applicationId}`
        );

        return response.data;
    };

    return useMutation({
        mutationFn: withdrawRequest,

        onSuccess: () => {
        toast.success(
            "تم سحب طلب التطوع بنجاح"
        );

        queryClient.invalidateQueries({
            queryKey: [
            "fetchUserApplications",
            ],
        });

        queryClient.invalidateQueries({
            queryKey: [
            "campaign-applications",
            ],
        });
        },

        onError: (error: any) => {
        toast.error(
            error?.response?.data?.message ||
            "حدث خطأ أثناء سحب الطلب"
        );
        },
    });
};



export const useUpdateApplication = () => {
    const queryClient = useQueryClient();

    const updateRequest = async ({
        id,
        ...payload
    }: UpdateApplicationPayload) => {

        const response = await axiosClient.put(
        `/v1/applications/${id}`,
        payload
        );

        return response.data;
    };

    return useMutation({
        mutationFn: updateRequest,

        onSuccess: () => {
        toast.success("تم تحديث الطلب بنجاح");

        queryClient.invalidateQueries({
            queryKey: ["campaign-applications"],
        });

        queryClient.invalidateQueries({
            queryKey: ["fetchUserApplications"],
        });
        },

        onError: (error: any) => {
        toast.error(
            error?.response?.data?.message ||
            "حدث خطأ أثناء تحديث الطلب"
        );
        },
    });
};
