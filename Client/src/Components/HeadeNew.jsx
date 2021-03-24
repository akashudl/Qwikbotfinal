import React from 'react'
import {Container,Typography,AppBar, makeStyles, Toolbar,Button,Avatar} from "@material-ui/core";
import firebase from "../Services/firebase.js";
const  useStyles=makeStyles((theme)=>({
 root:{ 
     width:"200vw",
     height:"200vh",
    

},
ak:{
    '& > *': {
        margin: theme.spacing(1),
  
      },
}
}));
export default function HeadeNew() {
    const classes=useStyles();
    return (
       <Container className={classes.root} disableGutters >
     <AppBar color="primary">
         <Toolbar>
         <Typography variant="h6">SrcQwikBot</Typography>
         <div className={classes.ak} style={{flexGrow:1}}>
         <Button variant="outlined" color="inherit">Home</Button>
         <Button variant="outlined" color="inherit">ChatBot</Button>
         <Button variant="outlined" color="inherit">Admin</Button>
         </div>
          <Button variant="outlined" color="inherit">Logout</Button>
          
         <Avatar src={firebase.auth().currentUser.photoURL}></Avatar>
       
         </Toolbar>
     </AppBar>
       </Container>
    )
}
