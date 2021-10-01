import React from 'react'
import './settings-components.scss'

const emptySource = {
    name: '',
    switcherInputs: [0,0,0]
}
class Source extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.selectedSource === this.props.index ?
                    <div id={`source-active-${this.props.index}`} className='component-list-item-active' onClick={()=> this.props.handleSourceSelect(this.props.index)}>
                        <h3 className='component-list-item-title'>{`Source ${this.props.index}:`}</h3>
                        <p>{this.props.source.name}</p>
                    </div>
                :
                    <div id={`source-inactive-${this.props.index}`} className='component-list-item-inactive' onClick={()=> this.props.handleSourceSelect(this.props.index)}>
                        <h3 className='component-list-item-title'>{`Source ${this.props.index}:`}</h3>
                        <p>{this.props.source.name}</p>
                    </div>
                }
            </React.Fragment>
        )
    }
}
class Sources extends React.Component {
    state = {
        selectedSource: null,
    }
    handleSourceSelect = sourceIndex => {
        this.setState({selectedSource: sourceIndex})
    }
    handleSourceChange = e => {
        this.props.handleConfigurationArrayChange('sources',this.state.selectedSource,e.target.name,e.target.value)
    }
    handleSourceInputChange = index => e => {
        this.props.handleConfigurationArrayChangeArrayItem('sources',this.state.selectedSource,e.target.name,index,e.target.value)
    }
    handleSourceDelete = () => {
        this.setState({selectedSource: null})
        this.props.handleConfigurationArrayDelete('sources',this.state.selectedSource)
    }
    render() {
        return (
            <div id='sources' className='component'>
                <div id='sources-header' className='component-header'>
                    <h1>System Sources</h1>
                    <div className='component-header-buttons'>
                        <button id='sources-pull-button' className='component-button' onClick={()=> this.props.getApi('sources')}>Pull From Processor</button>
                        <button id='sources-send-button' className='component-button' onClick={()=> this.props.postApi('sources')}>Send To Processor</button>
                        <button id='sources-add' className='component-add-button' onClick={()=> this.props.handleConfigurationArrayAppend('sources',emptySource)}>Add Source</button>
                    </div>
                </div>
                <div id='sources-body' className='component-body'>
                    <div id='sources-list' className='component-list'>
                        {this.props.sources.map((source,index) => (
                            <Source
                                // states
                                key={index}
                                index={index}
                                source={source}
                                selectedSource={this.state.selectedSource}
                                // methods
                                handleSourceSelect={this.handleSourceSelect}
                            />
                        ))}
                    </div>
                    {this.state.selectedSource !== null ?
                        <div id='sources-detail' className='component-detail'>
                            <div className='component-detail-header'>
                                <h3>Source Details</h3>
                                <button className='component-detail-close' onClick={()=> this.handleSourceSelect(null)}>Close</button>
                            </div>

                            <form className='component-form'>
                                <div className='component-form-input-row'>
                                    <label htmlFor='name'>Name:</label>
                                    <input
                                        className='component-form-input'
                                        type='text'
                                        name='name'
                                        value={this.props.sources[this.state.selectedSource].name}
                                        onChange={this.handleSourceChange}
                                    />
                                </div>
                                {this.props.sources[this.state.selectedSource].switcherInputs.map((input,index) => (
                                    <div className='component-form-input-row'>
                                        <label htmlFor='videoInput'>{`Switcher Input ${index + 1}:`}</label>
                                        <input
                                            className='component-form-input'
                                            type='number'
                                            name='switcherInputs'
                                            value={input}
                                            onChange={this.handleSourceInputChange(index)}
                                        />
                                    </div>
                                ))}
                            </form>
                            
                            <button className='component-form-delete' onClick={this.handleSourceDelete}>Delete Source</button>
                        </div>
                    :
                        <React.Fragment/>
                    }
                </div>
            </div>
        )
    }
}
export default Sources