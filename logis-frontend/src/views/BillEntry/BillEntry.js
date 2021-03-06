import React from 'react'
import { Topbar } from './../../components'
import Select from 'react-select'
import DatePicker from "react-datepicker"
import { FormatHelper, DataOptions } from './../../common'
import { getAllProvinceProxy, getAllDistrictProxy, getAllWardProxy, getSuggestionsProxy } from './../../api'
import $ from 'jquery'
import { notifier } from './../../helpers'
export class BillEntry extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            form: {
                status: 1,
                typeProduct: '1',
                expectedDate: new Date(),
                gender: 'male'
            },
            _provinces: [],
            _districts: [],
            _wards: [],

            senderProvinces: [],
            senderDistricts: [],
            senderWards: [],

            senderDistrictSelectOption: null,
            senderWardSelectOption: null,

            receiverProvinces: [],
            receiverDistricts: [],
            receiverWards: [],

            receiverDistrictSelectOption: null,
            receiverWardSelectOption: null,
        }
        console.log(this)
        this.provinceSenderSelectControl = React.createRef();
        this.districtSenderSelectControl = React.createRef();
        this.wardSenderSelectControl = React.createRef();
        this.provinceRecieverSelectControl = React.createRef();
        this.districtRecieverSelectControl = React.createRef();
        this.wardRecieverSelectControl = React.createRef();
        this.typeProductSelectControl = React.createRef();
    }

    options = [
        { value: '1', label: 'Hàng bình thường' },
        { value: '2', label: 'Hàng dễ vỡ' },
        { value: '3', label: 'Loại hàng khác' }
    ]


    //events
    continueBillSupplier = (e) => {
        e.preventDefault()
        let errMessage = this.getInvalidMessage()
        if (errMessage) {
            notifier.showErrorMessage(errMessage)
            return
        }

        notifier.showWaiting()
        setTimeout(() => {
            const reqBody = { ... this.state.form }
            getSuggestionsProxy(
                reqBody,
                data => {
                    console.log(data.datas)
                    let supData = [...data.datas]
                    let sendObject = { ...this.state.form }

                    if (supData.length > 0) {
                        let bestpack = supData[0]
                        sendObject.totalAmount = bestpack.totalAmount


                        let sumTransitTime = 0.0
                        bestpack.suggestionDetailDTOS.forEach(sug => {
                            sumTransitTime += sug.transitTime
                        });

                        sumTransitTime = parseInt(sumTransitTime)
                        if (sumTransitTime >= 2) {
                            let d = new Date(sendObject.expectedDate.setDate(sendObject.expectedDate.getDate() + sumTransitTime))
                            sendObject.expectedDate = FormatHelper.getDateFormtString(d) + ''
                        } else {
                            sendObject.expectedDate = FormatHelper.getDateFormtString(sendObject.expectedDate) + ''
                        }
                    }
                    notifier.hideWaiting()
                    this.props.history.push('/bill-supplier', { billEntryInfo: sendObject, isFullInfo: true, supData: supData })
                }
            )

        })
    }


    getInvalidMessage = () => {
        let errMessage = ''

        return ''

        let isValid = $("#formInput")[0].checkValidity()

        // if(isValid){
        //     for(let i=2; i<=10;i++){
        //         if(!$(`#react-select-${i}-input"`).value){
        //             isValid = false
        //             break;
        //         }
        //     }
        // }       

        if (!isValid) {
            errMessage = 'Form không hợp lệ'
            return errMessage
        }

        if (Date.parse(this.state.fromDate) > Date.parse(this.state.toDate)) {
            errMessage = "Từ ngày không được lớn hơn đến ngày"
        }

        return errMessage
    }






    updateField = (e) => {
        this.setState({
            form: { ...this.state.form, [e.target.name]: e.target.value }
        });
    };

    updateFieldNumber = (e) => {
        this.setState({
            form: { ...this.state.form, [e.target.name]: e.target.value ? parseInt(e.target.value) : 0 }
        });
    };

    onSelectStatusChanged = (newValue, actionMeta) => {
        this.setState({
            form: { ...this.state.form, status: newValue ? newValue.value : undefined }
        });

    };

    onSelectProvinceIdSenderChanged = (newValue) => {
        const val = newValue ? newValue.value : undefined
        this.setState({
            senderDistrictSelectOption: null,
            senderWardSelectOption: null,
            senderDistricts: this.getDistricts(parseInt(val)),
            senderWards: this.getWards(undefined),
            form: { ...this.state.form, provinceIdSender: parseInt(val), districtIdSender: undefined, wardIdSender: undefined }

        });
    }

    onSelectDistrictIdSenderChanged = (newValue) => {
        const val = newValue ? newValue.value : undefined
        this.setState({
            senderWardSelectOption: null,
            senderDistrictSelectOption: newValue,
            form: { ...this.state.form, districtIdSender: parseInt(val), wardIdSender: undefined },
            senderWards: this.getWards(val)
        });
    }

    onSelectWardIdSenderChanged = (newValue) => {
        const val = newValue ? newValue.value : undefined
        this.setState({
            senderWardSelectOption: newValue,
            form: { ...this.state.form, wardIdSender: parseInt(val) }
        });
    }


    onSelectProvinceIdReceiverChanged = (newValue) => {
        const val = newValue ? newValue.value : undefined
        this.setState({
            receiverDistrictSelectOption: null,
            receiverWardSelectOption: null,
            receiverDistricts: this.getDistricts(val),
            receiverWards: this.getWards(undefined),
            form: { ...this.state.form, provinceIdReceiver: parseInt(val), districtIdReceiver: undefined, wardIdReceiver: undefined }

        });
    }

    onSelectDistrictIdReceiverChanged = (newValue) => {
        const val = newValue ? newValue.value : undefined
        this.setState({
            receiverWardSelectOption: null,
            receiverDistrictSelectOption: newValue,
            form: { ...this.state.form, districtIdReceiver: parseInt(val), wardIdReceiver: undefined },
            receiverWards: this.getWards(parseInt(val))
        });
    }

    onSelectWardIdReceiverChanged = (newValue) => {
        const val = newValue ? newValue.value : undefined
        this.setState({
            receiverWardSelectOption: newValue,
            form: { ...this.state.form, wardIdReceiver: parseInt(val) }
        });
    }


    updateSelectField = (newValue, fieldName, callbackFn = undefined) => {
        const val = newValue ? newValue.value : undefined
        this.setState({
            form: { ...this.state.form, [fieldName]: val }
        }, () => {
            if (callbackFn)
                callbackFn()
        });
    }


    // 
    getProvinces() {
        return [...this.state._provinces].map((x, key) => {
            return { value: parseInt(x.provinceId), label: x.provinceName }
        })
    }

    getDistricts(provinceId) {
        let d = [...this.state._districts]
        if (provinceId) {
            d = d.filter(x => x.provinceId == provinceId)
        }
        d = d.map((x, key) => {
            return { value: parseInt(x.districtId), label: x.districtName }
        })
        return d
    }

    getWards(districtId) {
        let w = [...this.state._wards]
        console.log(districtId)
        if (districtId) {
            w = w.filter(x => x.districtId == districtId)
        }
        return w.map((x, key) => {
            return { value: parseInt(x.wardId), label: x.wardName }
        })
    }


    mockData = (billEntryInfo) => {
        let userClaims = JSON.parse(localStorage.getItem("User"))
        if (!userClaims) throw Error("no user found")



        let inputData = {
            wardIdSender: 27211,
            districtIdSender: 772,
            provinceIdSender: 79,
            locDescriptionSender: "Chung cư quận 11",
            wardIdReceiver: 27217,
            districtIdReceiver: 772,
            provinceIdReceiver: 79,
            locDescriptionReceiver: "184 Lê Đại Hành",
            volumeProduct: 1,
            typeProduct: '1',
            expectedDate: new Date()
        }
        if (billEntryInfo) inputData = { ...billEntryInfo }

        this.setState({
            form: {
                ...this.state.form,
                cusID: userClaims.id,
                wardIdSender: inputData.wardIdSender,
                districtIdSender: inputData.districtIdSender,
                provinceIdSender: inputData.provinceIdSender,
                locDescriptionSender: inputData.locDescriptionSender,
                wardIdReceiver: inputData.wardIdReceiver,
                districtIdReceiver: inputData.districtIdReceiver,
                provinceIdReceiver: inputData.provinceIdReceiver,
                locDescriptionReceiver: inputData.locDescriptionReceiver,
                volumeProduct: inputData.volumeProduct,
                typeProduct: inputData.typeProduct,
                description: inputData.description
            },
            senderDistrictSelectOption: this.state.senderDistricts.find(x => x.value == inputData.districtIdSender),
            senderWardSelectOption: this.state.senderWards.find(x => x.value == inputData.wardIdSender),
            senderDistricts: this.getDistricts(parseInt(inputData.provinceIdSender)),
            senderWards: this.getWards(parseInt(inputData.districtIdSender)),
            receiverDistrictSelectOption: this.state.receiverDistricts.find(x => x.value == inputData.districtIdReceiver),
            receiverWardSelectOption: this.state.receiverWards.find(x => x.value == inputData.wardIdReceiver),
            receiverDistricts: this.getDistricts(parseInt(inputData.provinceIdReceiver)),
            receiverWards: this.getWards(parseInt(inputData.districtIdReceiver))
        }, () => {
            this.provinceSenderSelectControl.current.state.value = this.state.senderProvinces.find(x => x.value == this.state.form.provinceIdSender)
            this.districtSenderSelectControl.current.state.value = this.state.senderDistricts.find(x => x.value == this.state.form.districtIdSender)
            this.wardSenderSelectControl.current.state.value = this.state.senderWards.find(x => x.value == this.state.form.wardIdSender)
            this.provinceRecieverSelectControl.current.state.value = this.state.receiverProvinces.find(x => x.value == this.state.form.provinceIdReceiver)
            this.districtRecieverSelectControl.current.state.value = this.state.receiverDistricts.find(x => x.value == this.state.form.districtIdReceiver)
            this.wardRecieverSelectControl.current.state.value = this.state.receiverWards.find(x => x.value == this.state.form.wardIdReceiver)

            this.typeProductSelectControl.current.state.value = this.options.find(x => x.value == this.state.form.typeProduct)
            this.forceUpdate()
        })
    }

    // get remote data
    async componentDidMount() {
        notifier.showWaiting()
        let queryObject = {}
        const aTask = getAllProvinceProxy(queryObject,
            res => {
                const data = res.datas
                this.setState({ _provinces: data },
                    () => {
                        this.setState({ senderProvinces: this.getProvinces(), receiverProvinces: this.getProvinces() })
                    })
            })

        const bTask = getAllDistrictProxy(queryObject,
            res => {
                const data = res.datas
                this.setState({ _districts: data },
                    () => {
                        this.setState({ senderDistricts: this.getDistricts(undefined), receiverDistricts: this.getDistricts(undefined) })
                    })
            })

        const cTask = getAllWardProxy(queryObject,
            res => {
                const data = res.datas
                this.setState({ _wards: data },
                    () => {
                        this.setState({ senderWards: this.getDistricts(undefined), receiverWards: this.getDistricts(undefined) })
                    })
            })

        await Promise.all([aTask, bTask, cTask]);
        notifier.hideWaiting()

        this.mockData(this.props.location.state?.billEntryInfo)

        const history = this.props.history
        let state = { ...history.location.state };
        delete state.billEntryInfo;
        history.replace({ ...history.location, state });
    }

    render() {
        return (
            <div className="page-container" >
                <Topbar
                    title={'Tạo đơn'}
                    isOnlyTitle={true}
                    separateLine="light"
                />
                <div className="page-content pad-horizon-5">
                    <form id="formInput" className="filterForm">

                        {/* Breadcumb */}
                        <nav aria-label="breadcrumb bill mb-3">
                            <ol className="breadcrumb breadcrumb--noColor">
                                <li className="breadcrumb-item active" aria-current="page"><span className="material-icons">receipt</span>
                                    <span>Lập đơn hàng</span>
                                </li>
                            </ol>
                        </nav>

                        <div className="row">
                            <div className="col-md-6">
                                <h5 className="headingContentTitle--themeColor linetop-space">Điểm gom hàng</h5>
                                <div className="row" >
                                    <div className="col-md-4 form-group required">
                                        <label className="filter-label">Tỉnh</label>
                                        <Select
                                            name="provinceIdSender"
                                            onChange={this.onSelectProvinceIdSenderChanged}
                                            ref={this.provinceSenderSelectControl}
                                            placeholder={'Tỉnh'}
                                            options={this.state.senderProvinces}
                                            required={true} />
                                    </div>
                                    <div className="col-md-4 form-group required">
                                        <label className="filter-label">Quận/Huyện</label>
                                        <Select
                                            name="districtIdSender"
                                            value={this.state.senderDistrictSelectOption}
                                            onChange={this.onSelectDistrictIdSenderChanged}
                                            ref={this.districtSenderSelectControl}
                                            placeholder={'Quận/Huyện'}
                                            options={this.state.senderDistricts}
                                            required={true} />
                                    </div>
                                    <div className="col-md-4 form-group required">
                                        <label className="filter-label">Phường/Xã</label>
                                        <Select
                                            name="wardIdSender"
                                            value={this.state.senderWardSelectOption}
                                            onChange={this.onSelectWardIdSenderChanged}
                                            ref={this.wardSenderSelectControl}
                                            placeholder={'Phường/Xã'}
                                            options={this.state.senderWards}
                                            required={true} />
                                    </div>
                                    <div className="col-md-12 form-group required">
                                        <label className="filter-label">Nhập thông tin đường/ số nhà</label>
                                        <textarea className="form-control" name="locDescriptionSender" value={this.state.form.locDescriptionSender} onChange={this.updateField} required></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <h5 className="headingContentTitle--themeColor linetop-space">Điểm giao hàng</h5>
                                <div className="row" >
                                    <div className="col-md-4 form-group required">
                                        <label className="filter-label">Tỉnh</label>
                                        <Select
                                            name="provinceIdReceiver"
                                            onChange={this.onSelectProvinceIdReceiverChanged}
                                            ref={this.provinceRecieverSelectControl}
                                            placeholder={'Tỉnh'}
                                            options={this.state.receiverProvinces}
                                            required={true} />
                                    </div>
                                    <div className="col-md-4 form-group required">
                                        <label className="filter-label">Quận/Huyện</label>
                                        <Select
                                            name="districtIdReceiver"
                                            defaultValue={this.state.receiverDistricts.find(option => option.value === this.state.form.districtIdReceiver)}
                                            value={this.state.receiverDistrictSelectOption}
                                            ref={this.districtRecieverSelectControl}
                                            onChange={this.onSelectDistrictIdReceiverChanged}
                                            placeholder={'Quận/Huyện'}
                                            options={this.state.receiverDistricts}
                                            required={true} />
                                    </div>
                                    <div className="col-md-4 form-group required">
                                        <label className="filter-label">Phường/Xã</label>
                                        <Select
                                            name="wardIdReceiver"
                                            value={this.state.receiverWardSelectOption}
                                            ref={this.wardRecieverSelectControl}
                                            onChange={this.onSelectWardIdReceiverChanged}
                                            placeholder={'Phường/Xã'}
                                            options={this.state.receiverWards}
                                            required={true} />
                                    </div>
                                    <div className="col-md-12 form-group required">
                                        <label className="filter-label">Nhập thông tin đường/ số nhà</label>
                                        <textarea className="form-control" name="locDescriptionReceiver" value={this.state.form.locDescriptionReceiver} onChange={this.updateField} ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-6">
                                <h5 className="headingContentTitle--themeColor linetop-space">Thông tin hàng vận chuyển</h5>
                                <div className="row" >
                                    <div className="col-md-4 form-group required">
                                        <label className="filter-label">Khối lượng  hàng</label>
                                        <input className="form-control" type="number" name="volumeProduct" value={this.state.form.volumeProduct} onChange={this.updateFieldNumber} required />
                                    </div>
                                    <div className="col-md-6 form-group required">
                                        <label className="filter-label">Loại hàng</label>
                                        <Select
                                            name="typeProduct"
                                            isClearable={true}
                                            onChange={e => { this.updateSelectField(e, 'typeProduct') }}
                                            ref={this.typeProductSelectControl}
                                            placeholder={'Trống'}
                                            options={this.options}
                                            required={true} />
                                    </div>
                                    <div className="col-md-10 form-group">
                                        <label className="filter-label">Nội dung</label>
                                        <textarea name="description" className="form-control" value={this.state.form.description} onChange={this.updateField}></textarea>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-6">
                                <h5 className="headingContentTitle--themeColor linetop-space">Thông tin giao hàng</h5>
                                <div className="row" >
                                    <div className="col-md-6 form-group required">
                                        <label className="filter-label">Thời gian dự kiến giao hàng</label>
                                        <DatePicker
                                            dateFormat={FormatHelper.dateFormat}
                                            className="form-control"
                                            selected={this.state.form.expectedDate}
                                            onChange={date => this.setState({ form: { ...this.state.form, expectedDate: date } })}
                                            required={true}
                                        />
                                    </div>
                                    {/* <div className="col-md-4 form-group required">
                                        <label className="filter-label">Thời gian dự kiến nhận hàng</label>
                                        <DatePicker
                                            dateFormat={FormatHelper.dateFormat}
                                            className="form-control"
                                            selected={this.state.form.toDate}
                                            onChange={date => this.setState({ form: { ...this.state.form, toDate: date } })}
                                            required={true}
                                        />
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <div className="d-flex mt-5">
                            <button className="btn btn-mainColor btn-lg ml-auto mr-auto mt-auto" onClick={this.continueBillSupplier}>Tiếp Theo</button>
                        </div>
                    </form>
                </div>
            </div >
        )
    }
}

export default BillEntry