import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import {Card , Button} from 'react-bootstrap';
import axios from 'axios';
import Modalform from './Modalform';
import Swal from 'sweetalert2'





class Favlist extends React.Component {

  constructor() {
    super();
    this.state = {
      flowerData: [],
      isShow : false ,
      id : 0 ,
      item : []
    }
  }
  componentDidMount = async() => {
    const { isAuthenticated ,user} = this.props.auth0;
    let email = this.props.auth0.user.email 
    if (isAuthenticated) {
      await axios
      .get(`${process.env.REACT_APP_URL}/favlist/${email}`)
        .then(result => {
          console.log(result.data)
          this.setState({
            flowerData: result.data.flowers
          })
        })
    }
  }


deletefav=(idx)=>{
  let id = idx ;
  let email = this.props.auth0.user.email 
  axios.delete(`${process.env.REACT_APP_URL}/delete/${email}/${id}`)
  .then(result=>{
    
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been deleted',
      showConfirmButton: false,
      timer: 1500
    })
    this.componentDidMount()
    this.forceUpdate()
  })
}

showmodal=(idx)=>{
  this.setState({
    item : this.state.flowerData[idx],
    isShow : true ,
    id : idx
  })
}
closemodal=()=>{
  this.setState({
    isShow:false
  })
}

updatehandle=(e)=>{
  e.preventDefault();

  let id = this.state.id ;
  let data={
name : e.target.name.value ,
photo : e.target.photo.value
  }
  axios.put(`${process.env.REACT_APP_URL}/update/${id}` , data)
  .then(result=>{
    this.setState({
      flowerData:result.data.flowers
    })
    
   
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been updated',
      showConfirmButton: false,
      timer: 1500
    })
  })
  this.componentDidMount();
    this.forceUpdate()
}


  render() {
    return (
      <div>
      <>
        {this.state.flowerData.map((item, idx) => {
          return (
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={item.photo} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
               
                <Button variant="danger" onClick={()=>this.deletefav(idx)}>delete </Button>
                <Button variant="danger" onClick={()=>this.showmodal(idx)}>update</Button>
              </Card.Body>
            </Card>
          )
        })}
      </>

<>

{this.state.isShow && 
<Modalform
show={this.state.isShow}
hide={this.closemodal}
item={this.state.item}
update={this.updatehandle}
/>}
</>




      </div>
    )
  }
}

export default withAuth0 (Favlist);
