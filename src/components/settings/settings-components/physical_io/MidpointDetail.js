import React from 'react'

class MidpointDetail extends React.Component {
    render() {
        return (
            <div className='component midpoint-detail'>

                <div className='component-header'>
                    <h1>{`${this.props.selectedMidpoint.make} ${this.props.selectedMidpoint.model}`}</h1>
                    <button onClick={()=> this.props.handleSelectedMidpoint(null)}>Return</button>
                </div>

                <div className='component-body'>
                    <div className='midpoint-body'>
                        midpoint body
                    </div>
                </div>
            </div>
        )
    }
}
export default MidpointDetail