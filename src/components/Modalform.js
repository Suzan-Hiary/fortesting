import React, { Component } from 'react';
import { Modal , Form , Button } from 'react-bootstrap';

export class Modalform extends Component {
    render() {
        return (
            <div>
                      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
<Form onSubmit={this.props.update}>
<Form.Control name='name'type="text" defaultValue={this.props.item.name}/>
  <br />
  <Form.Control type="text" defaultValue={this.props.item.photo} name='photo' />
  <Button variant="secondary" onClick={this.props.hide}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Save Changes
          </Button>
</Form>


        </Modal.Body>
      
      </Modal>
            </div>
        )
    }
}

export default Modalform
