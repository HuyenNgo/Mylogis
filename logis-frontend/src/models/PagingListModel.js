export class PagingListModel {
    constructor() {
        this.pageNumber = 1
        this.pageSize = 10
        this.totalPage = 0
        this.data = []
        this.firstRow = 0
        this.lastRow = 0
    }

    totalRows(){
        return this.data.length
    }
}