import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const YAML = require("yaml");

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

const textQuestion = `
title: What do you think about cars being controlled
type: radio
name: firstQ
choices:
  - itsgood: It's a good thing
  - dontcare: It doesn't bother me
  - other: It's a concern
  - second: It's a very serious concern
 `;
export default function CheckboxesGroup({question = YAML.parse(textQuestion)}) {
  const classes = useStyles();
  question.choices = question.choices.map(choice => 
    {
    let pairs = []
    for(const key in choice) {
      pairs.push({key, value: choice[key]})
    }
    return pairs[0]
  }
    );


  const [state, setState] = React.useState(
    question.choices.map(choice => {
      return { [choice.key]: false };
    })
  );
  const handleChange = i => event => {
    console.log(state)
    let newArray = [...state]
    newArray[i].value = !newArray[i].value
    setState(newArray);
  };

  console.log(state)
  //const error = [gilad, jason, antoine].filter(v => v).length !== 2;

  return (
    <div className={classes.root}>
      Hello
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Assign responsibility</FormLabel>
        {state.map((choice,i) => (
          <FormGroup key={i}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state[choice]}
                  onChange={handleChange(i)}
                  value={state.key}
                />
              }
              label={question.choices[i].value}
            />
          </FormGroup>
        ))}
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
    </div>
  );
}
