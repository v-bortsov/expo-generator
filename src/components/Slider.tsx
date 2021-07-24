import React from 'react'
import {Box, Slider as Slide} from 'native-base'
const Slider = (props: any) => (
  <Box mx={5} width="80%">
    <Slide
      {...props}
      defaultValue={70}
      minValue={0}
      maxValue={100}
      accessibilityLabel="hello world"
      step={10}
    >
      <Slide.Track>
        <Slide.FilledTrack />
      </Slide.Track>
      <Slide.Thumb />
    </Slide>
  </Box>
)

export {Slider}
