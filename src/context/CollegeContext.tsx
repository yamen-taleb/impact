import { createContext, useContext, useMemo } from 'react';
import {useGetColleges} from "../hooks/use-college.ts";

export interface CollegeContextType {
    collegesData: any;
    collegeOptions: { value: string; label: string }[];
    isLoading: boolean;
}

const CollegeContext = createContext<CollegeContextType | undefined>(undefined);

export const CollegeProvider = ({children}: { children: React.ReactNode }) => {
    const { data: collegesData, isLoading } =
        useGetColleges({
            page: 0,
            size: 50,
        });

    const collegeOptions = useMemo(() => {

        const colleges = collegesData?.content || [];

        return colleges
            .map((college: { collegeId?: string | number; name?: string }) => {
                return ({
                    value: String(college.collegeId ?? ""),
                    label: college.name ?? "-",
                });
            });
    }, [collegesData]);

    return (
        <CollegeContext.Provider value={{collegesData, collegeOptions, isLoading}}>
            {children}
        </CollegeContext.Provider>
    );
}

export const useCollegeContext = () => {
    const context = useContext(CollegeContext);
    if (!context) {
        throw new Error('useCollegeContext must be used within a CollegeProvider');
    }
    return context;
};
