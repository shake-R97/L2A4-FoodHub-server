type HelperOptions = {
    page?: number | string;
    limit?: number | string;
    orderBy?: string;
    sortBy?: string;
}

type OptionsResult = {
    page: number;
    limit: number;
    skip: number;
    orderBy: string;
    sortBy: string;
}

const paginationSortHelper = (options: HelperOptions): OptionsResult => {

    // for pagination -----
    const page: number = Number(options.page) || 1;
    const limit: number = Number(options.limit) || 8;
    const skip = (page - 1) * limit;


    // for sorting ------
    const allowedSortBy = [
        "businessName",
        "createdAt",
        "city"
    ] as const;

    const allowedOrderBy = [
        "desc",
        "asc"
    ] as const;

    const orderBy = typeof options.orderBy === "string" && allowedOrderBy.includes(options.orderBy as any) ? options.orderBy : "desc";

    const sortBy = typeof options.sortBy === "string" && allowedSortBy.includes(options.sortBy as any) ? options.sortBy : "createdAt";


    return {
        page,
        limit,
        skip,
        orderBy,
        sortBy
    }
}

export default paginationSortHelper;