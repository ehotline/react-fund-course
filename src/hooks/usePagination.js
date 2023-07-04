import { useMemo } from "react"
import { getPagesArray } from "../components/utils/pages"

export const usePagination = (totalPages) => {
    const pagesArray = useMemo(() => {
        const result = getPagesArray(totalPages)
		return result
    }, [totalPages]) 

    return pagesArray
}