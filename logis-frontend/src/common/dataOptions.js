const DataOptions = {
    genders: [
        { value: 'male', label: 'Nam' },
        { value: 'female', label: 'Nữ' },
    ],

    billStatus: [
        { value: 1, label: 'Mới' },
        { value: 2, label: 'Đang gom hàng' },
        { value: 3, label: 'Đã gom hàng' },
        { value: 4, label: 'Đang vận chuyển' },
        { value: 5, label: 'Đã giao hàng' },
        { value: 6, label: 'Hoàn thành' },
        { value: 7, label: 'Hủy bỏ' }
    ],

    billUpdatedStatus: [
        { value: 1, label: 'Mới' },
        { value: 2, label: 'Đang gom hàng' },
        { value: 3, label: 'Đã gom hàng' },
        { value: 4, label: 'Đang vận chuyển' },
        { value: 5, label: 'Đã giao hàng' },
        { value: 7, label: 'Hủy bỏ' }
    ],

    getBillStatusNameByValue(value) {
        let label = DataOptions.billStatus.find(option => option.value == value)?.label || "Đang tạo"
        return label
    }

}

export { DataOptions }