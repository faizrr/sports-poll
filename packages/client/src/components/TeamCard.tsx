import React from 'react'
import styled from '@emotion/styled'

// Constants
import * as MEDIA_QUERIES from '../constants/mediaQueries'

type TeamCardProps = {
  imgSrc: string
  name: string
}

const Wrapper = styled.div`
  width: 40%;
  text-align: center;
`
const Name = styled.div``
const Image = styled.img`
  margin-top: 20px;
  height: 120px;
  width: 120px;
  object-fit: contain;

  ${MEDIA_QUERIES.MOBILE} {
    height: 70px;
    width: 70px;
  }
`

const TeamCard = (props: TeamCardProps) => {
  return (
    <Wrapper>
      <Name>{props.name}</Name>
      <Image src={props.imgSrc} />
    </Wrapper>
  )
}

export default TeamCard
