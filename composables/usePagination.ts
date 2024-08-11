export default function usePagination() {
    const getVirtualPages = (page: number, pageLimit: number) => {
        const virtualPage = ((page - 1) * pageLimit) <= 0 ? 0 : ((page - 1) * pageLimit)
        return virtualPage;
    }

    return {
        getVirtualPages
    }
}