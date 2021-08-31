import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: "hidden"
    },
    title: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white"
    }
}));

export default function DragDropClone() {
    const classes = useStyles();
    const allowDrop = (ev) => {
        ev.preventDefault();
    }

    const drag = (ev) => {
        console.log("Daata", ev.target.id)
        document.getElementById("hide_button").style.display = "none";
        ev.dataTransfer.setData("text", ev.target.id);
    }

    const removeNode = (node) => {
        node.parentNode.removeChild(node);
    }

    const drop = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        var isLeft = 'drag1' == data || "drag2" == data;
        var nodeCopy = document.getElementById(data).cloneNode(true);
        nodeCopy.id = "img" + ev.target.id;
        if (isLeft) {
            if (ev.target.nodeName == 'IMG') {
                ev.target.parentNode.appendChild(nodeCopy);
                removeNode(ev.target);
            }
            else
                ev.target.appendChild(nodeCopy);
        }
        else {
            if (ev.target.nodeName != 'IMG') {
                removeNode(document.getElementById(data));
                ev.target.appendChild(nodeCopy);
            }
        }
        ev.stopPropagation();
        return false;
    }
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} style={{ margin: "2vw" }}>
                    <Card className={classes.root}>
                        <CardContent style={{ backgroundColor: "#C51162" }}>
                            <Typography className="glow" variant="h5" component="h5" gutterBottom>
                                Drap and Drop, Clone Image
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Card className={classes.root}>
                        <CardContent>
                            <div>
                                <img src="https://source.unsplash.com/user/erondu/1600x900" draggable="true" onDragStart={drag} id="drag1" width="100%" height="100%" />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card className={classes.root}>
                        <CardContent>
                            <div id="divRight">
                                <div id="divRight1" onDrop={drop} onDragOver={allowDrop}>
                                    <Button variant="contained" color="secondary" id="hide_button">
                                        Drag Picture
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
