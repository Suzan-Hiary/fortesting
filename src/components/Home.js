import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import Swal from 'sweetalert2'



class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      flowerData: []
    }
  }
  componentDidMount = () => {
    const { isAuthenticated } = this.props.auth0;
    let email = this.props.auth0.user.email
    console.log(email)
    if (isAuthenticated) {
      axios.get(`${process.env.REACT_APP_URL}/flower`)
        .then(result => {
          this.setState({
            flowerData: result.data.flowerslist
          })
        })
    }
  }

  addtofav = (idx) => {
    let email = this.props.auth0.user.email;
    let { name, photo } = this.state.flowerData[idx]
    axios.post(`${process.env.REACT_APP_URL}/favlist/${email}`, { name: name, photo: photo })
      .then(result => {
    
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been added',
          showConfirmButton: false,
          timer: 1500
        })
        this.componentDidMount();
        this.forceUpdate()
      })

  }

  render() {
    return (
      <>
        {this.state.flowerData.map((item, idx) => {
          return (
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={item.photo} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>

                <Button variant="primary" onClick={() => this.addtofav(idx)}>favorite </Button>
              </Card.Body>
            </Card>
          )
        })}
      </>
    )
  }
}

export default withAuth0(Home);
