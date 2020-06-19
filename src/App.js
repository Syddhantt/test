import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios';

class App extends React.Component {
    state = {
        formData: {
            email: '',
            message: '',
            name: ''
        },
        submitted: false,
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = () => {
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                email: this.state.formData.email,
                message: this.state.formData.message,
                name: this.state.formData.name,
            }
        }))

        axios.post('https://853kfm22dl.execute-api.us-west-2.amazonaws.com/Prod/view', {
            email: this.state.formData.email,
            message: this.state.formData.message,
            name: this.state.formData.name,
        }).then(() => {
            console.log("Success")
        })

        this.setState(() => ({
            formData: {
                email: '',
                message: '',
                name: '',
            }
        }))
        alert('Submitted')
    }

    render() {
        const { formData, submitted } = this.state;
        return (
            <div>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                >
                    <h2>Contact form</h2>
                    <TextValidator
                        label="Name"
                        onChange={this.handleChange}
                        name="name"
                        value={formData.name}
                        validators={['required']}
                        errorMessages={['Please enter a name.']}
                    />
                    <br/>
                    <TextValidator
                        label="Email"
                        onChange={this.handleChange}
                        name="email"
                        value={formData.email}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'Email is not valid']}
                    />
                    <br />
                    <TextValidator
                        label="Message"
                        onChange={this.handleChange}
                        name="message"
                        value={formData.message}
                        validators={['required']}
                        errorMessages={['This field is required']}
                    />
                    <br />
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        disabled={submitted}
                    >
                        {
                            (submitted && 'Your form is submitted!')
                            || (!submitted && 'Submit')
                        }
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}
export default App;