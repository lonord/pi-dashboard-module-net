import { IconButton } from '@lonord/react-electron-components'
// tslint:disable-next-line:no-submodule-imports
import { IconButtonProps } from '@lonord/react-electron-components/lib/button/icon'
import * as React from 'react'
import styled from 'styled-components'

export interface TitleProps extends React.HTMLAttributes<HTMLDivElement> {
	borderColor?: string
	borderWidth?: number
}
const RawTitle = styled.div`
	font-size: 14px;
	font-weight: bold;
	text-transform: uppercase;
	color: #333;
	margin-bottom: 5px;
`
export const Title = styled(RawTitle as any as React.ComponentType<TitleProps>)`
	padding-left: 6px;
	border-left: ${({ borderWidth }) => (borderWidth || 4) + 'px'} solid ${({ borderColor }) => borderColor || '#333'};
`

export const SubTitle = styled.div`
	font-size: 14px;
	color: #999;
	margin-bottom: 6px;
`

export const SpeedAreaWrap = styled.div`
	padding: 8px 4px 4px 20px;
	font-size: 12px;
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

export interface SelectableAreaProps extends React.HTMLAttributes<HTMLDivElement> {
	isSelected: boolean
}
const RawSelectableArea = styled.div``
export const SelectableArea = styled(RawSelectableArea as any as React.ComponentType<SelectableAreaProps>)`
	border-radius: 3px;
	border: 1px solid ${({ isSelected }) => isSelected ? '#2196F3' : 'transparent'};
	background: ${({ isSelected }) => isSelected ? '#E3F2FD' : 'transparent'};
`
