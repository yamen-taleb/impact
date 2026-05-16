import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useGetCategories } from '../hooks/use-category.ts';

export interface CategoryContextType {
    categoriesData: any;
    isLoading: boolean;
    categoryOptions: { value: string; label: string }[];
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
    const { data: categoriesData, isLoading } = useGetCategories({ page: 0, size: 50 });

    const categoryOptions = useMemo(() => {
        const categories = categoriesData?.content || [];
        return categories
            .map((c: any) => ({
                value: String(c.categoryId ?? ''),
                label: c.name ?? '-'
            }))
    }, [categoriesData]);

    return (
        <CategoryContext.Provider value={{ categoriesData, isLoading, categoryOptions }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategoryContext = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useCategoryContext must be used within a CategoryProvider');
    }
    return context;
};
