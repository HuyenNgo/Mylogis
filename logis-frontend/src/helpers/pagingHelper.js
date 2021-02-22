import { PagingListModel } from './../models'

export class PagingHelper {
    static mapToPagingListModel = (datasource) => {
        let model = new PagingListModel()
        model.pageNumber = 1
        model.data = [...datasource]
        model.totalPage = parseInt(Math.ceil(model.data.length / (model.pageSize || 1)))
        if (model.totalPage < 1) model.totalPage = 1
        model.firstRow = 1
        model.lastRow = model.totalPage
        return model
    }

    static fromIndex = (model) => {
        let from = (model.pageNumber - 1) * model.pageSize
        return from
    }

    static toIndex = (model) => {
        let to = PagingHelper.fromIndex(model) + model.pageSize
        if (to > model.data.length) to = model.data.length
        console.log(to)
        return to
    }

    static getNextPage = (model) => {
        if (model.totalPage == 0)
            return 1

        if (model.pageNumber <= 0) return 1

        if (model.pageNumber > model.totalPage)
            return model.pageNumber

        return model.pageNumber + 1
    }

    static getPreviousPage = (model) => {
        const previousPage = model.pageNumber - 1
        if (previousPage <= 0)
            return 1
        return previousPage
    }
}