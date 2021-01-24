const DataOptions = {
    genders: [
        { value: 'male', label: 'Nam' },
        { value: 'female', label: 'Nữ' },
    ],

    billStatus: [
        { value: 1, label: 'Mới' },
        { value: 2, label: 'Đã xác nhận' },
        { value: 3, label: 'Đang Vận Chuyển' },
        { value: 4, label: 'Hoàn thành' },
        { value: 5, label: 'Hủy bỏ' }
    ],

    getBillStatusNameByValue(value) {
        let label = DataOptions.billStatus.find(option => option.value == value)?.label || "NO LABEL"
        return label
    }

}

export { DataOptions }