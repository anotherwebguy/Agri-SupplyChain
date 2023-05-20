import React from 'react'

function SubNav(props) {

    const {heading} = props

  return (
    <div className='nav-body'>
        <nav class="navbar navbar-main navbar-expand-lg px-0 mx-1 shadow-none border-radius-xl" id="navbarBlur"
            navbar-scroll="true">
            <div class="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                        <li class="breadcrumb-item text-sm"><span class="opacity-5 text-dark" >Pages</span>
                        </li>
                        <li class="breadcrumb-item text-sm text-dark active" aria-current="page">{heading}</li>
                    </ol>
                </nav>
            </div>
        </nav>
    </div>
  )
}

export default SubNav