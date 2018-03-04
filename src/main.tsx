import { Button } from '@lonord/react-electron-components'
import * as React from 'react'
import styled from 'styled-components'
import DetailDialog from './dialog-detail'

interface MainPropsMap {
	selectedIfName: string
}

interface MainProps extends MainPropsMap {
	updateProps: (props: Pick<MainPropsMap, keyof MainPropsMap>) => void
}

interface MainState {
	isDetailOpen: boolean
}

export default class Main extends React.Component<MainProps, MainState> {

	state: MainState = {
		isDetailOpen: false
	}

	openDetail = () => {
		this.setState({
			isDetailOpen: true
		})
	}

	closeDetail = () => {
		this.setState({
			isDetailOpen: false
		})
	}

	updateIfName = (ifName: string) => {
		//
	}

	render() {
		const { selectedIfName } = this.props
		const { isDetailOpen } = this.state
		return (
			<FullSizeWrap onClick={this.openDetail}>
				<span>222</span>
				<DetailDialog
					isOpen={isDetailOpen}
					onClose={this.closeDetail}
					selectedInterface={selectedIfName}
					onSelectInterface={this.updateIfName}/>
			</FullSizeWrap>
		)
	}
}

const FullSizeWrap = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
`
