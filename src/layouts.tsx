import styled from 'styled-components'

export const Title = styled.div`
	font-size: 16px;
	font-weight: bold;
	text-transform: uppercase;
	color: #333;
	margin-bottom: 5px;
`

export const SubTitle = styled.div`
	font-size: 14px;
	color: #999;
	margin-bottom: 5px;
`

export const SpeedAreaWrap = styled.div`
	padding: 8px 0;
`

export interface SpeedAreaProps extends React.HTMLAttributes<HTMLSpanElement> {
	trafficStatus: 'free' | 'medium' | 'busy'
}
const RawSpeedArea = styled.span`
	width: 145px;
	text-align: right;
	display: inline-block;
	font-family: menlo;
`
export const SpeedArea = styled(RawSpeedArea as any as React.ComponentType<SpeedAreaProps>) `
	padding-right: 12px;
	border-right: 4px solid ${({ trafficStatus }) =>
		trafficStatus === 'busy' ? '#FF5722' : trafficStatus === 'medium' ? '#FFC107' : '#8BC34A'};
`

export const SpeedSignArea = styled.span`
	width: 50px;
	text-align: center;
	display: inline-block;
	font-family: menlo;
	font-size: 14px;
`

export interface SelectableAreaProps extends React.HTMLAttributes<HTMLDivElement> {
	isSelected: boolean
}
const RawSelectableArea = styled.div``
export const SelectableArea = styled(RawSelectableArea as any as React.ComponentType<SelectableAreaProps>)`
	border-radius: 3px;
	border: 1px solid ${({ isSelected }) => isSelected ? '#2196F3' : 'transparent'};
	background: ${({ isSelected }) => isSelected ? '#E3F2FD' : 'transparent'};
`
