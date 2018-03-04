import createRPCClient, { RPCClient, SSEClient } from '@lonord/pi-status-rpc-client'
import { Button } from '@lonord/react-electron-components'
import * as React from 'react'
import styled from 'styled-components'
import DetailDialog from './dialog-detail'
import formatSpeedUnit from './util/speed-formatter'

interface MainPropsMap {
	selectedIfName: string
	rpcBaseUrl: string
}

interface MainProps extends MainPropsMap {
	updateProps: <K extends keyof MainPropsMap>(props: Pick<MainPropsMap, K>) => void
}

interface MainState {
	isDetailOpen: boolean
	sendSpeed: number
	receiveSpeed: number
}

export default class Main extends React.Component<MainProps, MainState> {

	rpcService: RPCClient = null
	sseClient: SSEClient = null

	state: MainState = {
		isDetailOpen: false,
		sendSpeed: 0,
		receiveSpeed: 0
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
		if (ifName !== this.props.selectedIfName) {
			this.setState({
				sendSpeed: 0,
				receiveSpeed: 0
			})
		}
		this.props.updateProps({
			selectedIfName: ifName
		})
	}

	onSSEData = (data) => {
		this.setState({
			sendSpeed: data.send,
			receiveSpeed: data.receive
		})
	}

	initSSE = () => {
		const { selectedIfName } = this.props
		if (selectedIfName) {
			this.sseClient = this.rpcService.openSSE('net-iostat', this.onSSEData, {
				ifName: selectedIfName
			})
		}
	}

	stopSSE = () => {
		if (this.sseClient && !this.sseClient.isClosed()) {
			this.sseClient.close()
			this.sseClient = null
		}
	}

	componentDidUpdate(prevProps: MainProps) {
		if (prevProps.rpcBaseUrl !== this.props.rpcBaseUrl) {
			this.stopSSE()
			this.rpcService = createRPCClient(this.props.rpcBaseUrl)
			this.initSSE()
		} else if (prevProps.selectedIfName !== this.props.selectedIfName) {
			this.stopSSE()
			this.initSSE()
		}
	}

	componentDidMount() {
		const { rpcBaseUrl, selectedIfName } = this.props
		this.rpcService = createRPCClient(rpcBaseUrl)
		this.initSSE()
	}

	componentWillUnmount() {
		this.stopSSE()
		this.rpcService = null
	}

	render() {
		const { selectedIfName } = this.props
		const { isDetailOpen, sendSpeed, receiveSpeed } = this.state
		return (
			<FullSizeWrap onClick={this.openDetail}>
				<div>{selectedIfName}</div>
				<div>{formatSpeedUnit(sendSpeed)}</div>
				<div>{formatSpeedUnit(receiveSpeed)}</div>
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
