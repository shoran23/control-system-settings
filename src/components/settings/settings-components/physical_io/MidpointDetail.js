import React from 'react'

class MidpointDetail extends React.Component {
    render() {
        return (
            <div className='component midpoint-detail'>

                <div className='component-header'>
                    <h1>{`${this.props.selectedMidpoint.make} ${this.props.selectedMidpoint.model}`}</h1>
                    <button>Return</button>
                </div>

                <div className='component-body'>
                    
                </div>
            </div>
        )
    }
}
export default MidpointDetail