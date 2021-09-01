import React from 'react'

class FileUploadInformation extends React.Component {
    render() {
        return (
            <div id='file-upload-information'>
                <h5>Configuration file is valid</h5>

                <table id='file-upload-table'>
                    <tr>
                        <th>Filename</th>
                        <th>Filesize</th>
                        <th>Last Modified</th>
                    </tr> 
                    <tr>
                        <td>{this.props.selectedFileInfo.name}</td>
                        <td>{this.props.selectedFileInfo.size}</td>
                        <td>{this.props.selectedFileInfo.lastModified}</td>
                    </tr>
                </table>

                <button>Update Configuration</button>
            </div>
        )
    }
}
class ConfigurationUpload extends React.Component {
    state = {
        selectedFile: null,
        selectedFileInfo: {
            name: '',
            size: null,
            lastModified: ''
        }
    }
    getFileDate = (dateObject) => {
        let month = dateObject.getMonth()
        let date = dateObject.getDate()
        let year = dateObject.getFullYear()
        let hours = dateObject.getHours()
        let minutes = dateObject.getMinutes()
        let meridian = ''

        if(hours > 12) {
            meridian = 'pm'
            hours -= 12
        } else {
            meridian = 'am'
        }

        return `${month}/${date}/${year} ${hours}:${minutes} ${meridian}`
    }

    readFile = (file) => {
        var fr = new FileReader()
        var text = fr.readAsText(file)
        console.log('text = ',text)
    }

    onFileChange = e => {
        const selectedFile = e.target.files[0]
        let selectedFileInfo = {}
        if(selectedFile.type === 'application/json') {
            selectedFileInfo.name = selectedFile.name
            selectedFileInfo.size = selectedFile.size
            selectedFileInfo.lastModified = this.getFileDate(selectedFile.lastModifiedDate)
            this.setState({selectedFileInfo})
            this.setState({selectedFile})
            this.readFile(selectedFile)
        }
    }
    render() {
        return (
            <div id='configuration-upload'>
                <h4>Upload a configuration file below.</h4>
                <input 
                    type='file' 
                    onChange={this.onFileChange}
                />
                {this.state.selectedFile !== null ?
                    <FileUploadInformation
                        // states
                        selectedFileInfo={this.state.selectedFileInfo}
                    />
                :    
                    <React.Fragment/>
                }
            </div>
        )
    }
}
export default ConfigurationUpload