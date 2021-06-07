import React from 'react'
import {SketchPicker} from 'react-color'
//import {ImageUploader} from 'react-images-upload'

class TouchPanel extends React.Component {
    handlePrimaryColor = color => {
        this.props.handleConfigurationKeyItem('touchPanel','primaryColor',color)
    }
    handleSecondaryColor = color => {
        this.props.handleConfigurationKeyItem('touchPanel','secondaryColor',color)
    }
    render() {
        return (
            <div className='component'>
                <div className='component-header'>
                    <h1>System Touch Panel</h1>
                    <div className='component-header-buttons'>
                        <button className='component-button' >Pull From Processor</button>
                        <button className='component-button' >Send To Processor</button>
                    </div>
                </div>
                <div className='component-body'>
                    <div className='touch-panel-colors'>
                        <div className='touch-panel-color'>
                            <h4>Primary Color</h4>
                            <SketchPicker
                                color={this.props.touchPanel.primaryColor}
                                disableAlpha={true}
                                onChange={this.handlePrimaryColor}
                            /> 
                        </div>
                        <div className='touch-panel-color'>
                            <h4>Secondary Color</h4>
                            <SketchPicker
                                color={this.props.touchPanel.secondaryColor}
                                disableAlpha={true}
                                onChange={this.handleSecondaryColor}
                            />
                        </div>
                    </div>

                    {/* <div className='touch-panel-image-uploads'>
                        <div className='touch-panel-image-upload'>
                            <h4>Welcome Logo</h4>
                            <ImageUploader/>
                        </div>
                        <div className='touch-panel-image-upload'>
                            <h4>Header Logo</h4>
                            <ImageUploader/>
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}
export default TouchPanel