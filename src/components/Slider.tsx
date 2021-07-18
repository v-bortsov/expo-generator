import React from 'react'
import {Box, Slider} from 'native-base'
const Slide = (props: any) => (
  <Box mx={5} width="80%">
    <Slider
      {...props}
      defaultValue={70}
      minValue={0}
      maxValue={100}
      accessibilityLabel="hello world"
      step={10}
    >
      <Slider.Track>
        <Slider.FilledTrack />
      </Slider.Track>
      <Slider.Thumb />
    </Slider>
  </Box>
)

export default Slide
