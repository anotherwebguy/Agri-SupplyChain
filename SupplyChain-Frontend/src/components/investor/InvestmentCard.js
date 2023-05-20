import React from 'react'

function InvestmentCard(props) {

    const { user, crop_name, quantity, holding, amount } = props

    return (
        <div className='col-3'>
            <div className="card">
                <div className="card-header p-3 pt-2">
                    <div className="text-end pt-1">
                        <p className="display-7 mb-0 text-capitalize font-weight-bolder">{user}</p>
                    </div>
                </div>
                {/* <hr className="dark horizontal my-0"></hr> */}
                <div className="row">
                    <div className="card-footer p-2" >
                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder" >Crop :</span>&nbsp;&nbsp;{crop_name}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    </div>
                    <div className="card-footer p-2" >
                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder" >Quantity :</span>&nbsp;&nbsp;{quantity}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    </div>
                    <div className="card-footer p-2"  >
                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder" >Amount :</span>&nbsp;&nbsp;₹{amount}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    </div>
                    <div className="card-footer p-2"  >
                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder" >Share :</span>&nbsp;&nbsp;{holding}%&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvestmentCard