import createRPCClient, { RPCClient, SSEClient } from '@lonord/pi-status-rpc-client'
import { Button, Dialog } from '@lonord/react-electron-components'
import * as React from 'react'
import styled from 'styled-components'
import DetailDialog from './dialog-detail'
import Detail from './dialog-detail'
import { SpeedArea, SpeedAreaWrap, SpeedSignArea, Title } from './layouts'
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
		sendSpeed: -1,
		receiveSpeed: -1
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
				sendSpeed: -1,
				receiveSpeed: -1
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
			if (this.props.rpcBaseUrl) {
				this.rpcService = createRPCClient(this.props.rpcBaseUrl)
				this.initSSE()
			}
		} else if (prevProps.selectedIfName !== this.props.selectedIfName) {
			this.stopSSE()
			this.initSSE()
		}
	}

	componentDidMount() {
		const { rpcBaseUrl, selectedIfName } = this.props
		if (rpcBaseUrl) {
			this.rpcService = createRPCClient(rpcBaseUrl)
			this.initSSE()
		}
	}

	componentWillUnmount() {
		this.stopSSE()
		this.rpcService = null
	}

	render() {
		const { selectedIfName, rpcBaseUrl } = this.props
		const { isDetailOpen, sendSpeed, receiveSpeed } = this.state
		const sendSpeedLevel = calculateSpeedLevel(sendSpeed)
		const recvSpeedLevel = calculateSpeedLevel(receiveSpeed)
		return (
			<FullSizeWrap onClick={this.openDetail}>
				<Title>{selectedIfName}</Title>
				<SpeedAreaWrap>
					<SpeedSignArea>SEND</SpeedSignArea>
					<SpeedArea trafficStatus={sendSpeedLevel}>{formatSpeedUnit(sendSpeed)}</SpeedArea>
				</SpeedAreaWrap>
				<SpeedAreaWrap>
					<SpeedSignArea>RECV</SpeedSignArea>
					<SpeedArea trafficStatus={recvSpeedLevel}>{formatSpeedUnit(receiveSpeed)}</SpeedArea>
				</SpeedAreaWrap>
				<Dialog isOpen={isDetailOpen} onClose={this.closeDetail} title="路由器网速">
					<Detail
						selectedInterface={selectedIfName}
						onSelectInterface={this.updateIfName}
						rpcBaseUrl={rpcBaseUrl} />
				</Dialog>
			</FullSizeWrap>
		)
	}
}

function calculateSpeedLevel(n: number) {
	return n < 1024 * 50 ? 'free' : n < 1024 * 1024 ? 'medium' : 'busy'
}

const FullSizeWrap = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
`
