import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "../ui/pagination";

type PaginationCompProps = {
    page: number;
    setPage: (page: number) => void;
    totalPages: number;
};

const PaginationComp = ({ page, setPage, totalPages }: PaginationCompProps) => {
    const generatePages = () => {
        const pages: number[] = [];

        if (totalPages <= 5) {
            for (let i = 0; i < totalPages; i++) pages.push(i);
        } else {
            if (page <= 2) {
                pages.push(0, 1, 2, 3);
                pages.push(-1);
                pages.push(totalPages - 1);
            } else if (page >= totalPages - 3) {
                pages.push(0);
                pages.push(-1);
                for (let i = totalPages - 4; i < totalPages; i++) pages.push(i);
            } else {
                pages.push(0);
                pages.push(-1);
                pages.push(page - 1, page, page + 1);
                pages.push(-1);
                pages.push(totalPages - 1);
            }
        }

        return pages;
    };

    const handleClick = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) setPage(newPage);
    };

    return (
        <Pagination dir="ltr" className="mt-2">
            <PaginationContent className="rounded-xl border border-zinc-200 bg-white p-1 shadow-sm">
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        size={"sm"}
                        onClick={(event) => {
                            event.preventDefault();
                            handleClick(page - 1);
                        }}
                        aria-disabled={page === 0}
                        tabIndex={page === 0 ? -1 : 0}
                        className={`h-8 rounded-lg px-3 text-zinc-700 transition-colors hover:bg-zinc-100 ${page === 0 ? "pointer-events-none cursor-not-allowed opacity-40" : ""}`}
                    />
                </PaginationItem>

                {generatePages().map((p, index) =>
                    p === -1 ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={p}>
                            <PaginationLink
                                href="#"
                                size={"sm"}
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleClick(p);
                                }}
                                isActive={p === page}
                                className={`h-8 min-w-8 rounded-lg px-3 text-sm transition-colors ${p === page ? "border-zinc-900 bg-zinc-900 text-white hover:bg-black" : "text-zinc-700 hover:bg-zinc-100"}`}
                            >
                                {p + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        size={"sm"}
                        onClick={(event) => {
                            event.preventDefault();
                            handleClick(page + 1);
                        }}
                        aria-disabled={page === totalPages - 1}
                        tabIndex={page === totalPages - 1 ? -1 : 0}
                        className={`h-8 rounded-lg px-3 text-zinc-700 transition-colors hover:bg-zinc-100 ${page === totalPages - 1 ? "pointer-events-none cursor-not-allowed opacity-40" : ""}`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComp;
