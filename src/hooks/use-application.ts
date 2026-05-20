import axiosClient from "../axiosClient.ts";
import {useQuery} from "@tanstack/react-query";
import {applicationsSchema} from "../schemas/applicationsSchema.ts";


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