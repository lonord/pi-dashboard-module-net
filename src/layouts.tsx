import { IconButton } from '@lonord/react-electron-components'
// tslint:disable-next-line:no-submodule-imports
import { IconButtonProps } from '@lonord/react-electron-components/lib/button/icon'
import * as React from 'react'
import styled from 'styled-components'

export const SpeedAreaWrap = styled.div`
	padding: 8px 4px 4px 20px;
	font-size: 12px;
	color: #616161;
`

export const SpeedArea = styled.span`
	width: 100px;
	text-align: right;
	display: inline-block;
	font-family: menlo;
	padding-right: 4px;
`

export const SpeedSignArea = styled.span`
	width: 40px;
	display: inline-block;
	font-family: menlo;
`

interface SpeedIndicatorProps {
	trafficStatus: 'free' | 'medium' | 'busy'
}
const SpeedIndicatorButton = styled(IconButton as any as React.ComponentType<SpeedIndicatorProps & IconButtonProps>) `
	color: ${({ trafficStatus }) =>
		trafficStatus === 'busy' ? '#FF5722' : trafficStatus === 'medium' ? '#FFC107' : '#8BC34A'};
`
export const SpeedIndicator: React.SFC<SpeedIndicatorProps & React.HTMLAttributes<HTMLButtonElement>> = (props) => (
	<SpeedIndicatorButton {...props} icon="circle"/>
)
