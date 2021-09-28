import React from 'react'
import styled from 'styled-components/native'

const App = () => {
  return (
    <StyledView>
      <StyledText>hello</StyledText>
    </StyledView>
  );
};

const StyledView=styled.View`
flex:1;
/*background-color:purple;*/
justify-content:center;
align-items:center;
`

const StyledText=styled.Text`
font-weight:700;
`

export default App;
